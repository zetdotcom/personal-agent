import Link from "next/link";
import { Mark } from "@/components/mark";
import { NoteCard } from "@/components/note-card";
import { getNotes } from "@/lib/notes";

export default async function Home() {
  const notes = await getNotes();
  const groups = new Set(notes.map((note) => note.category));

  return (
    <main className="shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Fieldnotes home"><Mark /> Fieldnotes</Link>
        <span className="status"><i /> Local knowledge</span>
      </header>
      <section className="hero">
        <p className="eyebrow">Personal archive / {new Date().getFullYear()}</p>
        <h1>Thoughts, <em>made findable.</em></h1>
        <p className="intro">A quiet home for spoken ideas, passing observations, and things worth remembering.</p>
        <dl className="stats">
          <div><dt>{notes.length.toString().padStart(2, "0")}</dt><dd>notes</dd></div>
          <div><dt>{groups.size.toString().padStart(2, "0")}</dt><dd>groups</dd></div>
        </dl>
      </section>
      <section className="library" aria-labelledby="library-title">
        <div className="section-heading"><h2 id="library-title">Recent notes</h2><span>Newest first</span></div>
        <div className="note-grid">{notes.map((note, index) => <NoteCard key={note.slug} note={note} index={index} />)}</div>
      </section>
      <footer>Captured in Markdown. Kept close.</footer>
    </main>
  );
}
