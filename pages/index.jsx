import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {AiOutlineArrowRight } from "react-icons/ai"
import styles from "@/styles/Login.module.css";
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
      <div className={styles.Login_Container}>
        <main className={styles.main}>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputCamp}>
              <input 
                type="email" 
                id="email" 
                placeholder="Email"
                className={styles.inputField} 
                onChange={ event => setEmail(event.target.value) }
              />
            </div>
            {error && <i className={styles.error}>{error}</i>}
            <div className={styles.inputCamp}>
              <input 
                type="password" 
                id="password" 
                className={styles.inputField} 
                placeholder="Senha"
                onChange={ event => setPass(event.target.value)}
              />
            </div>
            
            <div className={styles.inputCamp}>
              <button 
                type="submit"
                className={styles.inputSubmit}
              >
                < AiOutlineArrowRight className={styles.arrow}/>
              </button>
              <Link href="/register">Não possui uma conta? faça o cadastro !</Link>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
