import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import Layout from "~/component/Layout";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
