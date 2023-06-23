import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApiClient(ctx) {
    const {['auth.token']: token} = parseCookies(ctx);
    
    const api = axios.create({
        baseURL: 'https://watch-party-beta.vercel.app/'
    })

    //https://watch-party-beta.vercel.app/

    api.interceptors.request.use(config => {
        
        if( token ) {
            config.headers.Authorization = token
        }

        return config;
    });

    return api;
}