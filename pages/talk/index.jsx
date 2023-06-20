import { getApiClient } from "@/services/apiClient"
import { parseCookies } from "nookies";
import Header from "@/components/header";
import styles from "@/styles/Chat.module.css";
import { IoSendSharp } from "react-icons/io5"
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Image from "next/image";
import { api } from "@/services/api";

export default function Talk({user, id}) {
    const [video, setVideo ] = useState("");
    const [error, setError] = useState("");
    const [sendMessage, setSendMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState("");
    
    useEffect(() => {
        var pusher = new Pusher('d91deb037f91cc154527', {
            cluster: 'sa1'
          });
        
        const roomQuery = new URLSearchParams(window.location.search).get("room");
        const roomValue = roomQuery || "";
        setRoom(roomValue);

        var channel = pusher.subscribe(room);

        channel.bind('videos', (data) => {
            if(data.error) {
                setError(data.error);
            } else {
                setVideo(data.video);
                console.log("VIDEO:", data.video)
            }
        });

        channel.bind('messages', (data) => {
            setMessages(prevMessages => [...prevMessages, data.message]);

        })
        return () => {
            pusher.unsubscribe(room);
          };
    }, [room])

    const handleAdvice = () => {
        const logoImage = document.querySelector(`.${styles.logo}`);
        logoImage.classList.toggle(styles.logoOut);
        const advice = document.querySelector(`.${styles.advice}`);
        advice.classList.toggle(styles.appearAdvice)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const {"auth.token": token} = parseCookies();
        const room = new URLSearchParams(window.location.search).get("room");
        
        if(sendMessage) {
            await api.post("/api/messages", {
                sendMessage,
                room,
            }, {
                headers: {
                    Authorization: token
                }
            })
        }
        
        setSendMessage("");
    }

        

    return (
        <>
            {error? alert(error) : ""}
            <Header id={id} inputVideo={true}/>
            <main className={styles.main}>
                <div className={styles.videoContainer}>
                {video? 
                    <iframe 
                        src={`https://www.youtube.com/embed/${video}`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture; 
                        web-share" 
                        allowFullScreen
                        className={styles.video}
                    >
                    </iframe>
                    : 
                    <div className={styles.videoFake} onClick={handleAdvice}>
                        <Image 
                            src="/YoutubeLOGO.png" 
                            alt="A logo by Youtube" 
                            className={styles.logo}
                            width={79}
                            height={49}
                        />
                        <h1 className={styles.advice}>
                            Você precisa escolher um vídeo para poder assistir.
                        </h1>
                    </div>   
                }
                </div>
                <div className={styles.chat}>
                    <div className={styles.chatHeader}>
                        <h1 className={styles.chatTitle}>
                            CHAT DA TRANSMISSÃO
                        </h1>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages ? 
                            messages.map((msg, index) => (
                                <div 
                                    key={index} 
                                    className={styles.messageBox}
                                >
                                    <p className={styles.user}>
                                        {`${user} :`}
                                    </p>
                                    <p className={styles.message}>
                                        {msg}
                                    </p>
                                </div>   
                            ))
                            : ""
                        }
                        
                    </div>

                    <div className={styles.inputContainer}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                className={styles.chatInput}
                                value={ sendMessage }
                                onChange={e => setSendMessage(e.target.value)}
                            />
                            <button 
                                type="submit"
                                className={styles.submit}
                            >
                                <IoSendSharp />
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const apiClient = getApiClient(ctx);
    const {"auth.token": token} = parseCookies(ctx);

    if(!token){
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    const { data } = await apiClient.get("/api/user", {
        headers:{
            Authorization: token
        }
    })
    
    const { name: user, id, photo } = data;

    return{
        props: {
            user, id
        }
    }
}