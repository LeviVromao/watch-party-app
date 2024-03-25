import Image from "next/image"
import styles from "../styles/Chat.module.css"

export default function YoutubePlayer({ handleAdvice, video }) {
  return (
    <>
      {video? 
        <iframe 
          src={`https://www.youtube.com/embed/${video}`} 
          title="YouTube video player" 
          frameBorder="0"
          allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture; 
              web-share" 
          allowFullScreen
          id="videoPlayer"
          className={styles.video}
        >
        </iframe>
            : 
          <div className={styles.videoFake} onClick={handleAdvice}>
              <Image 
                src="/YoutubeLOGO.png" 
                alt="A logo by Youtube" 
                className={styles.logo}
                width={79}
                height={49}
              />
            <h1 className={styles.advice}>
                Você precisa escolher um vídeo para poder assistir.
            </h1>
          </div>   
        }
    </>
  )
}