import Pusher from "pusher";

export default function handler(req, res) {
    if(req.method === 'POST') {
        const {signal, room} = req.body
        const pusher = new Pusher({
            appId: "1624128",
            key: "91b3f8b373b617f82771",
            secret: "fb09525b35dae0e2f097",
            cluster: "sa1",
            useTLS: true
        });
        pusher.trigger(room, 'signal', {
            signal
        })
        res.status(200).end('sent event successfully')  
    } else {  
        res.status(405).json({ error: 'Method Not Allowed' })
    }
    
}
