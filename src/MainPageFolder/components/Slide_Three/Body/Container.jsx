import { useContext, useEffect, useState } from 'react';
import ScrollComponent from '../Scroll Menu/Scroll';
import styles from './Container.module.css';
import CardManager from '../Weather Card/CardManager';
import { WeatherContext } from '../../Contexts';
import ChartsWrapper from '../Charts/Charts_Wrapper';
import { AnimatePresence } from 'framer-motion';

const Container = ({ hourlyForecast }) => {
    const { forecastArr } = useContext(WeatherContext);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        function setUpTheDay () {
            (forecastArr.current.length !== 0) ? setSelectedDay(forecastArr.current[0]) : null;
        };
        setUpTheDay();
    }, [forecastArr.current]);

    return (
        <AnimatePresence mode='wait'>
            <div className={styles.wrapper}>
                <ScrollComponent 
                    hourlyForecast={hourlyForecast} 
                    selectedDay={selectedDay} 
                    setSelectedDay={setSelectedDay} 
                />
                {(!hourlyForecast && selectedDay) && <CardManager selectedDay={selectedDay} hourlyForecast={hourlyForecast} />}
                {(hourlyForecast && selectedDay) && <ChartsWrapper selectedDay={selectedDay} date={selectedDay.info.date} />}
            </div>
        </AnimatePresence>
    );
};

export default Container;