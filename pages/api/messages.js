import Pusher from "pusher";

export default function handler(req, res) {
    const { sendMessage:message, room, user } = req.body;
    const sanitizedMess = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const token = req.headers.authorization;

    if(req.method === 'POST') {

        if(token) {
            try {
                const pusher = new Pusher({
                    appId: "1624128",
                    key: "91b3f8b373b617f82771",
                    secret: "fb09525b35dae0e2f097",
                    cluster: "sa1",
                    useTLS: true
                });
                pusher.trigger(room, 'message', { 
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