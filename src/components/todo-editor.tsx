"use client";

import { useActionState, useState } from "react";
import { saveTodosAction, type SaveTodosState } from "@/app/actions";
import type { Todo } from "@/lib/library";

function sameTodos(left: Todo[], right: Todo[]) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function TodoEditor({ initialTodos }: { initialTodos: Todo[] }) {
  const [saved, setSaved] = useState(initialTodos);
  const [todos, setTodos] = useState(initialTodos);
  const [, action, pending] = useActionState<SaveTodosState, FormData>(async (_, formData) => {
    const result = await saveTodosAction(null, formData);
    if (result) {
      setSaved(result.todos);
      setTodos(result.todos);
    }
    return result;
  }, null);
  const dirty = !sameTodos(todos, saved);

  function update(line: number, patch: Partial<Todo>) {
    setTodos((current) => current.map((todo) => todo.line === line ? { ...todo, ...patch } : todo));
  }

  return (
    <form action={action} className="todo-editor">
      <input type="hidden" name="todos" value={JSON.stringify(todos)} />
      <div className="todo-editor-toolbar">
        <p>{todos.filter((todo) => !todo.completed).length} open · {todos.filter((todo) => todo.completed).length} done</p>
        {dirty && <button className="save-button" type="submit" disabled={pending || todos.some((todo) => !todo.title.trim())}>{pending ? "Saving…" : "Save changes"}</button>}
      </div>
      {todos.length ? (
        <ul className="todo-editor-list">
          {todos.map((todo) => (
            <li key={todo.line} className={todo.completed ? "is-complete" : undefined}>
              <label>
                <span>Title</span>
                <input value={todo.title} onChange={(event) => update(todo.line, { title: event.target.value })} />
              </label>
              <label>
                <span>Status</span>
                <select value={todo.completed ? "done" : "open"} onChange={(event) => update(todo.line, { completed: event.target.value === "done" })}>
                  <option value="open">Open</option>
                  <option value="done">Done</option>
                </select>
              </label>
            </li>
          ))}
        </ul>
      ) : <p className="empty-state">No todos yet.</p>}
    </form>
  );
}
