import { useContext } from 'react';
import styles from './TopBar.module.css';
import { WeatherContext } from '../../Contexts';

const TopBar = ({ hourlyForecast, setHourlyForecast }) => {
    const { weatherAnimations } = useContext(WeatherContext);
    return (
        <div className={styles.top_bar}>
            <div className={styles.sort_options}>
                <button className={styles.btn} onClick={() => {
                    setHourlyForecast(false);
                }}>
                    <h2>Forecast</h2>
                </button>
                <button className={styles.btn} onClick={() => {
                    setHourlyForecast(true);
                }}>
                    <h2>24 hours</h2>
                </button>
            </div>
            <div className={styles.top_bar_location_text}>
                <h2 style={{color: (weatherAnimations.isItDay) ? 'black' : 'white'}}>Next [{hourlyForecast ? '361 Hours' : '15 days'}]</h2>
            </div>
        </div>
    );
};

export default TopBar;