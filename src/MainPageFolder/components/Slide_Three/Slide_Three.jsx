import { useContext } from 'react';
import { WeatherContext } from '../Contexts';
import styles from './Slide_Three.module.css';

const SlideThree = () => {
    const { currentWeather, selectedPlace } = useContext(WeatherContext);
    console.log(currentWeather)

    return (
        <div className={styles.slide_Three_Parent}>
            <div className={styles.slide_Three_Child}></div>
        </div>
    );
};

export default SlideThree;