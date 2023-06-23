import Head from "next/head";
import { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { authContext } from "@/context/authProvider";

export default function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("");
  const {signIn, error} = useContext(authContext);
  const handleLogin = e =>{
    e.preventDefault();

    signIn(email, pass);
  }

  return (
    <>
      <Head>
        <title>Login - App</title>
        <meta name="description" content="Login for chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
      </Head>
      <main className="main">
        <form className={`form`} onSubmit={handleLogin}>
          <div className={`inputCamp`}>
            <label htmlFor="email">
              <MdEmail className={`iconEmail`}/>
            </label>
            <input 
              type="email" 
              id="email" 
              className={`inputField`} 
              onChange={ event => setEmail(event.target.value) }
            />
          </div>
          {error && <i>{error}</i>}
          <div className={`inputCamp`}>
            <label htmlFor="password">
              <RiLockPasswordFill className={`iconPassword`}/>
            </label>
            <input 
              type="password" 
              id="password" 
              className={`inputField`} 
              onChange={ event => setPass(event.target.value)}
            />
          </div>
          <Link href="/register">Não possui uma conta? faça o cadastro</Link>
          <div className={`inputCamp`}>
            <input type="submit" className={`inputSubmit`} />
          </div>
        </form>
      </main>
    </>
  )
}
