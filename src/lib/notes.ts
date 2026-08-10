import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

function getContentDirectory(): string {
  const directory = process.env.NOTES_DIR;
  if (!directory) {
    throw new Error("NOTES_DIR must point to the external notes directory");
  }
  return directory;
}
const paraDirectories = ["projects", "areas", "resources", "archives"] as const;

export type Note = {
  id: string;
  slug: string;
  title: string;
  para: "project" | "area" | "resource" | "archive";
  type: string;
  category: string;
  tags: string[];
  summary: string;
  created: string;
  updated: string;
  sources: string[];
  status: "active" | "archived";
  content: string;
};

function toDate(value: unknown): string {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? "" : value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function parseNote(filePath: string, source: string, para: Note["para"]): Note {
  const { data, content } = matter(source);
  const slug = path.basename(filePath, ".md");

  return {
    id: String(data.id ?? slug),
    slug,
    title: String(data.title ?? slug),
    para,
    type: String(data.type ?? "topic"),
    category: para,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: String(data.summary ?? ""),
    created: toDate(data.created),
    updated: toDate(data.updated ?? data.created),
    sources: Array.isArray(data.sources) ? data.sources.map(String) : [],
    status: data.status === "archived" ? "archived" : "active",
    content,
  };
}

async function getMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? getMarkdownFiles(entryPath)
      : Promise.resolve(entry.name.endsWith(".md") && entry.name !== "README.md" ? [entryPath] : []);
  }));
  return files.flat();
}

export async function getNotes(): Promise<Note[]> {
  const contentDirectory = getContentDirectory();
  const files = (await Promise.all(paraDirectories.map(async (directory) => {
    const para = directory === "archives" ? "archive" : directory.slice(0, -1) as Note["para"];
    const paths = await getMarkdownFiles(path.join(/* turbopackIgnore: true */ contentDirectory, directory));
    return paths.map((filePath) => ({ filePath, para }));
  }))).flat();
  const notes = await Promise.all(
    files.map(async ({ filePath, para }) => {
      const source = await fs.readFile(filePath, "utf8");
      return parseNote(filePath, source, para);
    }),
  );
  const slugCounts = new Map<string, number>();
  for (const note of notes) slugCounts.set(note.slug, (slugCounts.get(note.slug) ?? 0) + 1);
  return notes
    .filter((note) => slugCounts.get(note.slug) === 1)
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export async function getNote(slug: string): Promise<Note | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  return (await getNotes()).find((note) => note.slug === slug) ?? null;
}
