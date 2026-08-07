---
id: llm-generated-ui-fixed-api-contract
title: LLM-generated UI with a fixed API contract
category: ideas
tags: [llm, dynamic-ui, api-contract, micro-frontend, security]
summary: Generate personalized browser interfaces on demand while keeping data and business rules behind a stable, validated backend API.
created: 2026-08-08
updated: 2026-08-08
sources: [capture-20260808-0038]
status: active
---

## Overview

An LLM generates a bespoke HTML, CSS, and JavaScript interface from a user's requested layout or workflow. Every generated interface must use a predefined backend API, leaving persistence, validation, authorization, and business logic under permanent backend control.

## Workflow

1. User describes desired interface, such as a dark Kanban dashboard for recent tasks.
2. System supplies prompt and API schema to the LLM.
3. LLM generates a small web application against only those endpoints.
4. Host renders generated code in an isolated environment.
5. Generated interface sends authenticated requests to the backend.

## Invariants

- Backend API contract remains stable across generated interfaces.
- Backend validates every read and mutation independently of generated code.
- Generated UI never becomes authority for business rules or data integrity.

## Open questions

- What sandbox prevents generated JavaScript from accessing host-page data, credentials, or unintended network targets?
- How are authentication credentials exposed without making them available to generated code?
- Should generated applications require static analysis, capability declarations, or user approval before execution?
- How are API schema evolution, generated-code storage, and rollback handled?

An iframe or Shadow DOM can provide rendering or style isolation, but they do not provide equivalent security boundaries; the execution model needs separate design.
