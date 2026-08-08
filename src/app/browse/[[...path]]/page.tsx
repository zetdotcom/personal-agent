import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mark } from "@/components/mark";
import { getLibraryEntry } from "@/lib/library";

function browseHref(segments: string[]) {
  return segments.length ? `/browse/${segments.map(encodeURIComponent).join("/")}` : "/browse";
}

export default async function BrowsePage({ params }: { params: Promise<{ path?: string[] }> }) {
  const segments = (await params).path ?? [];
  const entry = await getLibraryEntry(segments);
  if (!entry) notFound();

  const parent = segments.slice(0, -1);
  const currentName = segments.at(-1) ?? "All files";

  return (
    <main className="shell note-shell">
      <header className="site-header">
        <Link className="brand" href="/"><Mark /> Fieldnotes</Link>
        <Link className="back-link" href={segments.length ? browseHref(parent) : "/"}>
          {segments.length ? "← Up one level" : "← Home"}
        </Link>
      </header>
      <section className="browser" aria-labelledby="browser-title">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/browse">Files</Link>
          {segments.map((segment, index) => (
            <span key={segments.slice(0, index + 1).join("/")}>
              <i>/</i><Link href={browseHref(segments.slice(0, index + 1))}>{segment.replace(/\.md$/, "")}</Link>
            </span>
          ))}
        </nav>

        {entry.type === "folder" ? (
          <>
            <div className="browser-heading">
              <div><p className="eyebrow">Folder / {entry.items.length} items</p><h1 id="browser-title">{currentName}</h1></div>
              {segments.length > 0 && <Link className="up-button" href={browseHref(parent)}>↑ Parent folder</Link>}
            </div>
            {entry.items.length > 0 ? (
              <ul className="file-list">
                {entry.items.map((item) => {
                  const href = browseHref([...segments, item.name]);
                  return (
                    <li key={item.name}>
                      {item.type === "folder" ? (
                        <Link href={href}><span className="file-icon folder-icon" aria-hidden="true" /><span><strong>{item.name}</strong><small>{item.fileCount} {item.fileCount === 1 ? "file" : "files"}</small></span><b aria-hidden="true">→</b></Link>
                      ) : item.name.endsWith(".md") ? (
                        <Link href={href}><span className="file-icon document-icon" aria-hidden="true" /><span><strong>{item.name.replace(/\.md$/, "")}</strong><small>Markdown</small></span><b aria-hidden="true">→</b></Link>
                      ) : (
                        <div><span className="file-icon document-icon" aria-hidden="true" /><span><strong>{item.name}</strong><small>File</small></span></div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : <p className="empty-state">This folder is empty.</p>}
          </>
        ) : (
          <article className="file-detail">
            <header><p className="eyebrow">Markdown file</p><h1 id="browser-title">{matter(entry.source).data.title ?? entry.name}</h1></header>
            <div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{matter(entry.source).content}</ReactMarkdown></div>
          </article>
        )}
      </section>
    </main>
  );
}
