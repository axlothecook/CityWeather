import { useContext, useRef } from 'react';
import styles from './Slide_Two.module.css';
import { WeatherContext } from '../Contexts';
import ArrowDown from './icons/components/Arrow_Down';
import ArrowUp from './icons/components/Arrow_Up';

const TextContainer = ({ city, country, minTemp, maxTemp, isDay }) => {
    const { currentWeather } = useContext(WeatherContext);
    const txtClr = useRef();
    txtClr.current = isDay.current ? 'black' : '#ccc'

    return (
        <div className={styles.text_container}>
            <div className={styles.city_country_text_container}>
                <h1 style={{color: `${txtClr.current}`}}>{city}</h1>
                <h3 style={{color: `${txtClr.current}`}}>{country}</h3>
            </div>
            <div className={styles.temperature_wrapper}>
                <div className={styles.current_temperature_wrapper}>
                    <div>
                        <h1 style={{color: `${txtClr.current}`}}>{currentWeather.currentConditions.temp}°C</h1>
                    </div>
                    <div className={styles.min_max_wrapper}>
                        <div className={styles.max_min_container}>
                            <h4 style={{color: `${txtClr.current}`}}>{minTemp}°C</h4>
                            <ArrowDown isDay={isDay} />
                        </div>
                        <div className={styles.max_min_container}>
                            <h4 style={{color: `${txtClr.current}`}}>{maxTemp}°C</h4>
                            <ArrowUp isDay={isDay}/>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 style={{color: `${txtClr.current}`}}>{currentWeather ? currentWeather.currentConditions.conditions : ''}</h1>
                </div>
            </div>
        </div>
    );
};

export default TextContainer;