---
id: voice-capture-ideas
title: Voice capture ideas
category: projects
tags: [personal-agent, product, voice, local-ai, rag]
summary: A local voice-first assistant captures editable dictation into daily Markdown files and retrieves historical work context through an AI chat interface.
created: 2026-08-06
updated: 2026-08-08
sources: [capture-20260806-1730, capture-20260808-0038]
status: active
---

## Overview

Personal Agent should preserve rough spoken thoughts while making them easier to edit, save, find, and query. Its primary interface is local voice dictation with live transcription; daily Markdown files remain portable source data.

## Core workflow

1. User starts recording and sees local speech-to-text output appear in an editable text area.
2. User pauses, corrects transcription manually, and resumes without losing context.
3. User saves the finalized block under a timestamp in the current day's Markdown file.
4. A background process indexes changed note chunks for retrieval.
5. User asks questions or requests summaries through a secondary chat interface.

## Proposed architecture

- **Frontend:** Responsive React interface focused on recording controls, editable transcription, and chat. Streamlit remains a faster prototype option.
- **Speech-to-text:** Faster-Whisper or Whisper.cpp running locally.
- **Backend:** FastAPI handles audio streaming, file writes, and requests to retrieval and model services.
- **Model runtime:** Ollama or llama.cpp hosts a local conversational model such as Gemma.
- **Retrieval:** ChromaDB or FAISS stores embeddings of chunks split by timestamp or paragraph.
- **Storage:** One chronological Markdown file per day, plus separate derived vector-index files.

## Retrieval flow

1. Watch daily note files for changes.
2. Split new content into logical chunks and create local embeddings.
3. Store embeddings in a local vector index.
4. Embed each user query and retrieve relevant chunks.
5. Give retrieved context to the local model for response generation.

## Implementation phases

1. Prototype hold-to-record dictation, live editable text, and explicit save action.
2. Add FastAPI file management that creates or appends to the current daily note with a timestamp.
3. Add local model runtime, note indexing, retrieval, and side-by-side chat.

## Guardrail

Agent may suggest links between notes, but should never merge distinct ideas silently.

## Open questions

- Does the first useful version need RAG, or can direct date and text search cover the initial note volume?
- Which model, embedding model, and runtime meet latency targets on available hardware?
- How should interrupted recordings and concurrent file writes recover safely?
