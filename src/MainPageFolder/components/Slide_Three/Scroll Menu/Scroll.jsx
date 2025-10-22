import { useContext, useRef, useState } from "react";
import ScrollCard from "./Scroll_Card";
import styles from './Scroll.module.css';
import useScrollOnDrag from "react-scroll-ondrag";
import { WeatherContext } from "../../Contexts";
import ArrorLeft from './icons/components/ArrowLeft';
import ArrorRight from './icons/components/ArrowRight';

const ScrollComponent = ({ hourlyForecast, selectedDay, setSelectedDay, selectedHour, setSelectedHour, runScroll }) => {
    const { forecastArr, hourlyArr } = useContext(WeatherContext);
    const [disabledBtns, setDisabledBtns] = useState({
        left: true,
        right: false
    });
    const scrollableRef = useRef(null);
    const containerRef = useRef(null);
    const offsetCount = useRef(0);
    const defaultSelectedDay = useRef(null);
    const defaultSelectedHour = useRef(null);

    console.log('selected hour:');
    console.log(selectedHour);

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
                scrollBtns(containerRef.current.scrollLeft);
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
                scrollBtns(containerRef.current.scrollLeft);
            }
        };
    };

    const onDrag = () => {
        if (scrollableRef) {
            // console.log('current: ' + containerRef.current.scrollLeft);
            // console.log('offset: ' + offsetCount.current);

            if(containerRef.current.scrollLeft !== 1585) {
                offsetCount.current = containerRef.current.scrollLeft;
                scrollBtns(containerRef.current.scrollLeft);
            }
        }
    }

    function scrollBtns(data) {
        if(data === 0) {
            setDisabledBtns({
                left: true,
                right: false
            });
        } else if (data === 1585) {
            setDisabledBtns({
                left: false,
                right: true
            });
        } else {
            setDisabledBtns({
                left: false,
                right: false
            });
        };
    };

    const { events } = useScrollOnDrag(containerRef, {
        runScroll: runScroll && runScroll(containerRef),
    });

  return (
    <div className={styles.scroll_container}>
        <button 
            className={disabledBtns.left ? styles.left_btn_not_visible : styles.left_btn_visible} 
            fontSize={20} 
            onClick={() => onScroll(-800, 'left')} 
            disabled={disabledBtns.left}
        >
            <ArrorLeft />
        </button>
        <div className={styles.scroll_container_child_daily_forecast}>
            <div 
                {...events} 
                ref={containerRef}
                className={styles.main} 
                onMouseLeave={() => {
                    onDrag();
                }}
            >
                {!hourlyForecast && 
                forecastArr.current.map((day) => {
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

                {hourlyForecast && 
                hourlyArr.current.map((hour) => {
                    (selectedHour === hour) ? defaultSelectedHour.current = true : defaultSelectedHour.current = false;
                    return <ScrollCard 
                            key={hour.id} 
                            dayInfo={hour.info} 
                            temp={hour.temperature.current}
                            onDrag={onDrag}
                            defaultSelected={defaultSelectedHour}
                            onClick={() => {
                                setSelectedHour(hour);
                                console.log('selected hour:');
                                console.log(hour);
                            }}
                            />;
                })}
            </div>
        </div>
        <button 
            className={disabledBtns.right ? styles.right_btn_not_visible : styles.right_btn_visible} 
            fontSize={20} 
            onClick={() => onScroll(800, 'right')}
            disabled={disabledBtns.right} 
        >
            <ArrorRight />
        </button>
    </div>
  );
};

export default ScrollComponent;