import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from '../../styles/register.module.css';
import { Triangle } from "react-loader-spinner";
import Image from "next/image";
import { AiOutlineArrowRight } from 'react-icons/ai'
import React from "react";
import { setCookie } from "nookies";
import { GoogleSigInButton } from "../../components/signInButtons";
import { useRouter } from "next/router";

interface Messages {
  hour: string
  message: string
}

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ time, setTime ] = useState<string>("");
    const [ messages, setMessages ] = useState<Array<Messages>>([]);
    const router = useRouter()
    
    const handleRegister = async e =>{
      e.preventDefault();
      setLoading(true)
      const res = await fetch('https://watch-party-backend.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const data = res.status? await res.json(): ''

      if(res.status === 404) {
        setMessages(prevMessages => [...prevMessages, {message: data.message, hour: data.hour}])
        setLoading(false)
      } else if(res.status === 201) {
        setCookie(undefined, 'authToken', data.token, {
          maxAge: 60 * 60 * 1 // 1 hora de sessao.
        })
        setLoading(false) 
        router.push('/home')
      }
    }

    useEffect(() => {
      const date = new Date()
      const hours = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
      setTime(hours)
    }, [])
    
    return (
      <div className={styles.registerBody}>
        <Head>
          <title>Cadastro - App</title>
          <meta name="description" content="Login for chat app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
        </Head>
        <div className={styles.formContainer}>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                  <Image src="/chatLogo.jpg" width={100} height={100} className={styles.chatImg} alt="An logo that looks like a chat bubble"/>
                  <div className={styles.chatInfo}>
                    <p className={styles.chatName}>Watch Party</p>
                    <p className={styles.chatStatus}>Online</p>
                  </div>
                </div>
                <p className={styles.chatHour}>Hoje {time}</p>
              <div className={styles.messagesContainer}>
                <div className={styles.messageContainerWatchParty}>
                  <div className={styles.messageWatchParty}>
                    <p className={styles.messageHourWatchParty}>Watch Party - {time}</p>
                    <p className={styles.messageBubbleWatchParty}>Olá, bem vindo(a) qual seu email?</p>
                  </div>
                </div>
                {email ? (
                  <div className={styles.messageContainerYou}>
                    <div className={styles.messagesYou}>
                       <p className={styles.messageHour}>Você - {time}</p>
                      <p className={styles.messageBubbleYou}>Meu email é: {email}</p>
                    </div>
                  </div>
                ): ''}
                {messages.length >= 1? (
                  messages.map((msg, i) => (
                    <div className={styles.messageContainerWatchParty} key={i}>
                    <div className={styles.messageWatchParty}>
                      <p className={styles.messageHourWatchParty}>Watch Party - {msg.hour}</p>
                      <p className={styles.messageBubbleWatchParty}>{msg.message}</p>
                    </div>
                  </div>
                  ))
                ): ''}
              </div>
            </div>
            <form onSubmit={handleRegister} className={styles.signupForm}>
              <div>
                <h1 className={styles.signupTitle}>Bem vindo(a) ao Watch Party!</h1>
                <p className={styles.signupSubtitle}>Vamos começar a festa</p>
              </div>
              <div className={styles.signupInputsContainers}>
                <div className={styles.LabelInputContainer}>
                  <label className={styles.label} htmlFor="email">Insira seu email <span className={styles.starSpan}>*</span></label>
                  <input className={styles.signupInput} type="email" id="email" onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className={styles.LabelInputContainer}>
                  <label className={styles.label} htmlFor="password">Criar uma senha <span className={styles.starSpan}>*</span></label>
                  <input className={styles.signupInput} type="password" id="password" onChange={e => setPass(e.target.value)} required/>
                </div>
                <input className={styles.signupSubmit} type="submit" value="Enviar" />
                <span style={{color: "#FFF"}}>Ou</span>
                <GoogleSigInButton />
              </div>
              <div className={styles.newUser}>
                <p className={styles.newUserParagraph}>Antigo(a) no Watch Party?</p>
                <Link href="/" className={styles.link}>Entrar na sua conta</Link>
              </div>
            </form>
        </div>
        {loading? 
        (
          <div className={styles.spinner}>
            <Triangle height={38} width={38} color="#ffff" />
          </div>
        ): ""}
      </div>
    )
}