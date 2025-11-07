import { useContext } from 'react';
import styles from './TopBar.module.css';
import { WeatherContext } from '../../Contexts';

const TopBar = ({ hourlyForecast, setHourlyForecast }) => {
    const { weatherAnimations } = useContext(WeatherContext);
    return (
        <div className={styles.top_bar}>
            <div className={styles.btns}>
                <button 
                    className={styles.btn} 
                    style={{backgroundColor: !hourlyForecast ? 'grey' : 'rgba(255, 255, 255, 0.1)'}}
                    onClick={() => {
                        setHourlyForecast(false);
                    }}
                >
                    <h2>Forecast</h2>
                </button>
                <button 
                    className={styles.btn} 
                    style={{backgroundColor: hourlyForecast ? 'grey' : 'rgba(255, 255, 255, 0.1)'}}
                    onClick={() => {
                        setHourlyForecast(true);
                    }}
                >
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