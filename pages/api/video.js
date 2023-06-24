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

                const videoId = video.match(/v=([^&]+)/)[1];
                try {
                    console.log('Video ID', videoId);
                    pusher.trigger(room, 'videos', {
                        video: videoId
                    })

                } catch (error) {
                    console.error(error);
                }

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
