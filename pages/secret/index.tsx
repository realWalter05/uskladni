import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import React, { FC, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children}): JSX.Element => {
  const { status, data } = useSession();
  console.log(status);
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <Head>
          <title>Uskladni</title>
          <meta name="description" content="Uskladni" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
        </Head>
        <main className="p-3">
          <h2 className="display-2">Secret page</h2>
          <p>You cannnot be here unless you're alpha!</p>
        
          <section className="p-3">
            <h4>Something about you...</h4>
            <i>{JSON.stringify(data)}</i>
          </section>
          <a href="/">Go back</a>
        </main>
      </>
    );

  return <div>loading</div>
};

export default Protected;