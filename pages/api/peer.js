import Pusher from "pusher";
import {config} from "dotenv"
config()

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const {signal, room} = req.body
        const pusher = new Pusher({
            appId: process.env.APPID,
            key: process.env.PUSHERKEY,
            secret: process.env.PUSHERSECRET,
            cluster: "sa1",
            useTLS: true
        });
        await pusher.trigger(room, 'signal', {
            signal
        })
        res.status(200).end('sent event successfully')  
    } else {  
        res.status(405).json({ error: 'Method Not Allowed' })
    }
    
}
