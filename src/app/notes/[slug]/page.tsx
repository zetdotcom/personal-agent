import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mark } from "@/components/mark";
import { getNote, getNotes } from "@/lib/notes";

export async function generateStaticParams() {
  return (await getNotes()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const note = await getNote((await props.params).slug);
  return note ? { title: note.title, description: note.summary } : {};
}

export default async function NotePage(props: PageProps<"/notes/[slug]">) {
  const note = await getNote((await props.params).slug);
  if (!note) notFound();

  return (
    <main className="shell note-shell">
      <header className="site-header">
        <Link className="brand" href="/"><Mark /> Fieldnotes</Link>
        <Link className="back-link" href="/">← All notes</Link>
      </header>
      <article className="note-detail">
        <header>
          <p className="eyebrow">{note.category} / Updated {note.updated}</p>
          <h1>{note.title}</h1>
          <p className="note-summary">{note.summary}</p>
          <ul className="detail-tags">{note.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
        </header>
        <div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown></div>
      </article>
    </main>
  );
}
