import { createContext, useState } from "react";
import { setCookie } from "nookies";
import { api } from "../services/api";
import  Router  from "next/router";

export const authContext = createContext();

export function AuthProvider( {children} ){
    
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const signIn = async ( email, password ) => {

        const { data } = await api.post("/login", { 
            email, 
            password
        });

        if(data.message) {

            setError(data.message);

        } else {

            setCookie(undefined, "auth.token", data.token, {
                maxAge: 60 * 60 * 1 // 1 hora de sessao.
            });

            setUser(data.user);
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            setIsAuthenticated(true)
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
            Router.push("/");
        }

    }

    return (
        <authContext.Provider value={{signUp, signIn, isAuthenticated, user, error}}>
            { children }
        </authContext.Provider>
    )
}