"use client"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import styles from "../styles/Buttons.module.css"
import { useRouter } from "next/router"

export const GoogleSigInButton = () => {
  const router = useRouter()
  const handleClick = async () => {
    await signIn("google", {callbackUrl: "/home"})
    router.push("/home")
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