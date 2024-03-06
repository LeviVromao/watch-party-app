"use client"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import styles from "../styles/Buttons.module.css"

export const GoogleSigInButton = () => {
  const handleClick = async () => {
    await signIn("google", {callbackUrl: "/home"})
  }

  return (
    <button 
      onClick={handleClick}
      className={styles.button}
    >
      <FcGoogle className={styles.googleLogo}/>
      <span className={styles.buttonText}>Continuar Com Google</span>
    </button>
  )
}