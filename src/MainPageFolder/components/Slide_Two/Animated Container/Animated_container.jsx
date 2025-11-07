import { useContext } from 'react';
import styles from './Animated_Container.module.css';
import { WeatherContext } from '../../Contexts';

const AnimatedContainer = ({ children }) => {
    const { weatherAnimations } = useContext(WeatherContext);
 
    return (
        <>
            {(weatherAnimations && weatherAnimations.secondSlide.background.includes('clear')) && 
                <div className={weatherAnimations.isItDay ? styles.clear_day_bg : styles.clear_night_bg}>
                    {children}
                    {weatherAnimations.secondSlide.icon}
                </div>
            }
            {(weatherAnimations && weatherAnimations.secondSlide.background === 'partial-cloudy') && 
                <div className={weatherAnimations.isItDay ? styles.partial_cloudy_day_bg : styles.partial_cloudy_night_bg}>
                    {children}
                    {weatherAnimations.secondSlide.icon}
                </div>
            }
            {(weatherAnimations && weatherAnimations.secondSlide.background.includes('snow')) && 
                <div className={weatherAnimations.isItDay ? styles.snow_day_bg : styles.snow_night_bg}>
                    {children}
                    {weatherAnimations.secondSlide.icon}
                </div>
            }
            {(weatherAnimations && weatherAnimations.secondSlide.background.includes('windy')) && 
                <div className={weatherAnimations.isItDay ? styles.wind_day_bg : styles.wind_night_bg}>
                    {children}
                    {weatherAnimations.secondSlide.icon}
                </div>
            }
            {(weatherAnimations && weatherAnimations.secondSlide.background.includes('rain')) && 
                <div className={weatherAnimations.isItDay ? styles.rain_day_bg : styles.rain_night_bg}>
                    {children}
                    {weatherAnimations.secondSlide.icon}
                </div>
            }
            {(weatherAnimations && weatherAnimations.secondSlide.background === 'cloudy') && 
                <div className={weatherAnimations.isItDay ? styles.fully_cloudy_day_bg : styles.fully_cloudy_night_bg}>
                    {children}
                    {weatherAnimations.secondSlide.icon}
                </div>
            }
            {(weatherAnimations && weatherAnimations.secondSlide.background.includes('thunder')) && 
                <div className={weatherAnimations.isItDay ? styles.thunder_cloudy_day_bg : styles.thunder_cloudy_night_bg}>
                    {children}
                    {weatherAnimations.secondSlide.icon}
                </div>
            }
        </>
    );
};

export default AnimatedContainer;