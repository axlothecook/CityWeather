import { useContext, useEffect, useState } from 'react';
import ScrollComponent from '../Scroll Menu/Scroll';
import styles from './Container.module.css';
import CardManager from '../Weather Card/CardManager';
import { WeatherContext } from '../../Contexts';
import ChartsWrapper from '../Charts/Charts_Wrapper';

const Container = ({ hourlyForecast }) => {
    const { forecastArr, hourlyArr } = useContext(WeatherContext);
    const [selectedDay, setSelectedDay] = useState();
    const [selectedHour, setSelectedHour] = useState();

    useEffect(() => {
        function setDefault () {
            (!selectedDay && forecastArr.current) ? setSelectedDay(forecastArr.current[0]) : null;
            // (!selectedHour && hourlyArr.current) ? setSelectedHour(hourlyArr.current[0]) : null;
        };
        setDefault();
    }, [selectedDay, forecastArr.current, selectedHour, hourlyArr.current]);

    // console.log('hourlyArr');
    // console.log(hourlyArr);
    // console.log('forecastArr');
    // console.log(forecastArr.current)

    return (
        <div className={styles.forecast_wrapper}>
            <ScrollComponent 
                hourlyForecast={hourlyForecast} 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay} 
                selectedHour={selectedHour} 
                setSelectedHour={setSelectedHour} 
            />
            {/* {(!hourlyForecast && selectedDay) && <CardManager selectedDay={selectedDay} />} */}
            {hourlyForecast && <ChartsWrapper date={selectedDay.info.date} />}
        </div>
    );
};

export default Container;