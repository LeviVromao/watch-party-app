import styles from "../styles/Header.module.css"
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi"
import { parseCookies } from "nookies";
import Image from "next/image";
import React from "react";

export default function Header( { id, inputVideo, noProfile, img, user } ) {
    const [video, setVideo] = useState("");
    const src = img
    const sendVideo = async event =>{
      event.preventDefault();
      const room = new URLSearchParams(window.location.search).get("room")
      
      if(video) {
        const {"authToken": token} = parseCookies()
        fetch("https://watch-party-levi-app.vercel.app/api/searchVideos", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              authorization: token,
          },
          body: JSON.stringify({video, room})
        })
        setVideo("");
      }
    }
        
    return (
        <>
            <header className={styles.header}>
                <Link href={`/home`}>
                    <Image 
                        src="/chatLogo.jpg" 
                        alt={`A icon for the chat app`} 
                        className={styles.chatIcon}
                        width={60}
                        height={60}
                    />
                </Link>
                {
                inputVideo?                
                   (
                    <>
                    <form
                        className={styles.form}
                        onSubmit={sendVideo}
                        >
                        <input
                            type="text"
                            className={styles.inputVideo}
                            placeholder="Pesquisar vídeo no Watch Party"
                            onChange={e => setVideo(e.target.value)}
                            value={video} 
                        />
                        <button type="submit" className={styles.submit}>
                            <BiSolidSend className={styles.sendButton} />
                        </button>
                        </form>
                        <div className={styles.formContainer}>
                            {img ?
                                (
                                    <Link href={`/profile?id=${id}`}>
                                        <Image
                                            loader={() => src}
                                            src={img}
                                            alt={`A photo by ${user}`}
                                            className={styles.profileImage}
                                            width={50}
                                            height={50} 
                                        />
                                    </Link>
                                ) :
                                (
                                    <Link href={`/profile?id=${id}`}>
                                        <FaUserCircle className={styles.defaultProfile} />
                                    </Link>
                            )}
                        </div>
                    </>
                    ): 
                        ""
                    }
                { noProfile? 
                    ""
                : img? 
                    <Link href={`/profile?id=${id}`}>
                        <Image 
                            src={img} 
                            loader={() => `${img}`}
                            alt={`A photo by ${user}`} 
                            className={styles.profileImage}
                            width={50}
                            height={50}
                        />                          
                    </Link>
                : 
                    <Link href={`/profile?id=${id}`}>
                        <FaUserCircle className={styles.defaultProfile}/>
                    </Link>
                }

            </header>
        </>
    )
}