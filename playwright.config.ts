import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { defineConfig } from "@playwright/test";

const notesDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "personal-agent-e2e-"));
for (const directory of ["inbox", "projects", "areas", "resources", "archives"]) {
  fs.mkdirSync(path.join(notesDirectory, directory), { recursive: true });
}
for (const directory of ["projects/one", "areas/two"]) {
  fs.mkdirSync(path.join(notesDirectory, directory), { recursive: true });
  fs.writeFileSync(path.join(notesDirectory, directory, "overview.md"), "---\ntitle: Duplicate overview\nupdated: 2026-08-10\n---\n", "utf8");
}
fs.writeFileSync(
  path.join(notesDirectory, "inbox", "tasks.md"),
  "# Tasks\n\n- [ ] Ship archive flow Source: capture-1\n- [ ] Keep editor working\n",
  "utf8",
);
fs.writeFileSync(
  path.join(notesDirectory, "resources", "undated.md"),
  "---\ntitle: Undated note\nsummary: Missing date must not break home.\n---\n",
  "utf8",
);

export default defineConfig({
  testDir: "./tests/integration",
  fullyParallel: false,
  workers: 1,
  outputDir: "test-results",
  use: {
    baseURL: "http://127.0.0.1:4445",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `NOTES_DIR="${notesDirectory}" NEXT_DIST_DIR=.next-test pnpm next build && NOTES_DIR="${notesDirectory}" NEXT_DIST_DIR=.next-test pnpm next start --port 4445`,
    url: "http://127.0.0.1:4445",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  metadata: { notesDirectory },
});
