<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Personal Agent Content Rules

When user provides raw thoughts, spoken-note text, or a transcript, read `NOTES_DIR` from `.env.local` and follow `docs/content-workflow.md` exactly. All content paths below are relative to `NOTES_DIR`.

- Write source capture under `captures/YYYY/MM` before creating or updating polished notes.
- Never rewrite text below capture's `# Raw transcript` heading unless user explicitly requests transcript correction.
- For a URL or pasted external resource, preserve available transcript/extract under `sources/YYYY/MM` with provenance; never invent unavailable source material.
- Read relevant existing files in `projects`, `areas`, and `resources` before deciding whether to create or update notes.
- Organize processed notes with PARA: committed finite outcomes in `projects`, ongoing responsibilities in `areas`, potentially useful knowledge in `resources`, and inactive material in `archives`.
- Keep uncommitted app, software, and writing ideas in `resources/ideas`; promote them only after user commits to a concrete outcome with a next action.
- Split independent themes into focused living notes and link every result to its capture. Update an existing note when later input develops same durable idea.
- Put processed actions with no project or area in `inbox/tasks.md`.
- Use input language for organized notes. Source summaries remain separate Resource notes; update a topic synthesis when reusable insight exists.
- Write organized notes immediately with `review_status: pending`; uncertainty must remain explicit.
- Keep note slugs and IDs globally unique across all PARA folders because routes use slug alone.
- Maintain capture-to-note links in both files.
- Do not invent details. Preserve uncertainty and use capture status `needs-review` when source cannot be safely resolved.
- Read relevant guidance under repository `content/` before writing to its matching destination under `NOTES_DIR`.
- Treat `docs/content-workflow.md` as authoritative when content conventions are unclear.
