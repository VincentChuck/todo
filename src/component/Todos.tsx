import { api } from "~/utils/api";
import Todo from "./Todo";
import CreateTodo from "~/component/CreateTodo";

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();
  if (isLoading)
    return (
      <TodosWrapper>
        <div>Loading todos 🔄</div>
      </TodosWrapper>
    );
  if (isError)
    return (
      <TodosWrapper>
        <div>Error fetching todos ❌</div>
      </TodosWrapper>
    );

  return (
    <TodosWrapper>
      {todos.length
        ? todos.map((todo) => <Todo key={todo.id} todo={todo} />)
        : "Create your first todo..."}
      <CreateTodo />
    </TodosWrapper>
  );
}

function TodosWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
        <h3 className="text-xl font-bold">Todos</h3>
        {props.children}
      </div>
    </div>
  );
}
