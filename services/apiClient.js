import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApiClient( ctx ) {
    const { ['auth.token']: token } = parseCookies(ctx);
    console.log(process.env.VERCEL_URL)
   
    const api = axios.create({
        baseURL: `https://${process.env.VERCEL_URL}`
    })

    // 

    api.interceptors.request.use(config => {

        return config
    });

    if(token) {
        api.defaults.headers.authorization = token;
    }

    return api;
}