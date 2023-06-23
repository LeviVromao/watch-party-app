import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { api } from "@/services/api";
import jwt from 'jsonwebtoken';
import  Router  from "next/router";

export const authContext = createContext();

export function AuthProvider( {children} ){
    
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const isAuthenticated = !!user;

    const signIn = async ( email, password ) => {

        const { data } = await api.post("/api/authLogin", { 
            email, 
            password
        });

        if(data.error) {

            setError(data.error);

        } else {

            setCookie(undefined, "auth.token", data.token, {
                maxAge: 60 * 60 * 1 // 1 hora de sessao.
            });

            setUser(data.user.email);
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            Router.push("/home");

        }

    }

    const signUp = async ( email, password ) => {
        const { data } = await api.post("/api/register", {
            email, 
            password
        })
        
        const { error, user, token} = data;

        if(error) {
            setError(error);

        } else {

            setCookie(undefined, "auth.token", token, {
                maxAge: 60 * 60 * 1 // 1 hora de sessao.
            });

            setUser(user.email);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            Router.push("/home");
        }

    }

    return (
        <authContext.Provider value={{signUp, signIn, isAuthenticated, user, error}}>
            { children }
        </authContext.Provider>
    )
}