import Head from "next/head";
import { useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { authContext } from "@/context/authProvider";
import styles from '@/styles/Register.module.css';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

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
        <div className={styles.Login_Container}>
          <main className={styles.main}>
            <form className={styles.form} onSubmit={handleRegister}>
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
                <Link href="/">Já possui uma conta? faça o login!</Link>
              </div>
            </form>
          </main>
        </div>
      </>
    )
}