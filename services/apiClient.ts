import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApiClient( ctx? ) {
    const { "authToken": token } = parseCookies(ctx);
    const api = axios.create({
        baseURL: "https://watch-party-backend.vercel.app/"
    })

    // https://watch-party-backend.vercel.app/

    api.interceptors.request.use(config => {
     return config
    });

    if(token) {
     api.defaults.headers.authorization = token;
    }

    return api;
}