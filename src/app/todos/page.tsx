import Link from "next/link";
import { connection } from "next/server";
import { Mark } from "@/components/mark";
import { TodoEditor } from "@/components/todo-editor";
import { getTodos } from "@/lib/library";

export default async function TodosPage() {
  await connection();
  const todos = await getTodos();

  return (
    <main className="shell note-shell">
      <header className="site-header">
        <Link className="brand" href="/"><Mark /> Fieldnotes</Link>
        <Link className="back-link" href="/">← Home</Link>
      </header>
      <section className="todos-page">
        <header>
          <p className="eyebrow">Task inbox</p>
          <h1>All todos</h1>
          <p>Edit titles and statuses here. Nothing changes in your Markdown file until you save.</p>
        </header>
        <TodoEditor initialTodos={todos} />
      </section>
    </main>
  );
}
