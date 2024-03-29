import { useState } from "react";
import toast from "react-hot-toast";
import { type Todo, todoInput } from "~/types";
import { api } from "~/utils/api";

export default function CreateTodo() {
  const [newTodo, setNewTodo] = useState("");
  const trpc = api.useContext();

  const { mutate } = api.todo.create.useMutation({
    onMutate: async () => {
      await trpc.todo.all.cancel();

      const previousTodos = trpc.todo.all.getData();
      const Now = new Date();

      trpc.todo.all.setData(undefined, (prev) => {
        const optimisticTodo: Todo = {
          id: `optimistic-todo-id-${newTodo}-${Now.toJSON()}`,
          text: newTodo,
          done: false,
          createdAt: Now,
        };
        return [...(prev || []), optimisticTodo].sort((a, b) => {
          if (a.done === b.done) {
            return (
              new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
            );
          }
          return a.done ? 1 : -1;
        });
      });

      setNewTodo("");

      return { previousTodos };
    },

    onError: (_err, newTodo, context) => {
      toast.error("An error occured when creating todo");
      setNewTodo(newTodo);
      if (!context) return;
      trpc.todo.all.setData(undefined, () => context.previousTodos);
    },

    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const result = todoInput.safeParse(newTodo);
    if (!result.success) {
      toast.error(result.error.format()._errors.join("\n"));
      return;
    }
    mutate(newTodo);
  }

  return (
    <div>
      <form className="flex gap-2" onSubmit={submitHandler}>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="New Todo ..."
          type="text"
          name="new-todo"
          id="new-todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button className="w-auto rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Create
        </button>
      </form>
    </div>
  );
}
