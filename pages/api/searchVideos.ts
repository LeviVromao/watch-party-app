import { config } from "dotenv"
import Pusher from "pusher"
import { IVideos } from "../../services/Interface"
config()

export default async function handler(req, res) {
  if(req.method === "POST") {
    const {room, video}: IVideos = req.body
    const token = req.headers.authorization
    let videosStatistics = []

    if(!token || !room) {
      throw new Error("Access not authorized!")
    }
    
    const YTBResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${video}&key=${process.env.YOUTUBEAPIKEY}&channelid=${process.env.GOOGLE_CLIENT_ID}&part=snippet&maxResults=10`, {
        method: "GET",
    })
    const videos = await YTBResponse.json()

    for(const item of videos.items) {
      const statisticsResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${process.env.YOUTUBEAPIKEY}&maxResults=10`);
      const videosStatisticsData = await statisticsResponse.json()
      videosStatisticsData.items.forEach(item => {
        const data = {
          id: item.id,
          statistics: item.statistics
        }
        videosStatistics.push(data)
      })
    }

    const pusher = new Pusher({
        appId: process.env.APPID,
        key: process.env.PUSHERKEY,
        secret: process.env.PUSHERSECRET,
        cluster: "sa1",
        useTLS: true
    });
    await pusher.trigger(room, "foundVideos", {videos, videosStatistics})
    res.status(200).json({message: "found videos with success"})
  }else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}