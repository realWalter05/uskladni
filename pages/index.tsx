import Head from 'next/head'
import { signIn, signOut, useSession } from "next-auth/react";
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  return  {
    props: {
      initialUsers: users
    }
  };
}

export default function Home({ initialUsers }) {
  const { status } = useSession();
  const [users, setUsers] = useState(initialUsers);
  
  return (
    <>
      <Head>
        <title>Uskladni</title>
        <meta name="description" content="Uskladni" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
      </Head>

      <main className='m-5 d-flex flex-column'>
        <h2 className='display-3'>Uskladni</h2>
        { status === "authenticated" ? <p className='text-success'>Teď jsi přihlášen bro...</p> : <p className='text-warning'>a teď ne lol...</p>}
        <button className='btn btn-dark w-25 p-1 mb-1' onClick={() => signIn()}>Přihlásit se</button>
        <button className='btn btn-dark w-25 p-1' onClick={() => signOut()}>Odhlásit se</button>
        <a href='/secret'>Look at the secret page</a>
        <p>
          <b>Users</b>
          {users.map((user) => <i key={user.id}><br></br>{user.name}</i>)}
        </p>
      </main>
    </>
  )
}
