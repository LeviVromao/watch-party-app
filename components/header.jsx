import styles from "./Header.module.css";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { api } from "@/services/api";
import { parseCookies } from "nookies";
import Image from "next/image";

export default function Header( { id, inputVideo, noProfile, img, user } ) {
    const [video, setVideo] = useState("");

    const sendVideo = async event =>{
        event.preventDefault();
        
        const {"auth.token": token} = parseCookies();
        const apiClient = api;
        const room = new URLSearchParams(window.location.search).get("room");

        if(video) {
            await apiClient.post("/api/video", {
                video,
                room
            }, {
                headers :{
                    Authorization: token
                }
            })
        }
        
        setVideo("");
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

                {inputVideo?                
                    <form 
                        className={styles.form} 
                        onClick={sendVideo}
                    >
                        <input 
                            type="text" 
                            className={styles.inputVideo} 
                            placeholder="Escolher vídeo"
                            onChange={ e => setVideo(e.target.value)}
                            value={video}
                        />
                        
                        <input 
                            type="submit" 
                            value="Escolher" 
                            className={styles.submit}
                        />
                    </form> : 
                        ""
                    }
                { noProfile? 
                    ""
                : img? 
                    <Link href={`/profile?id=${id}`}>
                        <Image 
                            src={img} 
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