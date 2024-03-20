import Pusher from "pusher";
import { config } from "dotenv";
config()

export default async function handler(req, res) {
    const token = req.headers.authorization;
    
    if (req.method === 'POST') {
        try {
            if (!token) {
                throw new Error('Authorization token not provided.')
            }

            const { video, room } = req.body

            if (!video || !room) {
                throw new Error('Invalid request body. Required properties are missing.')
            }

            const pusher = new Pusher({
                appId: process.env.APPID,
                key: process.env.PUSHERKEY,
                secret: process.env.PUSHERSECRET,
                cluster: "sa1",
                useTLS: true
            });

            const url = video;
            const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=[\w-]+)(?:\S+)?|embed\/[\w-]+|v\/[\w-]+|(?:(?:[\w-]+\.)*[\w-]+\/?)\S+)|youtu\.be\/[\w-]+)$/

            const isYoutubeURL = regex.test(url)

            if (isYoutubeURL) {
                const videoId = video.match(/(?:\/|%3D|v=|vi=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/)[1]

                await pusher.trigger(room, 'video', { video: videoId })
                res.status(200).json({ error: 'Video event sent successfully.' })
            } else {
                await pusher.trigger(room, 'videos', { error: "Currently only YouTube videos are accepted." })
                res.status(200).json({ error: 'Error: Currently only YouTube videos are accepted.' })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}
