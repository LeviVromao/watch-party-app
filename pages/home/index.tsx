import { getApiClient } from "../../services/apiClient";
import { parseCookies } from "nookies";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Header from "../../components/header";
import { AiOutlineArrowUp } from "react-icons/ai"
import React from "react";
import { getSession } from "next-auth/react";

export default function Home( { _id, name, picture } ) {
    return (
        <>
           <Head>
                <title>Home - App</title>
                <meta name="description" content="Home page for warch party app "/>
                <meta name="description" content="watch party app see videos with friends" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
            </Head> 
            <div className={`container`}>
                <Header id={_id} img={picture} user={name} inputVideo={undefined} noProfile={undefined}/>
                <main className={styles.main}>
                    {name? 
                        <div className={styles.saudation}>
                            <h1 className={styles.title}>
                                Bem-vindo(a) de volta <span style={{color: "blue", textTransform: "capitalize"}}>{name}</span>, escolha uma sala
                                e entre para conversar
                            </h1>
                        </div>
                      : 
                      <div className={styles.saudation}>
                            <h1 className={styles.title}>
                                Clique no ícone acima e personalize seu perfil 😎
                                <AiOutlineArrowUp />
                            </h1>
                      </div>
                    }
                    <form className={styles.form} action="/talk">
                        <select 
                            name="room" 
                            id="rooms" 
                            required 
                            className={styles.select}
                        >
                            <option value="">Escolha Uma Sala</option>
                            <option value="room1">Sala 1</option>
                            <option value="room2">Sala 2</option>
                            <option value="room3">Sala 3</option>
                            <option value="room4">Sala 4</option>
                            <option value="room5">Sala 5</option>
                            <option value="room6">Sala 6</option>
                        </select>
                        <input 
                            type="submit" 
                            value="Entrar"
                            className={styles.submit}
                        />
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = async (ctx) =>{
  const {"authToken": token} = parseCookies(ctx)
  const session = await getSession(ctx)
  let res;

  if(!token && !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  const apiClient = getApiClient(ctx);

  if(session) {
    await fetch("https://watch-party-backend.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          email: session.user.email, 
          googleUsername: session.user.name,
          googleUserImage: session.user.image
        }
      )
    })
      
  }
  if(token){
    res = await apiClient.post("/user", {}, {
      headers: {
        authorization: token,
      }
    });
  } 
  else if(session) {
    res = await fetch("https://watch-party-backend.vercel.app/user", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        session: JSON.stringify(session.user)
      },
      body: JSON.stringify({})
    })
  }
  
  const { _id, name = '', picture = '' } = res.data || await res.json()
  return {
    props: {
      _id, 
      ...(name && {name}), 
      ...(picture && {picture})
    }
  }
}