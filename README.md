# Personal Agent

Local-first system that turns rough spoken thoughts into organized Markdown knowledge while preserving original captures.

## Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Model

```text
content/
├── captures/YYYY/MM/       # Immutable raw transcripts
├── notes/<category>/       # Polished, organized knowledge
└── templates/              # Canonical Markdown schemas
```

Processing flow:

```text
raw input -> draft capture -> classify/summarize -> create or update notes -> processed capture
```

See [`docs/content-workflow.md`](docs/content-workflow.md) for schemas, category guidance, and mandatory processing rules. Repository agents also receive these rules through [`AGENTS.md`](AGENTS.md).

## Application Structure

- `src/lib/notes.ts`: recursive note parser and storage boundary
- `src/app/page.tsx`: note library
- `src/app/notes/[slug]/page.tsx`: rendered polished note
- `src/components`: shared presentation

Routes use note slug alone, so filenames and note IDs must remain globally unique across category folders.

## Next Features

Likely increments: transcript intake UI, schema validation, AI processing, review queue, search, backlinks, and editing. No AI provider or database chosen yet.
