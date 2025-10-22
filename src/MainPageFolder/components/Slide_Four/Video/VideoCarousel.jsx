import { useContext, useState } from 'react';
import styles from './Video.module.css';
import { PhotosAndVideosContext } from '../../Contexts';

export const VideoCarousel = () => {
    const { videoArr } = useContext(PhotosAndVideosContext);
    const [isHover, setIsHover] = useState(true);

    // console.log('videoArr:')
    // console.log(videoArr)

    function goToSlide(num) {

    }

    return (
        <div className={styles.carousel}>
            <div className={styles.video_carousel}>
                {videoArr && videoArr.map((item) => (
                    <a key={item.id.videoId} href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target='_blank'>
                        <div 
                            className={styles.video} 
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            {isHover && 
                            <div className={styles.title} >
                                <h1>{item.snippet.title}</h1>
                            </div>}
                            <div className={styles.blurred_div} style={{filter: `${isHover ? 'blur(0.3rem)' : 'blur(0)'}`}}>
                                <img className={styles.thumbnail} src={item.snippet.thumbnails.high.url} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <ul className={styles.ticking_bar}>
                <li onClick={() => {goToSlide(0)}}></li>
                <li onClick={() => {goToSlide(1)}}></li>
                <li onClick={() => {goToSlide(2)}}></li>
                <li onClick={() => {goToSlide(3)}}></li>
                <li onClick={() => {goToSlide(4)}}></li>
            </ul>
        </div>
    );
};