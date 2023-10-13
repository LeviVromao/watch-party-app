import Head from "next/head";
import { useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { authContext } from "../..//context/authProvider";
import styles from '../../styles/register.module.css';
import Image from "next/image";
import { AiOutlineArrowRight } from 'react-icons/ai'
import React from "react";

export default function Register() {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("");
    const { signUp, error } = useContext(authContext);
    
    const handleRegister = e =>{
      e.preventDefault();
  
      signUp(email, pass);
    }
  
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
                <p className={styles.chatHour}>Hoje 19:12</p>
              <div className={styles.messagesContainer}>
                <div className={styles.messageContainerWatchParty}>
                  <div className={styles.messageWatchParty}>
                    <p className={styles.messageHourWatchParty}>Watch Party - 19:30</p>
                    <p className={styles.messageBubbleWatchParty}>Olá, bem vindo(a) qual seu email?</p>
                  </div>
                </div>
                <div className={styles.messageContainerYou}>
                  <div className={styles.messagesYou}>
                    <p className={styles.messageHour}>Você - 19:23</p>
                    <p className={styles.messageBubbleYou}>Meu email é: levi@challenger.com</p>
                  </div>
                </div>
                <div className={styles.messageContainerYou}>
                  <div className={styles.messagesYou}>
                    <p className={styles.messageHour}>Você - 19:24</p>
                    <p className={styles.messageBubbleYou}>vou fazer a funcionalidade do chat depois man...</p>
                  </div>
                </div>
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
              </div>
              <div className={styles.newUser}>
                <p className={styles.newUserParagraph}>Antigo(a) no Watch Party?</p>
                <Link href="/" className={styles.link}>Entrar na sua conta</Link>
              </div>
            </form>
        </div>
      </div>
    )
}