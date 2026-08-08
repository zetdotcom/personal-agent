# Personal Agent

Local-first Second Brain that turns raw text and source material into organized Markdown knowledge while preserving original evidence.

## Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:4444](http://localhost:4444).

## Content Model

Canonical notes live outside this repository. Set their absolute path in `.env.local`:

```bash
NOTES_DIR=/absolute/path/to/notes
```

```text
NOTES_DIR/
├── captures/YYYY/MM/       # Immutable user input
├── sources/YYYY/MM/        # Retrieved external source material
├── projects/               # Committed, finite outcomes
├── areas/                  # Ongoing responsibilities
├── resources/              # Useful ideas, topics, and summaries
├── archives/               # Inactive PARA material
├── inbox/                  # Processed, unassigned actions
├── reviews/weekly/         # Review records
```

Processing flow:

```text
raw input -> immutable capture -> optional source record -> PARA notes -> pending review
```

This repository uses PARA (Projects, Areas, Resources, Archives) for processed material and adds immutable captures for provenance. See [`docs/content-workflow.md`](docs/content-workflow.md) for classification, schemas, and mandatory processing rules. Agent guidance and templates remain under repository [`content`](content); personal data lives only under `NOTES_DIR`. Repository agents receive these rules through [`AGENTS.md`](AGENTS.md).

## Application Structure

- `src/lib/notes.ts`: PARA note parser and storage boundary
- `src/app/page.tsx`: note library
- `src/app/notes/[slug]/page.tsx`: rendered polished note
- `src/components`: shared presentation

Routes use note slug alone, so filenames and note IDs must remain globally unique across all PARA folders.

## Next Features

Likely increments: transcript intake UI, schema validation, AI processing, review queue, search, backlinks, and editing. No AI provider or database chosen yet.
