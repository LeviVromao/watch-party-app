import { getApiClient } from './apiClient';

export async function getAllPaths(ctx) {

    const apiClient = getApiClient(ctx);
    
    const { data } = await apiClient.get( '/api/paths' );
    
    const ids = data.ids;
    const paths = ids.map(id => {
        return {
            params: {id}
        }
    });
    
    return paths;
}