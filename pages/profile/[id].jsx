import Header from "@/components/header";
import { api } from "@/services/api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Profile.module.css"
import Router  from "next/router";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from "react";

export default function ProfileIDS( { id, name, picture } ){
    const [newName, setNewName] = useState("");
    const [image, setImage] = useState();
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
                            console.log(newName);
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
                        setImage("");
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
            <Header noProfile/>
            <main className={styles.main} >
                <form 
                    className={styles.form}
                >
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
                    <div className={styles.nameBox} >
                       
                        <div>
                            <p className={styles.HINT}>
                                Só é aceito imagens de <Link href="https://pngimg.com/" target="_blank">PIN IMG </Link>, <Link href="https://www.bing.com/" target="_blank">BING</Link> e <Link href="https://www.tumblr.com/explore?language=pt_BR" target="_blank">MEDIA TUMBLR</Link>
                            </p>
                            <p className={styles.HINT}>
                               Recomendo BING Clique em copiar link de imagem
                            </p>
                            <label 
                                htmlFor="chooseIMG"
                                className={styles.label}
                            >
                                    Photo
                                </label>
                            <input 
                                type="text" 
                                value={image}
                                className={styles.inputName}
                                onChange={e => setImage(e.target.value)}
                                id="chooseIMG"
                                placeholder="https://imagem.com/jpeg"
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="name" 
                                className={styles.label}
                            >
                                Name
                            </label>
                            <input 
                                type="text" 
                                className={styles.inputName}
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="Jack"
                                id="name"
                            />
                        </div>
                        {error? <i className={styles.error}>{error}</i> : <i></i>}
                       <div className={styles.buttons}>
                            <button
                                type="button"
                                className={styles.buttonSave}
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={styles.buttonCancel}
                            >
                                Cancel
                            </button>
                       </div>
                    </div>
                </form>
            </main>
        </>
    )
}

export const getStaticPaths = async () => {
    const { data } = await api.get( "/api/paths" );

    const paths = data.ids.map(id => {
        return {params: { id } }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ( {params} ) => {
    const { id: _id } = params;

    const { data } = await api.post(`/api/user`, {id: _id});
    const {id, name = '', picture = ''} = data;
    

    return {
        props: {
            id, 
            ...(name && {name}), 
            ...(picture && {picture})
        }
    }
}