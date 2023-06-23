import { parseCookies } from "nookies";
import { getApiClient } from "./apiClient";

export async function getAllPaths(ctx) {
    const apiClient = getApiClient(ctx);
    const {"auth.token": token} = parseCookies(ctx);

    const { data } = await apiClient.get("/api/paths", {
        headers: {
            Authorization: token
        }
    })
    
    const ids = data.ids;
    const paths = ids.map(id => {
        return {
            params: {id}
        }
    });

    return paths;
}