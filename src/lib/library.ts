import fs from "node:fs/promises";
import path from "node:path";

function getContentDirectory(): string {
  const directory = process.env.NOTES_DIR;
  if (!directory) {
    throw new Error("NOTES_DIR must point to the external notes directory");
  }
  return directory;
}

export type Todo = {
  line: number;
  title: string;
  completed: boolean;
};

export type TodoEdit = Todo;

export type LibraryItem = {
  name: string;
  type: "folder" | "file";
  fileCount?: number;
};

export type LibraryEntry =
  | { type: "folder"; items: LibraryItem[] }
  | { type: "file"; name: string; source: string };

export async function getTodos(): Promise<Todo[]> {
  try {
    const source = await fs.readFile(path.join(getContentDirectory(), "inbox", "tasks.md"), "utf8");
    return source.split("\n").flatMap((line, index) => {
      const match = line.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
      const body = match?.[2] ?? "";
      const title = body.replace(/\s+Source:\s+.*$/, "");
      return match ? [{
        line: index,
        completed: match[1].toLowerCase() === "x",
        title: title.replace(/\[([^\]]+)]\([^)]+\)/g, "$1"),
      }] : [];
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function saveTodos(edits: TodoEdit[]): Promise<void> {
  const filePath = path.join(getContentDirectory(), "inbox", "tasks.md");
  const source = await fs.readFile(filePath, "utf8");
  const lines = source.split("\n");

  for (const edit of edits) {
    if (!Number.isSafeInteger(edit.line) || edit.line < 0 || typeof edit.completed !== "boolean") {
      throw new Error("Invalid todo");
    }
    const title = edit.title.trim();
    if (!title || title.includes("\n") || title.includes("\r")) throw new Error("Todo title is required");

    const line = lines[edit.line];
    const match = line?.match(/^(\s*[-*]\s+)\[[ xX]\]\s+(.+)$/);
    if (!match) throw new Error("Todo no longer exists");
    const sourceSuffix = match[2].match(/\s+Source:\s+.*$/)?.[0] ?? "";
    lines[edit.line] = `${match[1]}[${edit.completed ? "x" : " "}] ${title}${sourceSuffix}`;
  }
  await fs.writeFile(filePath, lines.join("\n"), "utf8");
}

async function countMarkdownFiles(directory: string): Promise<number> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const counts = await Promise.all(entries.map((entry) => {
    if (entry.name.startsWith(".") || entry.isSymbolicLink()) return 0;
    if (entry.isDirectory()) return countMarkdownFiles(path.join(directory, entry.name));
    return entry.isFile() && entry.name.endsWith(".md") ? 1 : 0;
  }));
  return counts.reduce((total, count) => total + count, 0);
}

export async function getLibraryEntry(segments: string[]): Promise<LibraryEntry | null> {
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || segment.includes("/"))) {
    return null;
  }

  const root = await fs.realpath(getContentDirectory());
  const candidate = path.resolve(root, ...segments);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) return null;

  try {
    const resolved = await fs.realpath(candidate);
    if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) return null;

    const stat = await fs.stat(resolved);
    if (stat.isDirectory()) {
      const entries = await fs.readdir(resolved, { withFileTypes: true });
      const visibleEntries = entries.filter((entry) => !entry.name.startsWith(".") && !entry.isSymbolicLink());
      const items = (await Promise.all(visibleEntries.map(async (entry) => ({
          name: entry.name,
          type: entry.isDirectory() ? "folder" as const : "file" as const,
          fileCount: entry.isDirectory() ? await countMarkdownFiles(path.join(resolved, entry.name)) : undefined,
        }))))
        .sort((a, b) => a.type === b.type ? a.name.localeCompare(b.name) : a.type === "folder" ? -1 : 1);
      return { type: "folder", items };
    }

    if (!stat.isFile() || !resolved.endsWith(".md")) return null;
    return { type: "file", name: path.basename(resolved, ".md"), source: await fs.readFile(resolved, "utf8") };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
