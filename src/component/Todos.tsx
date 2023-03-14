import { api } from "~/utils/api";
import Todo from "./Todo";
import CreateTodo from "~/component/CreateTodo";

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();
  if (isLoading) return <Background>Loading todos 🔄</Background>;
  if (isError) return <Background>Error fetching todos ❌</Background>;
  return (
    <Background>
      {todos.length
        ? todos.map((todo) => <Todo key={todo.id} todo={todo} />)
        : "Create your first todo..."}
      <CreateTodo />
    </Background>
  );
}

type Props = {
  children:
    | Array<JSX.Element[] | JSX.Element | string>
    | JSX.Element[]
    | JSX.Element
    | null
    | string;
};

function Background({ children }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
      <h3 className="text-xl font-bold">Todos ✅</h3>
      {children}
    </div>
  );
}
