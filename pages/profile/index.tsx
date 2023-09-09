import Header from "../../components/header";
import { api } from "../../services/api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Profile.module.css"
import Router  from "next/router";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from "react";
import { parseCookies } from "nookies";
import React from "react";

export default function ProfileIDS( { id, name, picture, message } ){
    const [newName, setNewName] = useState("");
    const [image, setImage] = useState('');
    const [error, setError] = useState("");

    const handleSave = async e =>{
        e.preventDefault()
        confirmAlert({
            title: 'Confirmação',
            message: 'Deseja salvar as alterações feitas até agora?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        if( image && !newName ) {

                            await api.post('/api/updateUser', {
                                image, 
                                id
                            })
            
                        } else if( newName && !image ) {
                            await api.post("/api/updateUser", {
                                name: newName,
                                id
                            })
            
                        } else if( newName && image ){
                            await api.post("/api/updateUser", {
                                name: newName,
                                image,
                                id
                            })
                
                        } else {
                            setError("Precisa editar algum campo para continuar, ou cancele se desejar.")
                        }
                        setNewName("")
                        setImage(null);
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        const res = confirm("Deseja cancelar as alteraçôes feitas até agora?");
        confirmAlert({
            title: 'Confirmação',
            message: 'Deseja cancelar as alterações feitas até agora?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        Router.push('/home')
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
        if( res ) {
            Router.push('/home');
            return
        } 
    }

    return (
        <>
            <Head>
                <title>Profile - App</title>
                <meta name="description" content="Home page for warch party app "/>
                <meta name="description" content="watch party app see videos with friends" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://th.bing.com/th/id/OIG.DKYsTD6pJtVIu0.XWPy6?pid=ImgGn" />
            </Head> 
            <Header noProfile id={undefined} inputVideo={undefined} img={undefined} user={undefined}/>
            {message? 
                <h1 className={styles.noID}>{message}</h1>
            :
            <main className={styles.main} >
                <form 
                    className={styles.form}
                    >
                    <h1 className={styles.title}>EDIT PROFILE</h1>
                        <div className={styles.container_inputs}>
                            {picture? 
                            <Image 
                                src={`${picture}`}
                                alt={`A photo by ${name}`} 
                                width={200} 
                                height={200}
                                className={styles.img}
                            />
                            : 
                            <Image 
                                src={`https://th.bing.com/th?id=OIP.d9W3MDj5NqeMkDMOMyigCQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2`}
                                alt={`A photo by ${name}`} 
                                width={200} 
                                height={200}
                                className={styles.img}
                            />
                            }
                            <div className={styles.name_box} >
                                <input 
                                    type="text" 
                                    value={image}
                                    className={styles.input_name}
                                    onChange={e => setImage(e.target.value)}
                                    id="chooseIMG"
                                    placeholder="Escolha uma imagem."
                                />
                                <input 
                                    type="text" 
                                    className={styles.input_name}
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    placeholder="Troque de nome."
                                    id="name"
                                />                           
                            </div>
                        </div>
                        {error? <i className={styles.error}>{error}</i> : <i></i>}
                       <div className={styles.buttons}>
                            <button
                                type="button"
                                className={styles.button_actions}
                                onClick={handleSave}
                            >
                                S A V E
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={styles.button_actions}
                            >
                                C A N C E L
                            </button>
                       </div>
                </form>
            </main>
            }
        </>
    )
}


export async function getServerSideProps(ctx) {
    const {"auth.token": token} = parseCookies(ctx);
    const id = ctx.query.id

    if(!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    if(!id) {
        return {
            props: {
                message: 'Você precisa do ID para resgatar seu perfil :)'
            }
        }
    }

    const { data } = await api.post('/api/user', {
        id
    })

    const { name = '', picture = '', id: _id = '' } = data;

    return {
        props: {
            name, 
            picture,
            id
        }
    }
}