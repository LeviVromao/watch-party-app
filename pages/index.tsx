import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "../styles/login.module.css";
import { authContext } from "../context/authProvider";
import { AiOutlineWechat } from "react-icons/ai"
import { BsFillMoonFill } from "react-icons/bs"
import { FaSun } from "react-icons/fa"
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const {signIn, error} = useContext(authContext);
  const handleLogin = (e: { preventDefault: () => void; })  =>{
    e.preventDefault();

    signIn(email, password);
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.bgColor}>
        <BsFillMoonFill className={styles.moonIcon}/>
        <FaSun className={styles.sunIcon}/>
      </div>
      <Head>
        <title>Login - App</title>
        <meta name="description" content="Login for chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
      </Head>
      <AiOutlineWechat className={styles.chatBubble}/>
      <h1 className={styles.loginTitle}>Faça login no Watch Party</h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.inputsContainers}>
          <label htmlFor="email" className={styles.label}>Endereço de email</label>
          <input type="email" className={styles.loginInput} id="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputsContainers}>
          <label htmlFor="password" className={styles.label}>Senha</label>
          <input type="password" className={styles.loginInput} id="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Entrar" className={styles.loginSubmit}/>
      </form>
      <div className={styles.newUser}>
        <p className={styles.newUserParagraph}>Novo no Watch Part?</p>
        <Link href="/register" className={styles.link}>Criar uma conta</Link>
      </div>
    </div>
  )
}