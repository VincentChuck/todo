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
        {/*favicon from "https://icons8.com/icon/104234/tasklist"*/}
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#aaaaaa] to-[#2e026d] dark:from-[#2e026d] dark:to-[#15162c]">
        <div className="dark:bg-transparent">{children}</div>
      </main>
    </>
  );
}

export default Layout;
