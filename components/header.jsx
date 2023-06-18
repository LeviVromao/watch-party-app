import styles from "./Header.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Pusher from "pusher-js";
import { api } from "@/services/api";
import { parseCookies } from "nookies";

export default function Header( { id, inputVideo } ) {
    const [video, setVideo] = useState("");

    const sendVideo = async event =>{
        event.preventDefault();
        const {"auth.token": token} = parseCookies();
        const apiClient = api;
        const room = new URLSearchParams(window.location.search).get("room");

        if(video) {
            await apiClient.post("/api/socket", {
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
                <Link href={`home`}>
                    <img 
                        src="https://th.bing.com/th/id/OIG.0GVPh3ai2S3CZWuUfrnx?pid=ImgGn" 
                        alt={`A icon for the chat app`} 
                        className={styles.chatIcon}
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

                <Link href={`profile/${id}`}>
                    <FaUserCircle className={styles.profileImage}/>                          
                </Link>
            </header>
        </>
    )
}