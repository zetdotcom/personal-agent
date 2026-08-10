"use client";

import { useState } from "react";
import Link from "next/link";
import type { Todo } from "@/lib/library";

export function HomeTodos({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [savingLine, setSavingLine] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function complete(todo: Todo) {
    setSavingLine(todo.line);
    setError(null);
    try {
      const response = await fetch(`/api/todos/${todo.line}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      const result = await response.json() as { todos?: Todo[]; error?: string };
      if (!response.ok || !result.todos) throw new Error(result.error ?? "Unable to update todo");
      setTodos(result.todos.filter((candidate) => !candidate.completed));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to update todo");
    } finally {
      setSavingLine(null);
    }
  }

  return (
    <>
      <div className="section-heading"><h2><Link href="/todos">Open todos</Link></h2><span>{todos.length} remaining</span></div>
      {todos.length ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.line}>
              <div>
                <button
                  type="button"
                  className="todo-toggle"
                  aria-label={`Complete ${todo.title}`}
                  disabled={savingLine !== null}
                  onClick={() => complete(todo)}
                >
                  <span aria-hidden="true" />
                </button>
                <span className={savingLine === todo.line ? "is-saving" : undefined}>{todo.title}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="empty-state">Nothing waiting. Inbox is clear.</p>}
      {error && <p className="todo-error" role="alert">{error}</p>}
    </>
  );
}
