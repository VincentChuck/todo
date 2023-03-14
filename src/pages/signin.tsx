import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const status = await signIn("email", {
      redirect: false,
      email: data.email,
      callbackUrl: "/",
    });

    if (status && status.ok && status.url) void router.push(status.url);
  };

  return (
    <div className="flex flex-col rounded-xl bg-white/10 p-4 text-white">
      <h3 className="text-xl font-bold">Sign-in</h3>
      <h2 className="text-sm text-gray-300">No password required!</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex flex-col gap-4 pt-6 pb-8 "
      >
        <div>
          {errors.email && (
            <p className="ml-1 text-xs italic text-red-500">
              {errors.email?.message}
            </p>
          )}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-auto whitespace-nowrap rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 ${
                isSubmitting
                  ? "bg-gray-900"
                  : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }`}
            >
              {isSubmitting ? "Processing" : "Send link"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;
