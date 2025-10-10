import { useEffect, useState, useRef, useContext } from 'react';
import styles from './Slide_Two.module.css';
import { WeatherContext } from '../Contexts';
import SearchBarWrapper from '../Search Bar/Search_Bar_Wrapper';
import SearchBar from '../Search Bar/Search_Bar';
import AnimatedContainer from '../../Animated Container/Animated_container';
import TextContainer from './Text_container';

import ClearDay from '../../weatherIconsFolder/Clear_Day/ClearDay';
import ClearNight from '../../weatherIconsFolder/Clear_Night/ClearNight';
import Cloudy from '../../weatherIconsFolder/Fully_Cloudy/FullyCloudy';
import PartialCloudy from '../../weatherIconsFolder/Partial_Cloudy/PartialCloudy';
import Rain from '../../weatherIconsFolder/Rain/Rain';
import Snow from '../../weatherIconsFolder/Snow/Snow';
import Thunderstorm from '../../weatherIconsFolder/Thunderstorm/Thunderstorm';
import Windy from '../../weatherIconsFolder/Wind/Windy';
// import SunnyBg from './backgrounds/Sunny/Sunny_bg';
// import ArrowDown from './icons/components/Arrow_Down';
// import ArrowUp from './icons/components/Arrow_Up';


const GetAnimations = (currentWeather, selectedPlace, setWeatherAnimations, cityRef, countryRef, minTempRef, maxTempRef, isDay) => {
    useEffect(() => {
        function calculateIfDaytimeOrNighttime(data) {
            var currentTime = data.currentConditions.datetime.slice(0, 2);
            var sunrise = data.currentConditions.sunrise.slice(0, 2);
            var sunset = data.currentConditions.sunset.slice(0, 2);
            if(sunset > currentTime) {
                if(sunrise >= currentTime) return false;
                return true;
            } return false;
        };

        function identifyWeather(data) {
            if(data) {
                var weather = data.currentConditions.conditions;
                isDay.current = calculateIfDaytimeOrNighttime(data);

                // Clear Day / Night
                if(weather.includes('Clear')) {
                    if(isDay.current) {
                        setWeatherAnimations({
                            icon: <ClearDay isCloudy={false} />,
                            background: 'clear',
                            bgClr: 'linear-gradient(to bottom, rgb(17, 183, 248), rgba(16, 119, 160, 1), rgba(13, 59, 77, 1))'
                        });
                    } else {
                        setWeatherAnimations({
                            icon: <ClearNight />,
                            background: 'clear',
                            bgClr: 'linear-gradient(to bottom, rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                        });
                    }
                } else if(weather.includes('unny') 
                    || weather.includes('Dust storm')) 
                {
                    // Clear Day
                    setWeatherAnimations({
                        icon: <ClearDay isCloudy={false} />,
                        background: 'clear',
                        bgClr: 'linear-gradient(to bottom, rgb(17, 183, 248), rgba(16, 119, 160, 1), rgba(13, 59, 77, 1))'
                    });
                } else if(weather.includes('Sky') 
                    || weather.includes('Partially cloudy')) 
                {
                    // Partially Cloudy
                    setWeatherAnimations({
                        icon: <PartialCloudy isDay={isDay} />,
                        background: 'partial-cloudy',
                        bgClr: isDay.current ? 'linear-gradient(to bottom, rgb(17, 183, 248), rgba(16, 119, 160, 1), rgba(13, 59, 77, 1))' : 'linear-gradient(to bottom, rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                    });
                } else if(weather.includes('Snow')
                    || weather.includes('Ice')
                    || weather.includes('Hail')
                    || weather.includes('Diamond Dust')) 
                {
                    // Snow
                    setWeatherAnimations({
                        icon: <Snow />,
                        background: 'snow',
                        bgClr: isDay.current ? 'linear-gradient(to bottom, rgba(149, 157, 168, 0.8), rgba(103, 120, 126, 0.5))' : 'linear-gradient(to top, rgba(7, 7, 7, 0.7), rgba(117, 125, 136, 0.8))'
                    });
                } else if(weather.includes('Freezing Fog')
                    || weather.includes('Squalls')
                    || weather.includes('ind'))
                {
                    // Windy
                    setWeatherAnimations({
                        icon: <Windy />,
                        background: 'windy',
                        bgClr: isDay.current ? 'linear-gradient(to bottom, rgba(149, 157, 168, 0.8), rgba(15, 17, 17, 0.5))' : 'linear-gradient(to top, rgba(11, 11, 48, 0.8), rgba(16, 8, 90, 0.6))'
                    });
                } else if(weather.includes('Drizzle') 
                    || weather.includes('Rain')) 
                {
                    // Rain
                    setWeatherAnimations({
                        icon: <Rain />,
                        background: 'rain',
                        bgClr: isDay.current ? 'linear-gradient(to bottom, rgba(50, 52, 54, 0.8), rgba(23, 23, 24, 0.9))' : 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(3, 11, 53, 1))'
                    });
                } else if(weather.includes('Mist')
                    || weather.includes('Smoke')
                    || weather.includes('Haze')
                    || weather.includes('Overcast')
                    || weather.includes('Fog')
                    || weather.includes('loud')
                    || weather.includes('Tornado')
                    || weather.includes('Precipitation')
                    || weather.includes('loudy'))
                {
                    // Cloudy
                    setWeatherAnimations({
                        icon: <Cloudy />,
                        background: 'cloudy',
                        bgClr: isDay.current ? 'linear-gradient(to bottom, rgba(116, 125, 129, 0.8), rgba(63, 69, 71, 0.8), rgba(6, 8, 8, 0.9))' : 'linear-gradient(to top, rgba(1, 5, 20, 1), rgba(4, 13, 43, 0.9))'
                    });
                } else if(weather.includes('Thunder')) {

                    // Thunderstorm
                    setWeatherAnimations({
                        icon: <Thunderstorm />,
                        background: 'thunder',
                        bgClr: isDay.current ? 'linear-gradient(to top, rgba(12, 12, 12, 1), rgba(24, 24, 26, 0.9), rgba(42, 43, 44, 0.9))' : 'linear-gradient(to top, rgba(12, 12, 12, 0.9), rgba(24, 24, 26, 0.8), rgba(0, 0, 0, 0.6))'
                    });
                };
            };
        };

        if(currentWeather) {
            identifyWeather(currentWeather);
            // isDay.current = true;
            // setWeatherAnimations({
            //     icon: <Windy />,
            //     background: 'windy',
            //     bgClr: 'linear-gradient(to bottom, rgba(116, 125, 129, 0.8), rgba(63, 69, 71, 0.8), rgba(6, 8, 8, 0.9))'
            // });
        }

    }, [currentWeather]);
    
    useEffect(() => {
        let temp = selectedPlace.formatted_address.split(' ');
        let counter = 0;
        temp.map((word) => {
            if(word.includes(',')) {
                counter++;
                if(counter === 1) {
                    let index = temp.indexOf(word);
                    cityRef.current = temp.slice(0, (index + 1)).join(' ');
                    countryRef.current = temp.slice((index + 1), temp.length).join(' ');
                };
            };
        });

        if(currentWeather) {
            minTempRef.current = currentWeather.days[0].tempmin;
            maxTempRef.current = currentWeather.days[0].tempmax;
        }
    }, [currentWeather]);
}

const SlideTwo = () => {
    const { currentWeather, selectedPlace } = useContext(WeatherContext);
    const [weatherAnimations, setWeatherAnimations] = useState({
        icon: null,
        background: '',
        bgClr: ''
    });
    const cityRef = useRef(null);
    const countryRef = useRef(null);
    const minTempRef = useRef(null);
    const maxTempRef = useRef(null);
    const isDay = useRef(null);

    GetAnimations(currentWeather, selectedPlace, setWeatherAnimations, cityRef, countryRef, minTempRef, maxTempRef, isDay);

    return (
        <div className={styles.slide_Two_Parent} id='secondSlideId'>
            {currentWeather &&   
                <div className={styles.slide_Two_Child}>
                    <AnimatedContainer weatherAnimations={weatherAnimations} isDay={isDay} >
                        <SearchBarWrapper indicator={false}>
                            <SearchBar />
                        </SearchBarWrapper>
                    </AnimatedContainer>
                    <div className={styles.text_parent_wrapper} style={{backgroundImage: `${weatherAnimations.bgClr}`}}>
                        <TextContainer city={cityRef.current} country={countryRef.current} minTemp={minTempRef.current} maxTemp={maxTempRef.current} isDay={isDay} />
                    </div>
                </div>
            }
        </div>
    );
};

export default SlideTwo;