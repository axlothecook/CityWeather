import { useContext, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styles from './Video.module.css';
import { PhotosAndVideosContext } from '../../Contexts';
import VideoMsgComponent from './VideoMsg';

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

export const VideoCarousel = () => {
    const [imgIndex, setImgIndex] = useState(0);
    const { 
        videoArr,
        loadingVideosRef,
        errorFetchingVideosRef 
    } = useContext(PhotosAndVideosContext);

    const dragX = useMotionValue(0);
    const DRAG_BUFFER = 50;

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
            setImgIndex((pv) => {
                if (pv === videoArr.length - 1) {
                    return 0;
                }
                return pv + 1;
            });
            }
        }, 5000);

        return () => clearInterval(intervalRef);
    }, []);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < videoArr.length - 1) {
            setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1);
        }
    };

    return (
        <>
            {(loadingVideosRef.current || errorFetchingVideosRef.current) &&
                <VideoMsgComponent loading={loadingVideosRef.current} error={errorFetchingVideosRef.current} />
            }
            {(!loadingVideosRef.current && !errorFetchingVideosRef.current) && 
                <div className={styles.carousel}>
                    <motion.div
                        drag="x"
                        dragConstraints={{
                            left: 0,
                            right: 0,
                        }}
                        style={{
                            x: dragX,
                        }}
                        animate={{
                            translateX: `-${imgIndex * 100}%`,
                        }}
                        transition={SPRING_OPTIONS}
                        onDragEnd={onDragEnd}
                        className={styles.carousel_child_div}
                    >
                        <Images videoArr={videoArr} />
                    </motion.div>

                    <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} videoArr={videoArr} />
                </div>
            }
        </>
    );
};

const Images = ({ videoArr }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            {videoArr && videoArr.map((item) => (
                <a key={item.id.videoId} href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target='_blank'>
                    <motion.div
                        className={styles.video}
                        transition={SPRING_OPTIONS}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    > 
                        {isHover && 
                            <div className={styles.title_div} >
                                <h1>{item.snippet.title}</h1>
                            </div>
                        }
                        <div className={styles.blurred_div} style={{filter: `${isHover ? 'blur(0.3rem)' : 'blur(0)'}`}}>
                            <img className={styles.thumbnail} src={item.snippet.thumbnails.high.url} />
                        </div>
                    </motion.div>
                </a>
            ))}
        </>
    );
};

const Dots = ({ imgIndex, setImgIndex, videoArr }) => {
    return (
        <div className={styles.ticking_bar}>
            {videoArr.map((_, idx) => {

            return (
                <button
                    key={idx}
                    onClick={() => setImgIndex(idx)}
                    className={(idx === imgIndex) ? styles.current_btn : styles.general_btn}
                >
                    {idx === imgIndex && <div className={styles.progress}></div>}
                </button>
            );
            })}
        </div>
    );
};