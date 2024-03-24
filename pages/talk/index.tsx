import { parseCookies } from "nookies";
import Header from "../../components/header";
import Head from "next/head";
import styles from "../../styles/Chat.module.css";
import data from '@emoji-mart/data'
import Picker  from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import Pusher, { Channel } from "pusher-js";
import { getApiClient } from "../../services/apiClient";
import { IEmoji, IYTBVideos } from "../../services/Interface";
import { IoMdBuild } from "react-icons/io";
import { BiCopy } from 'react-icons/bi'
import { BiSolidMicrophone } from "react-icons/bi";
import { PiPhoneDisconnectFill } from "react-icons/pi"
import { MdClose } from "react-icons/md";
import { config } from "dotenv"
import { getSession, useSession } from "next-auth/react";
import React from 'react'
import YoutubePlayer from "../../components/YoutubePlayer";
import FoundVideos from "../../components/FoundVideos";
config();

export default function Talk({ user, id, picture }) {
    const [videos, setVideos] = useState<IYTBVideos>()
    const [video, setVideo] = useState("")
    const [error, setError] = useState("");
    const [sendMessage, setSendMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState("");
    const [popupVisible, setPopupVisible] = useState<Boolean>(false)
    const [ invite, setInvite ] = useState('')
    const channelRef = useRef<Channel>(null)
    const [notWork, setNotWork] = useState<boolean>(true)
    const {data} = useSession()

    useEffect(() => {
      const pusher = new Pusher("91b3f8b373b617f82771", {
        cluster: "sa1"
      })
      const roomQuery = new URLSearchParams(window.location.search).get("room");
      const roomValue = roomQuery || "";
      setRoom(roomValue);
      const channel = pusher.subscribe(room)
      channelRef.current = channel

      const hrefValue = window.location.href
      setInvite(hrefValue)

      channel.bind("message", data => {
        setMessages(prevMessages => [
          ...prevMessages,
          { message: data.message, name: data.user }
        ]);
        setSendMessage('')
      })
      
      channel.bind("foundVideos", data => {
        setVideos(data.videos)
        setVideo("")
      })

      channel.bind("video", data => {
        setVideo(data.video)
      })

      return () => {
        channel.disconnect()
      };
    }, [room])

    const startCall = async () => {
        const voicePlayersPopup = document.querySelector(`.${styles.voicePlayerPopup}`) as HTMLDivElement
        if(!voicePlayersPopup.style.display.includes("flex")) {
          voicePlayersPopup.style.display = "flex"
          setTimeout(() => {
            setPopupVisible(true)
          }, 2000);
        }
    }

    useEffect(() => {
        const messageEnd = document.getElementById("messageEnd") as HTMLDivElement
        messageEnd.scrollIntoView()
    }, [messages])

    const appearEmoji = (e: React.MouseEvent<HTMLButtonElement>) => {
        const emoji_card = document.querySelector(`.${styles.emoji_card}`) as HTMLElement
        e.stopPropagation()

        if(emoji_card.style.display === 'block') {
            emoji_card.style.display = 'none'
        } else {
            emoji_card.style.display = 'block'
        }
    }

    const handleMessages = (e) => {
        setSendMessage(e.target.value)
    }

    const handleEmojiSelection = (emoji: IEmoji) => {
        setSendMessage((prevMessage) => prevMessage + emoji.native)
    }
      
    const openPopup = () => {
        const pop_up = document.querySelector(`.${styles.pop_up}`) as HTMLDivElement
        pop_up.style.display = "flex"
        setTimeout(() => {
            setPopupVisible(true)
        }, 2000);
    }

    const closeVoicePlayers = () => {
        const voicePlayersPopup = document.querySelector(`.${styles.voicePlayerPopup}`) as HTMLDivElement
        if(!voicePlayersPopup.style.display.includes("none")) {
            voicePlayersPopup.style.display = "none"
            setTimeout(() => {
                setPopupVisible(true)
            }, 2000);
        }
    }    

    useEffect(() => {
        const pop_up = document.querySelector(`.${styles.pop_up}`) as HTMLDivElement
        const voicePlayerPopup = document.querySelector(`.${styles.voicePlayerPopup}`) as HTMLDivElement
        const popup_content = document.querySelector(`.${styles.popup_content}`)
        const voicePlayerContainer = document.querySelector(`.${styles.voicePlayerContainer}`)

        const handleDocumentClick = (e) => {
            if(popupVisible && !popup_content.contains(e.target)) {
                pop_up.style.display = "none"
                setPopupVisible(false)
            } 

            if(popupVisible && !voicePlayerContainer?.contains(e.target)) {
                voicePlayerPopup.style.display = "none"
                setPopupVisible(false)
            }
        };
    
        document.addEventListener('click', handleDocumentClick);
        
        return () => {
          document.removeEventListener('click', handleDocumentClick);
        };
    }, [popupVisible]);

    const copyInvite = async () => {
        try {
            navigator.clipboard.writeText(invite)
        } catch (error) {
            console.error(error)
        }
    }

    const handleAdvice = () => {
        const logoImage = document.querySelector(`.${styles.logo}`);
        logoImage.classList.toggle(styles.logoOut);
        const advice = document.querySelector(`.${styles.advice}`);
        advice.classList.toggle(styles.appear_advice)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        const {"authToken": token} = parseCookies();
        fetch('https://watch-party-levi-app.vercel.app/api/messages',{
            method: "POST",
            headers: {
                "Content-type": "application/json",
                authorization: token
            },
            body: JSON.stringify({sendMessage, user, room})
        })
        setSendMessage('');
    }
    
  return (
    <>
      <Head>
          <title>Watch Party - App</title>
          <meta name="description" content="Home page for warch party app "/>
          <meta name="description" content="watch party app see videos with friends" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
      </Head>
          {error? alert(error) : ""}
      <Header id={id} inputVideo={true} img={picture} user={user} noProfile={true}/>
      <main className={styles.main}>
        <div className={styles.pop_up}>
          <div className={styles.popup_content}>
              <h1 className={styles.popup_text}>
                Convide amigos e assista vídeos juntos!
              </h1>
              <div className={styles.popup_content_container}>
              <i className={styles.popup_msg}>Copie e compartilhe esse link:</i>
              <div className={styles.popup_link}>
                <input 
                  type="text" 
                  className={styles.popup_href} 
                  readOnly={true}
                  value={invite}
                />
                  <button className={styles.popup_button} onClick={copyInvite}>
                    Copiar <BiCopy className={styles.popup_icon}/>
                  </button>
              </div>
             </div>
          </div>
        </div>
        <div className={styles.voicePlayerPopup}>
          {notWork ? 
              <div className={styles.voicePlayerContainer}>
                <h1>Em manutenção... </h1>
                <IoMdBuild />
              </div>
                :
              <div className={styles.voicePlayerContainer}>
                <div className={styles.players}>
                  <BiSolidMicrophone className={styles.muteButton}/>
                  <PiPhoneDisconnectFill className={styles.disconnectButton}/>
                </div>
                <MdClose onClick={closeVoicePlayers} className={styles.closeVoicePlayers}/>
              </div> 
            }
        </div>
          <div className={styles.playerContainer}>
            {video? 
              <>
                <YoutubePlayer video={video} handleAdvice={handleAdvice}/>
              </> 
              : 
              <>
                <FoundVideos videos={videos} room={room}/>
              </>
            }
            </div>
              <div className={styles.chat}>
                <div className={styles.chat_header}>
                  <input type="button" onClick={openPopup} className={styles.invite_button} value="Convidar Amigos" />
                  <input type="button" onClick={startCall} className={styles.voiceChatButton} value="🗣️Entrar no Chat de Voz"/>
                </div>
                <div className={styles.messagesContainer}>
                  {messages ? 
                    messages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={styles.message_box}
                      >
                        <p className={styles.user}>
                            {user || msg.name? (msg.name !== user ? `${msg.name}`: `${user}`) : user = "ESCOLHA_UM_NOME"}
                        </p>
                        <p className={styles.message}>
                            {msg.message}
                        </p>
                      </div>   
                        ))
                        : ""
                        }
                        <div id="messageEnd"></div>
                </div>
                <div className={styles.form_container}>
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                      <input 
                        type="text" 
                        className={styles.chat_input}
                        value={ sendMessage }
                        onChange={handleMessages}
                      />
                      <button type="button" className={styles.emoji_button} onClick={appearEmoji}>
                        😎
                      </button>
                      <div className={styles.emoji_card}>
                        <Picker data={data} onEmojiSelect={handleEmojiSelection}/>
                      </div>    
                    </div>
                  </form>
                </div>
            </div>
        </main>
    </>
    )
}

export const getServerSideProps = async (ctx) => {
    const apiClient = getApiClient(ctx);
    const {"authToken": token} = parseCookies(ctx);
    const session = await getSession(ctx)
    let res;
    const appId = process.env.APP_ID

    if(!token && !session){
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      }
    }

    if(token) {
      res = await apiClient.post("/user", {
        headers:{
          authorization: token
        }
    })
    }
    else if(session){
      res = await fetch("https://watch-party-backend.vercel.app/user", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          session: JSON.stringify(session.user)
        },
        body: JSON.stringify({})
      })      
    }
    
    const { name: user = '', _id: id, picture = '' } = res.data || await res.json()

    return{
      props: {
        id,
        ...(user && {user}),
        ...(picture && {picture}),
        appId
      }
    }
}