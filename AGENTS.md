<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Personal Agent Content Rules

When user provides raw thoughts, spoken-note text, or a transcript, follow `docs/content-workflow.md` exactly.

- Write source capture under `content/captures/YYYY/MM` before creating or updating polished notes.
- Never rewrite text below capture's `# Raw transcript` heading unless user explicitly requests transcript correction.
- Read existing `content/notes/**/*.md` files before deciding whether to create or update notes.
- Store polished notes under `content/notes/<category>/<slug>.md` using `content/templates/note.md` schema.
- Keep note slugs and IDs globally unique across all categories because routes use slug alone.
- Maintain capture-to-note links in both files.
- Do not invent details. Preserve uncertainty and use `needs-review` when source cannot be safely resolved.
- Treat `docs/content-workflow.md` as authoritative when content conventions are unclear.
