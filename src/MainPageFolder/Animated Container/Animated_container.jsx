import styles from './Animated_Container.module.css';

const AnimatedContainer = ({ children, weatherAnimations, isDay }) => {
 
    return (
        <div className={styles.container_parent}>
            {(weatherAnimations.background && weatherAnimations.background.includes('clear')) && 
                <div className={isDay.current ? styles.clear_day_bg : styles.clear_night_bg}>
                    {children}
                    {weatherAnimations.icon}
                </div>
            }
            {(weatherAnimations.background && weatherAnimations.background === 'partial-cloudy') && 
                <div className={isDay.current ? styles.partial_cloudy_day_bg : styles.partial_cloudy_night_bg}>
                    {children}
                    {weatherAnimations.icon}
                </div>
            }
            {(weatherAnimations.background && weatherAnimations.background.includes('snow')) && 
                <div className={isDay.current ? styles.snow_day_bg : styles.snow_night_bg}>
                    {children}
                    {weatherAnimations.icon}
                </div>
            }
            {(weatherAnimations.background && weatherAnimations.background.includes('windy')) && 
                <div className={isDay.current ? styles.wind_day_bg : styles.wind_night_bg}>
                    {children}
                    {weatherAnimations.icon}
                </div>
            }
            {(weatherAnimations.background && weatherAnimations.background.includes('rain')) && 
                <div className={isDay.current ? styles.rain_day_bg : styles.rain_night_bg}>
                    {children}
                    {weatherAnimations.icon}
                </div>
            }
            {(weatherAnimations.background && weatherAnimations.background === 'cloudy') && 
                <div className={isDay.current ? styles.fully_cloudy_day_bg : styles.fully_cloudy_night_bg}>
                    {children}
                    {weatherAnimations.icon}
                </div>
            }
            {(weatherAnimations.background && weatherAnimations.background.includes('thunder')) && 
                <div className={isDay.current ? styles.thunder_cloudy_day_bg : styles.thunder_cloudy_night_bg}>
                    {children}
                    {weatherAnimations.icon}
                </div>
            }
        </div>
    );
};

export default AnimatedContainer;