import Head from "next/head";
import { useState } from "react";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import styles from '@/styles/Register.module.css';
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
            <meta name="description" content="Register for watch party app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
          </Head>
          <main className="main">
            <form className={`form`} onSubmit={handleRegister}>
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

                {error? 
                    <i className={styles.error}>{error}</i>
                    : <i></i>
                }

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
              <Link href="/register">Já possui uma conta? faça o login</Link>
              <div className={`inputCamp`}>
                <input type="submit" className={`inputSubmit`} />
              </div>
            </form>
          </main>
        </>
      )
}