import { useContext, useEffect, useRef, useState } from "react";
import ScrollCard from "./Scroll_Card";
import styles from './Scroll.module.css';
import useScrollOnDrag from "react-scroll-ondrag";
import { WeatherContext } from "../../Contexts";
import ArrorLeft from './icons/components/ArrowLeft';
import ArrorRight from './icons/components/ArrowRight';
import { motion } from 'framer-motion';

const ScrollComponent = ({ hourlyForecast, selectedDay, setSelectedDay, runScroll }) => {
    const { forecastArr } = useContext(WeatherContext);
    const [forecastDaysBtns, setForecastDaysBtns] = useState({
        left: true,
        right: true
    });
    const [hoursDaysBtns, setHoursDaysBtns] = useState({
        left: true,
        right: false
    });
    const scrollableRef = useRef(null);
    const containerRef = useRef(null);
    const offsetCount = useRef(0);
    const defaultSelectedDay = useRef(null);

    function presetScroll () {
        let element = document.querySelector('#scroll_container_forecast');
        if(element) {
            const position = element.getBoundingClientRect();
            if (position.width === 296) {
                return true;
            } else return false;
        };
    };

    useEffect(() => {
        if(presetScroll()) scrollBtns(0);
    }, []);

    const onScroll = (offset) => {
        if (scrollableRef) {
            containerRef.current.scrollLeft += offset;
            offsetCount.current = containerRef.current.scrollLeft;
            scrollBtns(offsetCount.current);
        };
    };

    const onDrag = () => {
        if (scrollableRef) {
            if(containerRef.current.scrollLeft <= 574) {
                offsetCount.current = containerRef.current.scrollLeft;
                scrollBtns(offsetCount.current);
            }
        }
    }

    function scrollBtns(data) {
        if (typeof data === 'number') {
            if (data === 0) {
                setForecastDaysBtns({
                    left: true,
                    right: false
                });
            } else if (data === 574) {
                setForecastDaysBtns({
                    left: false,
                    right: true
                });
            } else {
                setForecastDaysBtns({
                    left: false,
                    right: false
                });
            };
        } else {
            if (data === 'left') {
                setHoursDaysBtns({
                    left: true,
                    right: false
                });
            } else if (data === 'both') {
                setHoursDaysBtns({
                    left: false,
                    right: false
                });
            } else if (data === 'right') {
                setHoursDaysBtns({
                    left: false,
                    right: true
                });
            };
        };
    };

    const { events } = useScrollOnDrag(containerRef, {
        runScroll: runScroll && runScroll(containerRef),
    });

    const isCurrentDay = (day) => day === selectedDay;

    function indexSetting(num) {
        let length = forecastArr.current.length;
        let currentIndex = forecastArr.current.findIndex(isCurrentDay);
        let temp = currentIndex + num;
        (temp < length && temp >= 0) ? setSelectedDay(forecastArr.current[temp]) : setSelectedDay(forecastArr.current[0]);
        if (temp <= 0) {
            scrollBtns('left');
        } else if (length - 1 === temp) {
            scrollBtns('right');
        } else if (temp < length) {
            scrollBtns('both');
        };
    };

  return (
    <div className={styles.wrapper}>
        {!hourlyForecast && <button 
            className={forecastDaysBtns.left ? styles.left_btn_not_visible : styles.left_btn_visible} 
            fontSize={20} 
            onClick={() => {
                onScroll(-288); 
            }} 
            disabled={forecastDaysBtns.left}
        >
            <ArrorLeft />
        </button>}
        {hourlyForecast && 
        <button 
            className={hoursDaysBtns.left ? styles.left_btn_not_visible : styles.left_btn_visible} 
            fontSize={20} 
            onClick={() => {
                indexSetting(-1); 
            }} 
            disabled={hoursDaysBtns.left}
        >
            <ArrorLeft />
        </button>}
        {!hourlyForecast && 
        <div 
        className={styles.scroll_container_forecast} 
        id='scroll_container_forecast' 
        onMouseUp={() => {
            if (presetScroll()) onDrag();
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }} 
                {...events} 
                ref={containerRef}
                className={styles.main} 
            >
                {forecastArr.current.map((day) => {
                    (selectedDay === day) ? defaultSelectedDay.current = true : defaultSelectedDay.current = false;
                    return <ScrollCard 
                            key={day.info.date} 
                            dayInfo={day.info} 
                            temp={day.temperature.current}
                            defaultSelected = {defaultSelectedDay.current}
                            onClick={() => setSelectedDay(day)}
                            />;
                })}
            </motion.div>
        </div>
        }

        {(hourlyForecast && selectedDay) && 
        <div 
        className={styles.scroll_container_daily}
        >
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }} 
                {...events} 
                ref={containerRef}
                className={styles.main} 
            >
                {selectedDay.hours.map((hour) => {
                    return <ScrollCard 
                            key={hour.id} 
                            dayInfo={hour.info} 
                            temp={hour.temperature.current}
                            defaultSelected={null}
                            />;
                })}
            </motion.div>
        </div>
        }
        {!hourlyForecast &&
        <button 
            className={forecastDaysBtns.right ? styles.right_btn_not_visible : styles.right_btn_visible} 
            fontSize={20} 
            onClick={() => { 
                onScroll(288); 
            }}
            disabled={forecastDaysBtns.right} 
        >
            <ArrorRight />
        </button>}
        {hourlyForecast && 
        <button 
            className={hoursDaysBtns.right ? styles.right_btn_not_visible : styles.right_btn_visible} 
            fontSize={20} 
            onClick={() => {
                indexSetting(1);
            }}
            disabled={hoursDaysBtns.right} 
        >
            <ArrorRight />
        </button>}
    </div>
  );
};

export default ScrollComponent;