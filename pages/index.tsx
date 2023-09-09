import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import {AiOutlineArrowRight } from "react-icons/ai"
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { authContext } from "../context/authProvider";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("");
  const {signIn, error} = useContext(authContext);
  const handleLogin = (e: { preventDefault: () => void; })  =>{
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
      <div className={styles.login_container}>
        <main className={styles.main}>
          <img src='/chatBallon.svg' alt="Ballon image" />
          <div className={styles.form_container}>
              <form className={styles.form} onSubmit={handleLogin}>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Email"
                    className={styles.input_field} 
                    onChange={ event => setEmail(event.target.value) }
                  />
                  {error && <i className={styles.error}>{error}</i>}
                  <input 
                    type="password" 
                    id="password" 
                    className={styles.input_field} 
                    placeholder="Senha"
                    onChange={ event => setPass(event.target.value)}
                  />
                
                <div className={styles.input_camp}>
                  <button 
                    type="submit"
                    className={`${styles.input_field} ${styles.submit}`}
                  >
                  < AiOutlineArrowRight className={styles.arrow}/>
                  </button>
                </div>
                  <Link href="/register" className={styles.a}>Não possui uma conta? faça o cadastro !</Link>
              </form>
          </div>
        </main>
      </div>
    </>
  )
}