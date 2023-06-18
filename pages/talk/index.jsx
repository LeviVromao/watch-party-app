import { getApiClient } from "@/services/apiClient"
import { parseCookies } from "nookies";
import Header from "@/components/header";
import styles from "@/styles/Chat.module.css";
import { IoSendSharp } from "react-icons/io5"
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function Talk({user, id}) {
    const [video, setVideo ] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        var pusher = new Pusher('d91deb037f91cc154527', {
            cluster: 'sa1'
          });
        
        const room = new URLSearchParams(window.location.search).get("room");
      
        var channel = pusher.subscribe(room);

        channel.bind('messages', function(data) {
            if(data.error) {
                setError(data.error)
            } else {
                setVideo(data.video)
            }
        });
    }, [])

    const handleAdvice = () => {
        const logoImage = document.querySelector(`.${styles.logo}`);
        logoImage.classList.toggle(styles.logoOut);
        const advice = document.querySelector(`.${styles.advice}`);
        advice.classList.toggle(styles.appearAdvice)
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
                        <img 
                            src="/YoutubeLOGO.png" 
                            alt="A logo by Youtube" 
                            className={styles.logo}
                        />
                        <h1 className={styles.advice}>
                            Você precisa escolher um vídeo para poder assistir.
                        </h1>
                    </div>   
                }
                </div>
                <div className={`styles.chat`}>
                    <div className={`styles.chatHeader`}>
                        <button>➡️</button>
                        <h1>CHAT DA TRANSMISSÃO</h1>
                    </div>
                    
                    <div className={`styles.messagesContainer`}>
                        <div className={`styles.messageBox`}>
                            <p className={`styles.message`}>
                                5 ADS 🥹
                            </p>
                        </div>
                    </div>

                    <div className={`styles.chatInput`}>
                        <form action="">
                            <input type="text" name="" id="" />
                            <button onSubmit={() => console.log("funcionou")}>
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