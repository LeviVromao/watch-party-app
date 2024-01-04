import Pusher from "pusher";

export default function handler(req, res) {
    const token = req.headers.authorization;
    const { video, room } = req.body;
    
    if(req.method === 'POST') {

        if(token) {
            
            const pusher = new Pusher({
                appId: "1624128",
                key: "91b3f8b373b617f82771",
                secret: "fb09525b35dae0e2f097",
                cluster: "sa1",
                useTLS: true
            });
            const url = video;
            const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=[\w-]+)(?:\S+)?|embed\/[\w-]+|v\/[\w-]+|(?:(?:[\w-]+\.)*[\w-]+\/?)\S+)|youtu\.be\/[\w-]+)$/;
            const isYoutubeURL = regex.test(url);

            if(isYoutubeURL) {

                const videoId = video.match(/(?:\/|%3D|v=|vi=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/)[1];
                try {
                    
                    pusher.trigger(room, 'videos', {
                        video: videoId
                    }, () => res.status(200).end('sent event successfully'));

                } catch (error) {
                    console.error(error);
                }

            } else {

                pusher.trigger(room, 'videos', {
                    error: "Atualmente so é aceito vídeos do youtube."
                })

            }

        }

    } else {  
        res.status(405).json({ error: 'Method Not Allowed' })
    }
    
}
