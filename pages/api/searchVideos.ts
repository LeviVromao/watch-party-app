import { config } from "dotenv"
import Pusher from "pusher"
import { IVideos } from "../../services/Interface"
config()

export default async function handler(req, res) {
  if(req.method === "POST") {
    try {
      const {room, video}: IVideos = req.body
  
      if(!room) {
        throw new Error("Access not authorized!")
      }
      
      const YTBResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${video}&key=${process.env.YOUTUBEAPIKEY}&part=snippet&maxResults=10`, {
        method: "GET",
      })
      const videos = await YTBResponse.json()
      const pusher = new Pusher({
          appId: process.env.APPID,
          key: process.env.PUSHERKEY,
          secret: process.env.PUSHERSECRET,
          cluster: "sa1",
          useTLS: true
      })
      
      await pusher.trigger(room, "foundVideos", {videos})
      res.status(200).json({message: "found videos with success"})
    } catch (error) {
      console.error(error)
      res.status(405).json({error})
    }
  }else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}