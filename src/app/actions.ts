"use server";

import { revalidatePath } from "next/cache";
import { getTodos, saveTodos, type Todo } from "@/lib/library";

export type SaveTodosState = { savedAt: number; todos: Todo[] } | null;

export async function saveTodosAction(_: SaveTodosState, formData: FormData): Promise<SaveTodosState> {
  const value = formData.get("todos");
  if (typeof value !== "string") throw new Error("Missing todos");

  const edits = JSON.parse(value) as unknown;
  if (!Array.isArray(edits)) throw new Error("Invalid todos");
  await saveTodos(edits as Todo[]);
  revalidatePath("/");
  revalidatePath("/todos");
  return { savedAt: Date.now(), todos: await getTodos() };
}
