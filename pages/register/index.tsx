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
            <div>
              <Image src="/chatBallon.svg" className={styles.chatImage} width={100} height={100} alt="an chat ballon"/>
            </div>
            <form onSubmit={handleRegister} className={styles.signupForm}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" onChange={e => setPass(e.target.value)} />
              </div>
              <input type="submit" value="Enviar" />
            </form>
        </div>
      </div>
    )
}