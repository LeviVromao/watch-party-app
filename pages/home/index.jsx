import { getApiClient } from "@/services/apiClient";
import { parseCookies } from "nookies";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import {AiOutlineArrowUp} from "react-icons/ai"

export default function Home( { id, name, picture } ) {
    return (
        <>
           <Head>
                <title>Home - App</title>
                <meta name="description" content="Home page for chat app "/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head> 
            <div className={`container`}>
                <Header id={id} img={picture} user={name}/>
                <main className={styles.main}>
                    {name? 
                        <div className={styles.saudation}>
                            <h1 className={styles.title}>
                                Bem-vindo(a) de volta {name}, escolha uma sala
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
    const {"auth.token": token} = parseCookies(ctx)


    if(!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    const apiClient = getApiClient(ctx);
    const { data } = await apiClient.post("/api/user", {}, {
        headers: {
            Authorization: token,
        }
    });

    const { id, name = '', picture = '' } = data

    return {
        props: {
            id, 
            ...(name && {name}), 
            ...(picture && {picture})
        }
    }

}