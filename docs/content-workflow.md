# Content Workflow

## Storage

```text
content/
├── captures/
│   └── YYYY/MM/YYYY-MM-DD-HHMM.md
├── notes/
│   └── <category>/<globally-unique-slug>.md
└── templates/
    ├── capture.md
    └── note.md
```

Captures are source records. Notes are polished knowledge. Templates document both schemas.

## Capture Contract

Capture front matter:

- `id`: `capture-YYYYMMDD-HHMM`; add a numeric suffix on collision.
- `created`: ISO 8601 timestamp.
- `source`: currently `voice` or `text`.
- `status`: `draft`, `processed`, or `needs-review`.
- `generated_notes`: relative paths below `content/notes`.

Everything below `# Raw transcript` is immutable source text. Correcting transcription requires explicit user instruction. Processing may only change `status` and `generated_notes`.

## Polished Note Contract

Note front matter:

- `id`: stable, globally unique kebab-case identifier, normally same as filename.
- `title`: concise human-readable title.
- `category`: broad folder category in kebab-case.
- `tags`: narrow discovery terms in kebab-case.
- `summary`: one or two standalone sentences describing meaning and value.
- `created`: date note first appeared.
- `updated`: date content last changed.
- `sources`: capture IDs supporting note content.
- `status`: `active` or `archived`.

Body uses useful semantic sections such as `Overview`, `Key ideas`, `Decisions`, `Actions`, `Open questions`, and `Related`. Do not force empty sections.

## Processing Rules

1. Save unedited input as a `draft` capture before interpreting it.
2. Read existing notes before choosing create versus update.
3. Split one capture into multiple notes when it contains independently useful themes.
4. Update an existing note when input develops same durable idea; preserve its `id` and `created` date.
5. Create a new note when idea has a distinct purpose or would be searched for independently.
6. Preserve user intent, uncertainty, and first-person commitments. Never invent facts, decisions, or actions.
7. Remove verbal filler and repetition. Resolve ambiguity only when context supports it; otherwise add `Open questions` and set capture to `needs-review`.
8. Use one broad category. Prefer an existing category; create one only when none fits.
9. Link both directions: note `sources` contains capture ID, capture `generated_notes` contains note path.
10. Mark capture `processed` only after all generated or updated notes are written successfully.

## Category Guidance

Categories describe stable life areas, not temporary topics. Initial categories are `projects`, `personal`, `home`, `ideas`, and `reference`. Keep hierarchy one folder deep until volume proves another level necessary.

Tags provide detail. Prefer existing tags, lowercase kebab-case, and usually three to seven per note.
