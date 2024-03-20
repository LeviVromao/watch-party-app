/* eslint-disable jsx-a11y/role-supports-aria-props */
import Image from "next/image"
import { parseCookies } from "nookies"
import styles from "../styles/FoundVideos.module.css"

export default function FoundVideos({videos, room}) {
  const handleVideoLink = (e) => {
    const {"authToken": token} = parseCookies()
    const videoId = e.target.getAttribute("aria-valuenow")

    fetch("https://watch-party-levi-app.vercel.app/api/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({video: `youtube.com/watch?v=${videoId}`, room})
    })
  }

  return (
    <div className={styles.videosContainer}>
      {videos.items.map((video, i) => (
        <div className={styles.videoContainer} key={i}>
          {video.snippet.thumbnails.medium.width &&(
            <>
              <Image
                src={video.snippet.thumbnails.medium.url}
                key={i}
                width={video.snippet.thumbnails.medium.width}
                height={video.snippet.thumbnails.medium.height}
                alt={`The ${video.snippet.channelTitle} video on Youtube`}
                aria-valuenow={video.id.videoId}
                className={styles.videoImg}
                onClick={handleVideoLink}
              />
              <div className={styles.videoInformation}>
                <h1 onClick={handleVideoLink} className={styles.videoTitle} aria-valuenow={video.id.videoId}>{video.snippet.title}</h1>
                <p className={styles.videoDesc}>{video.snippet.description}</p>
              </div>
            </>
            )}
          </div>
      ))}
    </div>
  )
}