import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const notesDirectory = path.join(process.cwd(), "content", "notes");

export type Note = {
  id: string;
  slug: string;
  title: string;
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
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value ?? "");
}

function parseNote(filePath: string, source: string): Note {
  const { data, content } = matter(source);
  const slug = path.basename(filePath, ".md");

  return {
    id: String(data.id ?? slug),
    slug,
    title: String(data.title ?? slug),
    category: String(data.category ?? path.basename(path.dirname(filePath))),
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
      : Promise.resolve(entry.name.endsWith(".md") ? [entryPath] : []);
  }));
  return files.flat();
}

export async function getNotes(): Promise<Note[]> {
  const files = await getMarkdownFiles(notesDirectory);
  const notes = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(file, "utf8");
      return parseNote(file, source);
    }),
  );
  return notes.sort((a, b) => b.updated.localeCompare(a.updated));
}

export async function getNote(slug: string): Promise<Note | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  return (await getNotes()).find((note) => note.slug === slug) ?? null;
}
