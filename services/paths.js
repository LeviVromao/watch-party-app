import { api } from './api';

export async function getAllPaths() {

    const { data } = await api.get( '/api/paths' );
    
    const ids = data.ids;
    
    const paths = ids.map(id => {
        return {
            params: {id}
        }
    });
    
    return paths;
}