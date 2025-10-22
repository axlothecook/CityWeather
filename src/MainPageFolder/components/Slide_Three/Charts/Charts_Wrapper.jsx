import { useContext } from 'react';
import styles from './Charts.module.css';
import { WeatherContext } from '../../Contexts';
import TemperatureChart from './Temperature/Temperature_Chart';

const ChartsWrapper = ({ date }) => {
    const { hourlyArr } = useContext(WeatherContext);

    console.log('hourlyArr:')
    console.log(hourlyArr.current)

    return (
        <div className={styles.charts_wrapper}>
            <div className={styles.main_chart_wrapper}>
                {/* <h1>Date</h1> */}
                <h1>{date}</h1>
                <TemperatureChart  />
            </div>
            <div className={styles.rest_of_charts_wrapper}>
                
            </div>
        </div>
    );
};

export default ChartsWrapper;