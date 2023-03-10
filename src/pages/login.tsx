import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { type SyntheticEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignIn() {
  const router = useRouter();
  const loginEmail = useRef<HTMLInputElement>(null);
  const [wait, setWait] = useState(false);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!loginEmail.current?.value) {
      toast.error("Email is required");
      return;
    }
    setWait(true);
    signIn("email", {
      redirect: false,
      email: loginEmail.current?.value,
      callbackUrl: "/",
    })
      .then((status) => {
        if (status && status?.ok) {
          void router.push(status?.url as string);
        }
      })
      .catch(() => {
        setWait(false);
        toast.error("Something went wrong. Unable to login.");
        return;
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email address
        <input type="email" id="email" name="email" ref={loginEmail} />
      </label>
      <button type="submit" disabled={wait}>
        {wait ? `Logging in` : `Sign in with Email`}
      </button>
    </form>
  );
}
