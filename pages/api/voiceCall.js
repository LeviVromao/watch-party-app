import Pusher from "pusher";
import { Server } from "socket-io"

export default function handler(req, res) {
    const token = req.headers.authorization;
    if(req.method === 'POST') {
        if(token) {
            const pusher = new Pusher({
                appId: "1624128",
                key: "91b3f8b373b617f82771",
                secret: "fb09525b35dae0e2f097",
                cluster: "sa1",
                useTLS: true
            });
                
            pusher.trigger(room, 'signal', {
                offer
            }, () => res.status(200).end('sent event successfully'));
        }
    } else {  
        res.status(405).json({ error: 'Method Not Allowed' })
    }
    
}
