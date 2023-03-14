import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Todos from "~/component/Todos";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col gap-8">
      {sessionData && <Todos />}
      <AuthShowcase sessionData={sessionData} />
    </div>
  );
};

const AuthShowcase: React.FC<{ sessionData: Session | null }> = ({
  sessionData,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-l text-center text-white">
          {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
        </p>
        <button
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Home;
