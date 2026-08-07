---
id: local-files-as-application-data
title: Local files as application data
category: ideas
tags: [local-first, file-system, offline, architecture]
summary: A local-first application can use plain files as its primary data source, avoiding database costs while preserving offline access and user control.
created: 2026-08-08
updated: 2026-08-08
sources: [capture-20260808-0038]
status: active
---

## Overview

Run an application locally and treat files on the user's machine as its source of truth. The application reads and renders plain text, JSON, or Markdown and can write changes back to disk.

## Benefits

- No hosted database cost.
- Offline operation.
- Portable, inspectable data owned by the user.

## Implementation options

1. **Local server:** A lightweight Node.js or Python process exposes native file-system operations through a localhost API. This is the recommended starting point in the source.
2. **File System Access API:** Browser asks the user for direct directory access, removing the local backend where supported.
3. **Desktop wrapper:** Electron or Tauri packages the web interface with native file access.

## Open questions

- Which file formats and directory conventions form the storage contract?
- Is browser compatibility important enough to favor a local server or desktop wrapper?
- How should concurrent edits, backups, and file corruption be handled?
