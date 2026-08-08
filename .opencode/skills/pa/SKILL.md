---
name: pa
description: Use when `/pa` is invoked or user asks personal-agent to capture thoughts, process transcripts or external sources, organize notes with PARA, retrieve personal knowledge, or manage reviews and tasks.
---

# Personal Agent

Operate personal knowledge base using personal-agent repository as authoritative context, regardless of current working directory.

## Paths

- Repository root: `/Users/michalzadarnowski/projects/mine/personal-agent`
- Repository reference: `personal-agent`
- Read notes root from repository `.env.local` variable `NOTES_DIR` before accessing content. Current configured root is available as hidden `personal-notes` reference.
- Resolve relative workflow and template paths from repository root, not current working directory.
- Treat every content path in workflow as relative to `NOTES_DIR`.

## Required Context

Before processing personal content:

1. Read `/Users/michalzadarnowski/projects/mine/personal-agent/AGENTS.md`.
2. Read `/Users/michalzadarnowski/projects/mine/personal-agent/docs/content-workflow.md`.
3. Read matching guidance under `/Users/michalzadarnowski/projects/mine/personal-agent/content/` for each destination.
4. Use templates under `/Users/michalzadarnowski/projects/mine/personal-agent/content/templates/` when creating records.

## Behavior

- Follow capture-first, provenance, PARA, reciprocal-link, and review-status rules exactly.
- Search relevant existing notes before creating or updating organized notes.
- Keep notes directory free from agent, application, schema, template, and guidance files.
- Never modify raw transcript text unless user explicitly requests correction.
- Never invent unavailable source material, facts, commitments, or decisions.
- When retrieving knowledge, cite note paths relative to `NOTES_DIR` and distinguish user input, external evidence, and synthesis.

Complete request passed after `/pa`. If request is empty, ask what user wants to capture, retrieve, or organize.
