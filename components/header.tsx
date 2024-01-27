import styles from "../styles/Header.module.css"
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi"
import { parseCookies } from "nookies";
import Image from "next/image";
import { io } from "socket.io-client";
import React from "react";

export default function Header( { id, inputVideo, noProfile, img, user } ) {
    const [video, setVideo] = useState("");
    const socket = io("https://watch-party-backend.vercel.app:8000/")
    const sendVideo = async event =>{
        event.preventDefault();
        const room = new URLSearchParams(window.location.search).get("room");

        if(video) {
            socket.emit("videos", {room, video})
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
                        onClick={sendVideo}
                        >
                        <input
                            type="text"
                            className={styles.inputVideo}
                            placeholder="Escolher vídeo"
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
                                            src={img}
                                            alt={`A photo by ${user}`}
                                            loader={() => `${img}`}
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