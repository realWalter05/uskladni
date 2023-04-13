import Head from 'next/head'
import {  FC, FormEventHandler, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function signin() {
  const [error, setError] = useState("");
  const [ userInfo, setUserInfo ] = useState({ email: "", password: ""});

  const router = useRouter();
  const callbackUrl = (router.query?.callbackUrl as string) ?? "/";

  const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const {email, password} = userInfo;  
    const result = await signIn(
      "credentials", { email, password, redirect: false },
    );

    if (result?.error) {
      setError(result.error);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <>
      <Head>
        <title>Uskladni</title>
        <meta name="description" content="Uskladni" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
      </Head>
      <main className='d-flex justify-content-center m-5'>
        <form className='w-25 text-center' onSubmit={handleSubmit}>
          <h2 className='display-3'>Přihlášení</h2>
          { !!error && <p className='text-danger'>{error}</p> }
          <input 
            type='email' 
            className='form-control' 
            value={userInfo.email} 
            onChange={({ target }) => setUserInfo({...userInfo, email: target.value})} 
            placeholder='Email'
          />
          <input 
            type='password' 
            className='form-control' 
            value={userInfo.password} 
            onChange={({ target }) => setUserInfo({...userInfo, password: target.value})} 
            placeholder='Heslo...'
          />
          <button className='btn btn-dark w-100'>Odešli</button>
        </form>
      </main>
    </>
  )
}
