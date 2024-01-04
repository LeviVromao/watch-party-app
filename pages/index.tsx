import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { Triangle } from "react-loader-spinner";
import { AiOutlineWechat } from "react-icons/ai"
import { BsFillMoonFill } from "react-icons/bs"
import { FaSun } from "react-icons/fa"
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ error, setError ] = useState<string>("");
  const [ loading, setLoading ] = useState<Boolean>(false)
  const router = useRouter()

  setTimeout(() => {
    error? setError(''): ''
}, 3500)
 
  const handleLogin = async (e: { preventDefault: () => void })  =>{
    e.preventDefault();
    setLoading(true)
    
    const res = await fetch('https://watch-party-backend.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    const data = res.status? await res.json(): ''
    
    if(res.status === 404) {
      setError(data.message)
      setLoading(false)
    } else if(res.status === 200) {
      setCookie(undefined, 'authToken', data, {
        maxAge: 60 * 60 * 1 // 1 hora de acesso.
      })
      setLoading(false)
      router.push('/home')
    }
  }

  return (
    <div>
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
            <input type="email" className={styles.loginInput} id="email" onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div className={styles.inputsContainers}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input type="password" className={styles.loginInput} id="password" onChange={e => setPassword(e.target.value)} required/>
          </div>
          <input type="submit" value="Entrar" className={styles.loginSubmit}/>
        </form>
        {error ? 
        (
          <p className={styles.error}>
            {error}
          </p>
        ): ''}
        <div className={styles.newUser}>
          <p className={styles.newUserParagraph}>Novo(a) no Watch Party?</p>
          <Link href="/register" className={styles.link}>Criar uma conta</Link>
        </div>
      </div>
      {loading ? (
        <div className={styles.spinner}>
          <Triangle 
          height={38}
          width={38}
          color="#fff"/>
        </div>
      ) 
        : 
        (
          ''
        )
      }
    </div>
  )
}