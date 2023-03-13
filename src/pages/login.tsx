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
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 px-8 pt-6 pb-8">
      <input type="email" {...register("email")} />
      {errors.email && (
        <p className="mt-2 text-xs italic text-red-500">
          {errors.email?.message}
        </p>
      )}
      <input type="submit" disabled={isSubmitting} />
    </form>
  );
}
const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;
