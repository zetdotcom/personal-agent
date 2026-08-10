import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getTodos, setTodoCompleted } from "@/lib/library";

export async function PATCH(request: Request, { params }: RouteContext<"/api/todos/[line]">) {
  const line = Number((await params).line);
  const body = await request.json() as unknown;
  if (!body || typeof body !== "object" || !("completed" in body) || typeof body.completed !== "boolean") {
    return NextResponse.json({ error: "Invalid todo" }, { status: 400 });
  }

  try {
    await setTodoCompleted(line, body.completed);
    revalidatePath("/");
    revalidatePath("/todos");
    revalidatePath("/todos/archive");
    return NextResponse.json({ todos: await getTodos() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update todo";
    return NextResponse.json({ error: message }, { status: message === "Todo no longer exists" ? 404 : 400 });
  }
}
