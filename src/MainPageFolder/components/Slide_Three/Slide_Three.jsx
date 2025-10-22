import styles from './Slide_Three.module.css';
import Container from './Body/Container';
import TopBar from './Top Bar/TopBar';
import { useContext, useState } from 'react';
import { WeatherContext } from '../Contexts';

const SlideThree = () => {
    const { weatherAnimations } = useContext(WeatherContext);
    // put back to false
    const [hourlyForecast, setHourlyForecast] = useState(true);

    return (
        <div className={styles.slide_Three_Parent} style={{backgroundImage: `${weatherAnimations.thirdSlide.background}`}}>
            <div className={styles.slide_Three_Child}>
                <TopBar hourlyForecast={hourlyForecast} setHourlyForecast={setHourlyForecast} />
                <Container hourlyForecast={hourlyForecast} />
            </div>
        </div>
    );
};

export default SlideThree;