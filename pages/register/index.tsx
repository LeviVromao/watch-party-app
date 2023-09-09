import Head from "next/head";
import { useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { authContext } from "../..//context/authProvider";
import styles from '../../styles/Form.module.css';
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
      <>
        <Head>
          <title>Cadastro - App</title>
          <meta name="description" content="Login for chat app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
        </Head>
        <div className={styles.login_container}>
        <main className={styles.main}>
          <img src='/chatBallon.svg' alt="Ballon image" />
          <div className={styles.form_container}>
              <form className={styles.form} onSubmit={handleRegister}>
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
                  <Link href="/" className={styles.a}>Já possui uma conta? faça o login!</Link>
              </form>
          </div>
        </main>
      </div>
      </>
    )
}