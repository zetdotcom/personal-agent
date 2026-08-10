# Content Workflow

This repository implements a local-first Second Brain. It uses PARA for organized material and immutable captures for provenance. Files under the external `NOTES_DIR` are canonical; application views and AI indexes are derived.

## Storage

```text
NOTES_DIR/
├── captures/YYYY/MM/       # Exact user input
├── sources/YYYY/MM/        # Retrieved external transcripts or extracts
├── projects/<project>/     # Committed finite outcomes
├── areas/<area>/           # Ongoing responsibilities
├── resources/
│   ├── ideas/              # Uncommitted ideas
│   ├── topics/             # Durable knowledge by topic
│   └── sources/            # Source-specific summaries
├── archives/               # Inactive PARA material
│   └── todos.md            # Completed task history
├── inbox/tasks.md          # Processed actions without a home
├── reviews/weekly/YYYY/    # Weekly review records
└── templates/              # Canonical schemas
```

Matching folders under repository `content/` contain agent guidance and templates. This document is authoritative if guidance conflicts.

## Classification

PARA answers what information is actionable for now, not merely what subject it concerns.

- **Project:** committed, finite outcome with at least one next action. Deadline is optional. Keep project overview and supporting notes together under one project folder.
- **Area:** ongoing responsibility with a standard to maintain and no completion date. Initial areas are `work`, `business`, `finance`, `personal`, and `home`.
- **Resource:** useful knowledge, interest, external summary, or uncommitted idea. Promote an idea to a Project only when user commits to an outcome and next action.
- **Archive:** completed, paused, abandoned, or irrelevant material moved from another PARA category. Preserve it for history and search.

Captures, source records, task inbox, and reviews support PARA but are not additional PARA categories.

## Capture Contract

Capture front matter:

- `id`: `capture-YYYYMMDD-HHMM`; add numeric suffix on collision.
- `created`: ISO 8601 timestamp.
- `source`: `voice` or `text`.
- `status`: `draft`, `processed`, or `needs-review`.
- `generated_notes`: paths relative to `NOTES_DIR` for every created or updated organized note.
- `source_materials`: optional source-record IDs created from links or pasted external resources.

Everything below `# Raw transcript` is immutable source text. Correcting transcription requires explicit user instruction. Processing may only change front matter.

## External Source Contract

When input includes an article, video, or other external resource:

1. Preserve user's exact request and URL in a capture.
2. Save available transcript or extract in `sources/YYYY/MM`; do not claim unavailable material was retrieved.
3. Record source URL, title, creator or publisher when known, publication date when known, retrieval timestamp, and originating capture ID.
4. Never rewrite saved source material except to correct an explicitly identified retrieval error.
5. Create a source-specific summary under `resources/sources`.
6. Update a focused topic note separately when source provides reusable insight.

This separation preserves what user asked, what external source contained, and what agent concluded.

## Organized Note Contract

Organized note front matter:

- `id`: stable, globally unique kebab-case identifier, normally filename.
- `title`: concise human-readable title.
- `para`: `project`, `area`, `resource`, or `archive`; must match storage location.
- `type`: `idea`, `project`, `topic`, `source-summary`, `decision`, `reflection`, or `plan`.
- `tags`: narrow discovery terms in lowercase kebab-case, usually three to seven.
- `summary`: one or two standalone sentences describing meaning and value.
- `created`: date note first appeared.
- `updated`: date content last changed.
- `sources`: capture IDs supporting note content.
- `source_materials`: optional external source-record IDs.
- `status`: `active` or `archived`.
- `review_status`: `pending` or `reviewed`.

Body uses useful semantic headings such as `Overview`, `Key ideas`, `Decisions`, `Actions`, `Open questions`, and `Related`. Do not force empty sections. Use input language.

## Processing Rules

1. Save exact input as a draft capture before interpreting it.
2. If external content is used, save available source material and provenance before summarizing it.
3. Search relevant Projects, Areas, and Resources before choosing create versus update.
4. Split independently useful themes into separate focused living notes; link all outputs to same capture.
5. Update an existing note when input develops same durable idea. Preserve `id` and `created`.
6. Never silently merge distinct ideas.
7. Preserve user intent, uncertainty, and first-person commitments. Never invent facts, decisions, or actions.
8. Classify by actionability using PARA. A subject can appear in several categories because each file serves different purpose.
9. Keep tasks in project or area context when one exists. Add unassigned processed actions to `inbox/tasks.md`.
10. Write organized notes to correct PARA location with `review_status: pending`; user reviews final outcome later.
11. Link both directions: note `sources` contains capture ID; capture `generated_notes` contains note path relative to `NOTES_DIR`.
12. Mark capture `processed` only after every output and reciprocal link is written. Use `needs-review` when ambiguity prevents safe processing.
13. Archive rather than delete inactive organized material. Preserve original PARA location in archive structure when practical.

## Retrieval Rules For Agents

1. Determine whether query concerns current action, responsibility, reusable knowledge, history, raw input, or source evidence.
2. Search metadata and filenames in relevant active PARA folders first.
3. Read summaries and headings before loading entire long notes.
4. Follow `sources` and `source_materials` when provenance matters.
5. Search Archives for historical context, not as default current truth.
6. Distinguish user input, external-source claims, and agent synthesis in answers.
7. Cite local file paths when answering from repository knowledge and state when evidence is missing or uncertain.

## Review

- Pending organized notes remain in correct PARA location and use `review_status: pending`; do not create separate review folder.
- Weekly review should process capture and task inboxes, inspect active Projects, reconsider stale tasks, review pending notes, and archive inactive material.
- Review should be short and honest. Do not preserve tasks or projects only because they existed last week.
- Completing an inbox task moves it from `inbox/tasks.md` to `archives/todos.md`.
