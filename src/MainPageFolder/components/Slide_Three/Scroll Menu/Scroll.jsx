import { useContext, useRef, useState } from "react";
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

    const onScroll = (offset, side) => {
        if (scrollableRef) {
            if (offsetCount.current === 0 
                || offsetCount.current === 785
                || offsetCount.current === 800
                || containerRef.current.scrollLeft === 1585
            ) {
                containerRef.current.scrollLeft += offset;
                // offsetCount.current = offsetCount.current + offset;
                offsetCount.current = containerRef.current.scrollLeft;
                // be careful, check if it sends value without being triggered
                // scrollBtns(containerRef.current.scrollLeft);
            } else {
                if (offsetCount.current < 800) {
                    if(side === 'left') {
                        containerRef.current.scrollLeft = 0;
                    } else {
                        if(offsetCount.current !== 800) {
                            let temp = 800 - offsetCount.current;
                            containerRef.current.scrollLeft += temp;
                        } else containerRef.current.scrollLeft += offsetCount.current;
                    }
                } else {
                    if(side === 'left') {
                        containerRef.current.scrollLeft = 800;
                    } else {
                        containerRef.current.scrollLeft = 1585;
                        // console.log(containerRef.current.scrollLeft)
                        // console.log('ddd')
                    }
                };

                offsetCount.current = containerRef.current.scrollLeft;
                // be careful, check if it sends value without being triggered
                // scrollBtns(containerRef.current.scrollLeft);
            }
        };
    };

    const onDrag = () => {
        if (scrollableRef) {
            // console.log('current: ' + containerRef.current.scrollLeft);
            // console.log('offset: ' + offsetCount.current);

            if(containerRef.current.scrollLeft !== 1585) {
                offsetCount.current = containerRef.current.scrollLeft;
                // be careful, check if it sends value without being triggered
                // scrollBtns(containerRef.current.scrollLeft);
            }
        }
    }

    function scrollBtns(data) {
        console.log('data: ' + data)
        if (typeof data === "number") {
            if (data === 0) {
                setForecastDaysBtns({
                    left: true,
                    right: false
                });
            } else if (data === 1585) {
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
                // console.log('left should be disabled')
                setHoursDaysBtns({
                    left: true,
                    right: false
                });
            } else if (data === 'both') {
                // console.log('both valid')
                setHoursDaysBtns({
                    left: false,
                    right: false
                });
            } else if (data === 'right') {
                // console.log('right should be disabled')
                setHoursDaysBtns({
                    left: false,
                    right: true
                });
            };
        }
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
    <div className={styles.scroll_container}>
        {!hourlyForecast && <button 
            className={forecastDaysBtns.left ? styles.left_btn_not_visible : styles.left_btn_visible} 
            fontSize={20} 
            onClick={() => {
                onScroll(-800, 'left'); 
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
        <div className={styles.scroll_container_child_daily_forecast}>
            {!hourlyForecast && 
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }} 
                    {...events} 
                    ref={containerRef}
                    className={styles.main} 
                    onMouseLeave={() => {
                        if (!hourlyForecast) onDrag();
                    }}
                >
                    {forecastArr.current.map((day) => {
                        (selectedDay === day) ? defaultSelectedDay.current = true : defaultSelectedDay.current = false;
                        return <ScrollCard 
                                key={day.info.date} 
                                dayInfo={day.info} 
                                temp={day.temperature.current}
                                onDrag={onDrag}
                                defaultSelected = {defaultSelectedDay.current}
                                onClick={() => setSelectedDay(day)}
                                />;
                    })}
                </motion.div>
            }

            {(hourlyForecast && selectedDay) && 
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }} 
                    {...events} 
                    ref={containerRef}
                    className={styles.main} 
                    onMouseLeave={() => {
                        if (!hourlyForecast) onDrag();
                    }}
                >
                    {selectedDay.hours.map((hour) => {
                        return <ScrollCard 
                                key={hour.id} 
                                dayInfo={hour.info} 
                                temp={hour.temperature.current}
                                onDrag={onDrag}
                                defaultSelected={null}
                                />;
                    })}
                </motion.div>
            }
        </div>
        {!hourlyForecast &&
        <button 
            className={forecastDaysBtns.right ? styles.right_btn_not_visible : styles.right_btn_visible} 
            fontSize={20} 
            onClick={() => { 
                onScroll(800, 'right'); 
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