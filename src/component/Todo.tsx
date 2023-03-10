import toast from "react-hot-toast";
import type { Todo } from "~/types";
import { api } from "~/utils/api";

type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  const { id, text, done } = todo;

  const trpc = api.useContext();

  const { mutate: doneMutation } = api.todo.toggle.useMutation({
    onMutate: async ({ id, done }) => {
      await trpc.todo.all.cancel();

      const previousTodos = trpc.todo.all.getData();

      trpc.todo.all.setData(undefined, (prev) => {
        if (!prev) return previousTodos;
        return prev.map((t) => (t.id === id ? { ...t, done } : t));
      });

      return { previousTodos };
    },

    onSuccess: (_todo, { done }) => {
      if (done) {
        toast.success("Todo completed 🎉");
      }
    },

    onError: (_err, _todo, context) => {
      toast.error(
        `An error occured when marking todo as ${done ? "done" : "undone"}`
      );
      if (!context) return;
      trpc.todo.all.setData(undefined, () => context.previousTodos);
    },

    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });

  const { mutate: deleteMutation } = api.todo.delete.useMutation({
    onMutate: async (deleteId) => {
      await trpc.todo.all.cancel();

      const previousTodos = trpc.todo.all.getData();

      trpc.todo.all.setData(undefined, (prev) => {
        if (!prev) return previousTodos;
        return prev.filter((t) => t.id !== deleteId);
      });

      return { previousTodos };
    },

    onError: (_err, _todo, context) => {
      toast.error("An error occured when deleting todo");
      if (!context) return;
      trpc.todo.all.setData(undefined, () => context.previousTodos);
    },

    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <input
          className="h-4 w-4 rounded ring-offset-gray-800 focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-800"
          type="checkbox"
          name="done"
          id={id}
          checked={done}
          onChange={(e) => {
            doneMutation({ id, done: e.target.checked });
          }}
        />
        <label
          htmlFor={id}
          className={`cursor-pointer ${done ? "line-through" : ""}`}
        >
          {text}
        </label>
      </div>
      <button
        className="w-auto rounded-lg bg-blue-700 px-2 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          deleteMutation(id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
