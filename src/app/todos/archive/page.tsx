import Link from "next/link";
import { connection } from "next/server";
import { Mark } from "@/components/mark";
import { getArchivedTodos } from "@/lib/library";

export default async function TodoArchivePage() {
  await connection();
  const todos = await getArchivedTodos();

  return (
    <main className="shell note-shell">
      <header className="site-header">
        <Link className="brand" href="/"><Mark /> Fieldnotes</Link>
        <Link className="back-link" href="/todos">← Active todos</Link>
      </header>
      <section className="todos-page">
        <header>
          <p className="eyebrow">Task history</p>
          <h1>Todo archive</h1>
          <p>Completed tasks, preserved in Markdown.</p>
        </header>
        {todos.length ? (
          <ul className="todo-archive-list">
            {todos.toReversed().map((todo) => <li key={todo.line}>{todo.title}</li>)}
          </ul>
        ) : <p className="empty-state">No completed todos yet.</p>}
      </section>
    </main>
  );
}
