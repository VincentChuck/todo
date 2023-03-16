import Head from "next/head";

type Props = {
  children:
    | Array<JSX.Element[] | JSX.Element>
    | JSX.Element[]
    | JSX.Element
    | null;
};

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name="description" content="A beautiful todo app 🔥" />
        <link rel="icon" href="/icons8-tasklist-color-96.png" />
        <meta
          name="viewport"
          content="initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#2e026d" />
        {/*favicon from "https://icons8.com/icon/104234/tasklist"*/}
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(to_bottom,#2e026d,#952265,#c86b69,#e4b591,#fffade)] dark:bg-[linear-gradient(to_bottom,#2e026d,#15162c)]">
        {children}
      </main>
    </>
  );
}

export default Layout;
