import Pusher from "pusher";

export default function handler(req, res) {
    const token = req.headers.authorization;
    const { video, room } = req.body;
    
    if(req.method === 'POST') {
        if(token) {
            const pusher = new Pusher({
                appId: "1620702",
                key: "d91deb037f91cc154527",
                secret: "74b259df5390db0e7395",
                cluster: "sa1",
                useTLS: true
            });
            
            const url = video;
            const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=[\w-]+)(?:\S+)?|embed\/[\w-]+|v\/[\w-]+|(?:(?:[\w-]+\.)*[\w-]+\/?)\S+)|youtu\.be\/[\w-]+)$/;
            const isYoutubeURL = regex.test(url);
            if(isYoutubeURL) {
                const videoId = video.match(/v=([^&]+)/)[1];
                pusher.trigger(room, 'videos', {
                    video: videoId
                })
            } else {
                pusher.trigger(room, 'videos', {
                    error: "Atualmente so é aceito vídeos do youtube."
                })
            }
           res.json([])
        }
    } else {  
        res.status(405).json({ error: 'Method Not Allowed' })
    }
    
}
