import { useContext, useRef } from 'react';
import styles from './Slide_Two.module.css';
import { WeatherContext } from '../Contexts';
import ArrowDown from './icons/components/Arrow_Down';
import ArrowUp from './icons/components/Arrow_Up';

const TextContainer = () => {
    const { weatherAnimations, secondSlideData } = useContext(WeatherContext);
    const txtClr = useRef();
    txtClr.current = weatherAnimations.isItDay ? 'black' : '#ccc';

    return (
        <div className={styles.text_container}>
            <div className={styles.city_country_text_container}>
                <h1 style={{color: `${txtClr.current}`}}>{secondSlideData.current.city}</h1>
                <h3 style={{color: `${txtClr.current}`}}>{secondSlideData.current.country}</h3>
            </div>
            <div className={styles.temperature_wrapper}>
                <div className={styles.current_temperature_wrapper}>
                    <div>
                        <h1 style={{color: `${txtClr.current}`}}>{secondSlideData.current.temp}°C</h1>
                    </div>
                    <div className={styles.min_max_wrapper}>
                        <div className={styles.max_min_container}>
                            <h4 style={{color: `${txtClr.current}`}}>{secondSlideData.current.minTemp}°C</h4>
                            <ArrowDown isItDay={weatherAnimations.isItDay} />
                        </div>
                        <div className={styles.max_min_container}>
                            <h4 style={{color: `${txtClr.current}`}}>{secondSlideData.current.maxTemp}°C</h4>
                            <ArrowUp isItDay={weatherAnimations.isItDay}/>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 style={{color: `${txtClr.current}`}}>{secondSlideData.current ? secondSlideData.current.conditions : ''}</h1>
                </div>
            </div>
        </div>
    );
};

export default TextContainer;