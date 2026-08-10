import fs from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

test("completes and archives from home while preserving todo editing", async ({ page }) => {
  const notesDirectory = test.info().config.metadata.notesDirectory as string;
  const tasksPath = path.join(notesDirectory, "inbox", "tasks.md");
  const archivePath = path.join(notesDirectory, "archives", "todos.md");
  await page.goto("/");
  await expect(page.getByText("2 remaining")).toBeVisible();
  await expect(page.getByRole("link", { name: "Duplicate overview" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Undated note", exact: true })).toBeVisible();
  await expect(page.getByText("Undated", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Complete Ship archive flow" }).click();
  await expect(page.getByText("1 remaining")).toBeVisible();
  await expect(page.getByText("Ship archive flow")).toBeHidden();

  await page.reload();
  await expect(page.getByText("Ship archive flow")).toBeHidden();
  await expect.poll(() => fs.readFile(tasksPath, "utf8")).not.toContain("Ship archive flow");
  await expect.poll(() => fs.readFile(archivePath, "utf8")).toContain("- [x] Ship archive flow Source: capture-1");

  await page.goto("/todos/archive");
  await expect(page.getByRole("heading", { name: "Todo archive" })).toBeVisible();
  await expect(page.getByText("Ship archive flow")).toBeVisible();

  await page.goto("/todos");
  await expect(page.getByRole("heading", { name: "Active todos" })).toBeVisible();
  await page.getByLabel("Title").fill("Editor still works");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect.poll(() => fs.readFile(tasksPath, "utf8")).toContain("- [ ] Editor still works");
  await page.reload();
  await expect(page.getByLabel("Title")).toHaveValue("Editor still works");
});
