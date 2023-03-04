import { api } from "~/utils/api";
import Todo from "./Todo";

export default function DisplayTodos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();
  if (isLoading) return <div>Loading todos 🔄</div>;
  if (isError) return <div>Error fetching todos ❌</div>;

  return (
    <div className="gap-r grid grid-cols-1 md:gap-8">
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
        <h3 className="text-xl font-bold">Todos</h3>
        {todos.length
          ? todos.map((todo) => <Todo key={todo.id} todo={todo} />)
          : "Create your first todo..."}
      </div>
    </div>
  );
}
