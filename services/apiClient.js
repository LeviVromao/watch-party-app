import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApiClient(ctx) {
    const { ['auth.token']: token } = parseCookies(ctx);
    
    const api = axios.create({
        baseURL: 'https://watch-party-ki4x10z11-levivromao.vercel.app/'
    })

    api.interceptors.request.use(config => {

        return config
    });

    if(token) {
        api.defaults.headers.authorization = token;
    }

    return api;
}