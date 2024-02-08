import Pusher from "pusher";
import {config} from "dotenv"
config()

export default async function handler(req, res) {
    const { sendMessage:message, room, user } = req.body;
    const sanitizedMess = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const token = req.headers.authorization;

    if(req.method === 'POST') {

        if(token) {
            try {
                const pusher = new Pusher({
                    appId: process.env.APPID,
                    key: process.env.PUSHERKEY,
                    secret: process.env.PUSHERSECRET,
                    cluster: "sa1",
                    useTLS: true
                });
                await pusher.trigger(room, 'message', { 
                    message: sanitizedMess, 
                    user
                });
                res.status(200).json({message: "Message send with success!"})
            } catch (error) {
                console.error( error );
                res.status(404).json({error: error.message})
            }
        }
    } else {
        res.status(405).json({"error": "Method not allowed"})
    }
}