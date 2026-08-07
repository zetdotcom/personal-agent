import Link from "next/link";
import type { CSSProperties } from "react";
import type { Note } from "@/lib/notes";

const dateFormatter = new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" });

export function NoteCard({ note, index }: { note: Note; index: number }) {
  return (
    <article className="note-card" style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
      <div className="note-card-meta"><span>{note.category}</span><time dateTime={note.updated}>{dateFormatter.format(new Date(`${note.updated}T00:00:00`))}</time></div>
      <h2><Link href={`/notes/${note.slug}`}>{note.title}</Link></h2>
      <p>{note.summary}</p>
      <div className="note-card-footer">
        <ul aria-label="Tags">{note.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
        <Link className="open-note" href={`/notes/${note.slug}`} aria-label={`Open ${note.title}`}><span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
