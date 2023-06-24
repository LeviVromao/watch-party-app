import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApiClient( ctx ) {
    const { ['auth.token']: token } = parseCookies(ctx);
   
    const api = axios.create({
        baseURL: `http://localhost:3000`
    })

    // https://watch-party-app-jade.vercel.app

    api.interceptors.request.use(config => {

        return config
    });

    if(token) {
        api.defaults.headers.authorization = token;
    }

    return api;
}