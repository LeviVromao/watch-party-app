import Pusher from "pusher";

export default function handler(req, res) {
    const { sendMessage:message, room, user: name = '' } = req.body;
    const sanitizedMess = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const token = req.headers.authorization;

    if(req.method === 'POST') {
        if(token) {
            const pusher = new Pusher({
                appId: "1620702",
                key: "d91deb037f91cc154527",
                secret: "74b259df5390db0e7395",
                cluster: "sa1",
                useTLS: true
            });
            
            pusher.trigger(room, 'messages', { 
                message: sanitizedMess, 
                name
            })
        }
        res.json({});
    } else {
        res.status(405).json({"error": "Method not allowed"})
    }
}