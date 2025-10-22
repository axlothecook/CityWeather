import { useContext } from "react";
import { WeatherContext } from "../Contexts";
import styles from './Slide_Four.module.css';
import { DragCards } from "./Image/Cards";
import { VideoCarousel } from "./Video/VideoCarousel";

const SlideFour = () => {
    const { weatherAnimations } = useContext(WeatherContext);

    //style={{backgroundImage: `${weatherAnimations.thirdSlide.background}`}}
    return (
        <div className={styles.slide_Four_Parent} style={{backgroundImage: `${weatherAnimations.thirdSlide.background}`}}>
            <div className={styles.slide_Four_Child}>
                <DragCards />
                <VideoCarousel />
            </div>
        </div>
    );
};

export default SlideFour;