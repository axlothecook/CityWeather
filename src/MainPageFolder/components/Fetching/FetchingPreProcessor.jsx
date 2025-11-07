import { useEffect, useRef } from "react";
import useWeatherData from "./FetchWeatherData";
import {isToday} from '../../../../node_modules/date-fns/src/isToday/index';
import {isMonday} from '../../../../node_modules/date-fns/src/isMonday/index';
import {isTuesday} from '../../../../node_modules/date-fns/src/isTuesday/index';
import {isWednesday} from '../../../../node_modules/date-fns/src/isWednesday/index';
import {isThursday} from '../../../../node_modules/date-fns/src/isThursday/index';
import {isFriday} from '../../../../node_modules/date-fns/src/isFriday/index';
import {isSaturday} from '../../../../node_modules/date-fns/src/isSaturday/index';
import {isSunday} from '../../../../node_modules/date-fns/src/isSunday/index';

import ClearDay from '../../weatherIconsFolder/Clear_Day/ClearDay';
import ClearNight from '../../weatherIconsFolder/Clear_Night/ClearNight';
import Cloudy from '../../weatherIconsFolder/Fully_Cloudy/FullyCloudy';
import PartialCloudy from '../../weatherIconsFolder/Partial_Cloudy/PartialCloudy';
import Rain from '../../weatherIconsFolder/Rain/Rain';
import Snow from '../../weatherIconsFolder/Snow/Snow';
import Thunderstorm from '../../weatherIconsFolder/Thunderstorm/Thunderstorm';
import Windy from '../../weatherIconsFolder/Wind/Windy';

import ClearDayGoogleIcon from "../../google-weather-icons/components/Clear_Day";
import BlizzardGoogleIcon from "../../google-weather-icons/components/Blizzard";
import ClearNightGoogleIcon from "../../google-weather-icons/components/Clear_Night";
import DustStormGoogleIcon from "../../google-weather-icons/components/Dust_Storm";
import PartialCloudyDayGoogleIcon from "../../google-weather-icons/components/Partial_Cloudy_Day";
import PartialCloudyNightGoogleIcon from "../../google-weather-icons/components/Partial_Cloudy_Night";
import MostlyCloudyDayGoogleIcon from "../../google-weather-icons/components/Mostly_Cloudy_Day";
import MostlyCloudyNightGoogleIcon from "../../google-weather-icons/components/Mostly_Cloudy_Night";
import CloudyGoogleIcon from "../../google-weather-icons/components/Cloudy";
import FogGoogleIcon from "../../google-weather-icons/components/Fog";
import MistGoogleIcon from "../../google-weather-icons/components/Mist";
import SmokeGoogleIcon from "../../google-weather-icons/components/Smoke";
import WindGoogleIcon from "../../google-weather-icons/components/Wind";
import TornadoGoogleIcon from "../../google-weather-icons/components/Tornado";
import HailGoogleIcon from "../../google-weather-icons/components/Hail";
import IceGoogleIcon from "../../google-weather-icons/components/Icy";
import DiamondDustGoogleIcon from "../../google-weather-icons/components/Diamond_Dust";
import MixOfRainAndSnowGoogleIcon from "../../google-weather-icons/components/Mix_Of_Rain_And_Snow";
import SnowShowersGoogleIcon from "../../google-weather-icons/components/Snow_Showers";
import HeavySnowGoogleIcon from "../../google-weather-icons/components/Heavy_Snow";
import SnowGoogleIcon from "../../google-weather-icons/components/Snow";
import DrizzleAndLightRainGoogleIcon from "../../google-weather-icons/components/Drizzle_Light_Rain";
import FreezingAndHeavyRainGoogleIcon from "../../google-weather-icons/components/Freezing_Heavy_Rain";
import ThunderstormGoogleIcon from "../../google-weather-icons/components/Thunderstorm";
import useImageLink from "./FetchImages";
import useVideoLink from "./FetchVideos";

const getAnimations = (
    timeStamp,
    forecastArr, 
    animationsObj,
    setWeatherAnimations,
    secondSlideData
) => {
    function calculateIfDaytimeOrNighttime() {
        var currentTime = timeStamp.slice(0, 2);
        var sunrise = forecastArr.current[0].sun.sunrise.slice(0, 2);
        var sunset = forecastArr.current[0].sun.sunset.slice(0, 2);
        if(sunset > currentTime) {
            if(sunrise >= currentTime) return false;
            return true;
        } return false;
    };

    function getAnimatedIcons() {
        animationsObj.current = {
            ...animationsObj.current,
            isItDay: calculateIfDaytimeOrNighttime()
        };
        var day = forecastArr.current[0].info.conditions;

        // Clear Day / Night
        if(day.includes('Clear')) {
            if(animationsObj.current.isItDay) {
                animationsObj.current = {
                    ...animationsObj.current,
                    secondSlide: {
                        icon: <ClearDay isCloudy={false} />,
                        background: 'clear',
                        bgClr: 'linear-gradient(to bottom, rgb(17, 183, 248), rgba(16, 119, 160, 1), rgba(13, 59, 77, 1))'
                    },
                    thirdSlide: {
                        background: 'linear-gradient(to bottom, rgb(156, 219, 255), rgb(17, 183, 248), rgb(17, 183, 248), rgba(16, 119, 160, 1), rgba(13, 59, 77, 1))'
                    }
                };
            } else {
                animationsObj.current = {
                    ...animationsObj.current,
                    secondSlide: {
                        icon: <ClearNight />,
                        background: 'clear',
                        bgClr: 'linear-gradient(to bottom, rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                    },
                    thirdSlide: {
                        background: 'linear-gradient(to bottom, rgb(0, 47, 255), rgb(42, 26, 185), rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                    }
                };
            }
        } else if(day.includes('unny') 
            || day.includes('Dust storm')) 
        {
            // Clear Day
            animationsObj.current = {
                ...animationsObj.current,
                secondSlide: {
                    icon: <ClearDay isCloudy={false} />,
                    background: 'clear',
                    bgClr: 'linear-gradient(to bottom, rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                },
                thirdSlide: {
                    background: 'linear-gradient(to bottom, rgb(0, 47, 255), rgb(42, 26, 185), rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                }
            };
        } else if(day.includes('Snow')
            || day.includes('Ice')
            || day.includes('Hail')
            || day.includes('Diamond Dust')) 
        {
            // Snow
            animationsObj.current = {
                ...animationsObj.current,
                secondSlide: {
                    icon: <Snow />,
                    background: 'snow',
                    bgClr: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(149, 157, 168, 0.8), rgba(103, 120, 126, 0.5))' : 'linear-gradient(to top, rgba(7, 7, 7, 0.7), rgba(117, 125, 136, 0.8))'
                },
                thirdSlide: {
                    background: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(12, 125, 163, 0.5), rgba(149, 157, 168, 0.8), rgba(103, 120, 126, 0.5))' : 'linear-gradient(to bottom, rgba(21, 21, 112, 0.9), rgba(3, 3, 116, 0.8), rgba(117, 125, 136, 0.8))'
                }
            };
        } else if(day.includes('Freezing Fog')
            || day.includes('Squalls')
            || day.includes('ind'))
        {
            // Windy
            animationsObj.current = {
                ...animationsObj.current,
                secondSlide: {
                    icon: <Windy />,
                    background: 'windy',
                    bgClr: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(149, 157, 168, 0.8), rgba(15, 17, 17, 0.5))' : 'linear-gradient(to top, rgba(11, 11, 48, 0.8), rgba(16, 8, 90, 0.6))'
                },
                thirdSlide: {
                    background: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(12, 125, 163, 0.5), rgba(149, 157, 168, 0.8), rgba(15, 17, 17, 0.5))' : 'linear-gradient(to bottom, rgba(7, 7, 121, 0.8), rgba(16, 8, 90, 0.6), rgba(16, 8, 90, 0.6), rgba(11, 11, 48, 0.6))'
                }
            };
        } else if(day.includes('Drizzle') 
            || day.includes('Rain')) 
        {
            // Rain
            animationsObj.current = {
                ...animationsObj.current,
                secondSlide: {
                    icon: <Rain />,
                    background: 'rain',
                    bgClr: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(50, 52, 54, 0.8), rgba(23, 23, 24, 0.9))' : 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(3, 11, 53, 1))'
                },
                thirdSlide: {
                    background: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(123, 125, 126, 0.4), rgba(50, 52, 54, 0.8), rgba(23, 23, 24, 0.9))' : 'linear-gradient(to bottom, rgba(2, 1, 26, 0.836), rgba(3, 11, 53, 1), rgba(0, 0, 0, 1))'
                }
            };
        } else if(day.includes('Sky') 
            || day.includes('Partially cloudy')) 
        {
            // Partially Cloudy
            animationsObj.current = {
                ...animationsObj.current,
                secondSlide: {
                    icon: <PartialCloudy isItDay={animationsObj.current.isItDay} />,
                    background: 'partial-cloudy',
                    bgClr: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgb(17, 183, 248), rgba(16, 119, 160, 1), rgba(13, 59, 77, 1))' : 'linear-gradient(to bottom, rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                },
                thirdSlide: {
                    background: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgb(156, 219, 255), rgb(17, 183, 248), rgb(17, 183, 248), rgba(16, 119, 160, 1), rgba(13, 59, 77, 1))' : 'linear-gradient(to bottom, rgb(0, 47, 255), rgb(42, 26, 185), rgb(42, 26, 185), rgba(23, 14, 104, 1))'
                }
            };
        } else if(day.includes('Mist')
            || day.includes('Smoke')
            || day.includes('Haze')
            || day.includes('Overcast')
            || day.includes('Fog')
            || day.includes('loud')
            || day.includes('Tornado')
            || day.includes('Precipitation')
            || day.includes('loudy'))
        {
            // Cloudy
            animationsObj.current = {
                ...animationsObj.current,
                secondSlide: {
                    icon: <Cloudy />,
                    background: 'cloudy',
                    bgClr: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(116, 125, 129, 0.8), rgba(63, 69, 71, 0.8), rgba(6, 8, 8, 0.9))' : 'linear-gradient(to top, rgba(1, 5, 20, 1), rgba(4, 13, 43, 0.9))'
                },
                thirdSlide: {
                    background: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(90, 99, 102, 0.4), rgba(116, 125, 129, 0.8), rgba(63, 69, 71, 0.8), rgba(6, 8, 8, 0.9))' : 'linear-gradient(to bottom, rgba(10, 27, 77, 0.8), rgba(4, 13, 43, 0.9), rgba(1, 5, 20, 1))'
                }
            };
        } else if(day.includes('Thunder')) {

            // Thunderstorm
            animationsObj.current = {
                ...animationsObj.current,
                secondSlide: {
                    icon: <Thunderstorm />,
                    background: 'thunder',
                    bgClr: animationsObj.current.isItDay ? 'linear-gradient(to top, rgba(12, 12, 12, 1), rgba(24, 24, 26, 0.9), rgba(42, 43, 44, 0.9)' : 'linear-gradient(to top, rgba(12, 12, 12, 0.9), rgba(24, 24, 26, 0.8), rgba(0, 0, 0, 0.6))'
                },
                thirdSlide: {
                    background: animationsObj.current.isItDay ? 'linear-gradient(to bottom, rgba(61, 63, 65, 0.8), rgba(42, 43, 44, 0.9), rgba(24, 24, 26, 0.9), rgba(6, 8, 8, 0.9))' : 'linear-gradient(to bottom, rgba(1, 1, 48, 0.9), rgba(20, 20, 68, 0.8), rgba(0, 0, 0, 0.6), rgba(24, 24, 26, 0.8), rgba(12, 12, 12, 0.9))'
                }
            };
        };
        
        setWeatherAnimations(animationsObj.current);
    };

    function getStillIcons(length, day) {
        if (day.info.conditions.includes('Clear')) {
            if(animationsObj.current.isItDay) {
                day.info.iconSmall = <ClearDayGoogleIcon isBig={false} />;
                day.info.iconBig = <ClearDayGoogleIcon isBig={true} />;
            } else {
                day.info.iconSmall = <ClearNightGoogleIcon isBig={false} />;
                day.info.iconBig = <ClearNightGoogleIcon isBig={true} />;
            };
        } else if (day.info.conditions.includes('unny')) {
            day.info.iconSmall = <ClearDayGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <ClearDayGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Dust storm')
            || day.info.conditions.includes('Haze')) {
            day.info.iconSmall = <DustStormGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <DustStormGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Sky')) {
            if(animationsObj.current.isItDay) {
                day.info.iconSmall = <MostlyCloudyDayGoogleIcon isBig={false} />;
                if(length === 15) day.info.iconBig = <MostlyCloudyDayGoogleIcon isBig={true} />;
            } else {
                day.info.iconSmall = <MostlyCloudyNightGoogleIcon isBig={false} />;
                if(length === 15) day.info.iconBig = <MostlyCloudyNightGoogleIcon isBig={true} />;
            };
        }   else if (day.info.conditions.includes('Ice')) {
            day.info.iconSmall = <IceGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <IceGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Hail')) {
            day.info.iconSmall = <HailGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <HailGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Diamond Dust')) {
            day.info.iconSmall = <DiamondDustGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <DiamondDustGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Fog')) {
            day.info.iconSmall = <FogGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <FogGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('ind')) {
            day.info.iconSmall = <WindGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <WindGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Mist')) {
            day.info.iconSmall = <MistGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <MistGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Smoke')) {
            day.info.iconSmall = <SmokeGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <SmokeGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Funnel')
            || day.info.conditions.includes('Tornado')) {
            day.info.iconSmall = <TornadoGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <TornadoGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Cloudy')
            || day.info.conditions.includes('Overcast')
            || day.info.conditions.includes('Precipitation')) {
            day.info.iconSmall= <CloudyGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig= <CloudyGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Rain And Snow')
            || day.info.conditions.includes('Squalls')) {
            day.info.iconSmall = <MixOfRainAndSnowGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <MixOfRainAndSnowGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Blowing')) {
            day.info.iconSmall = <BlizzardGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <BlizzardGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Snow Showers')) {
            day.info.iconSmall = <SnowShowersGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <SnowShowersGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Heavy Snow')) {
            day.info.iconSmall = <HeavySnowGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <HeavySnowGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Snow')) {
            day.info.iconSmall = <SnowGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <SnowGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Drizzle') 
                || day.info.conditions.includes('Light Rain')) {
            day.info.iconSmall = <DrizzleAndLightRainGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <DrizzleAndLightRainGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Rain') 
                || day.info.conditions.includes('Freezing')) {
            day.info.iconSmall = <FreezingAndHeavyRainGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <FreezingAndHeavyRainGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Thunder')) {
            day.info.iconSmall = <ThunderstormGoogleIcon isBig={false} />;
            if(length === 15) day.info.iconBig = <ThunderstormGoogleIcon isBig={true} />;
        } else if (day.info.conditions.includes('Partially cloudy')) {
            if(animationsObj.current.isItDay) {
                day.info.iconSmall = <PartialCloudyDayGoogleIcon isBig={false} />;
                if(length === 15) day.info.iconBig = <PartialCloudyDayGoogleIcon isBig={true} />;
            } else {
                day.info.iconSmall = <PartialCloudyNightGoogleIcon isBig={false} />;
                if(length === 15) day.info.iconBig = <PartialCloudyNightGoogleIcon isBig={true} />;
            };
        };
    }

    function setUpText() {
        if(/\s/g.test(forecastArr.current[0].info.place)) {
            let temp = forecastArr.current[0].info.place.split(' ');
            let counter = 0;
            temp.map((word) => {
                if(word.includes(',')) {
                    counter++;
                    if(counter === 1) {
                        let index = temp.indexOf(word);
                        secondSlideData.current = {
                            ...secondSlideData.current,
                            city: temp.slice(0, (index + 1)).join(' '),
                            country: temp.slice((index + 1), temp.length).join(' ')
                        };
                    };
                };
            });
        } else {
            secondSlideData.current = {
                ...secondSlideData.current,
                city: forecastArr.current[0].info.place,
                country: null
            };
        }
        secondSlideData.current = {
            ...secondSlideData.current,
            conditions: forecastArr.current[0].info.conditions,
            temp: forecastArr.current[0].temperature.current,
            minTemp: forecastArr.current[0].temperature.minTemp,
            maxTemp: forecastArr.current[0].temperature.maxTemp
        };

        // console.log('text:');
        // console.log(secondSlideData.current);
    };

    function setUpStillIcons() {
        forecastArr.current.map((day) => {
            getStillIcons(forecastArr.current.length, day);
            day.hours.map((hour) => {
                getStillIcons(day.hours.length, hour);
            });
        });
    };


    getAnimatedIcons();
    setUpText(); 
    setUpStillIcons(); 
};

const usePreProcessor = (shouldRefetch, selectedPlace, setWeatherAnimations) => {
    const latitude = useRef(null);
    const longitude = useRef(null);
    if (selectedPlace) {
        latitude.current = selectedPlace.geometry.location.lat();
        longitude.current = selectedPlace.geometry.location.lng();
    };
    let { currentWeather, loadingWeatherData, errorWeatherData } = useWeatherData(shouldRefetch, latitude.current, longitude.current);
    let { photoArr, loadingPhotos, errorPhotos } = useImageLink(selectedPlace.place_id);
    let { videoArr, loadingVideos, errorVideos } = useVideoLink(latitude.current, longitude.current);
    const forecastArr = useRef([]);
    const animationsObj = useRef([]);
    const secondSlideData = useRef({});
    const loadingWeatherDataRef = useRef(false);
    const errorFetchingWeatherDataRef = useRef(false);
    const loadingPhotosRef = useRef(false);
    const errorPhotosRef = useRef(false);
    const loadingVideosRef = useRef(false);
    const errorFetchingVideosRef = useRef(false);
    
    useEffect(() => {
        (loadingWeatherData.current) ? loadingWeatherDataRef.current = true : loadingWeatherDataRef.current = false;
        (loadingPhotos.current) ? loadingPhotosRef.current = true : loadingPhotosRef.current = false;
        (loadingVideos.current) ? loadingVideosRef.current = true : loadingVideosRef.current = false;

        (errorWeatherData.current) ? errorFetchingWeatherDataRef.current.message = errorWeatherData.current : errorFetchingWeatherDataRef.current = false;
        (errorPhotos.current) ? errorPhotosRef.current = errorPhotos.current.message : errorPhotosRef.current = false;
        (errorVideos.current) ? errorFetchingVideosRef.current = errorVideos.current.message : errorFetchingVideosRef.current = false;

    }, [loadingWeatherData.current, 
        loadingPhotos.current, 
        loadingVideos.current, 
        errorWeatherData.current, 
        errorPhotos.current, 
        errorVideos.current]
    );

    const findDay = (date) => {
        let temp = new Date(date);
        let temp2;
        if (isToday(temp)) {
            return 'Today';
        } else if (isMonday(temp)) {
            return 'Monday';
        } else if (isTuesday(temp)) {
            return 'Tuesday';
        } else if (isWednesday(temp)) {
            return 'Wednesday';
        } else if (isThursday(temp)) {
            return 'Thursday';
        } else if (isFriday(temp)) {
            return 'Friday';
        } else if (isSaturday(temp)) {
            return 'Saturday';
        } else if (isSunday(temp)) {
            return 'Sunday';
        };
        return temp2;
    };

    useEffect(() => {
        function fillForecastArr() {
            forecastArr.current = [];
            currentWeather.days.map((day) => {
                let counter = 0;
                let tempArr = [];
                day.hours.map((hour) => {
                    tempArr = [
                        ...tempArr,
                        {
                            id: counter,
                            info: { 
                                day: findDay(day.datetime),
                                conditions: hour.conditions,
                                time: hour.datetime,
                                iconSmall: null
                            },

                            temperature: {
                                name: 'Temperature',
                                current: hour.temp,
                                feelsLike: hour.feelslike
                            },

                            uvIndex: {
                                name: 'UV Index',
                                uvIndex: hour.uvindex,
                            },

                            precip: {
                                name: 'Precipitation',
                                fullName: 'Precipitation Probability',
                                prob: hour.precipprob,
                            },

                            wind: {
                                name: 'Wind',
                                speed: hour.windspeed,
                                direction: hour.winddir,
                                visibility: hour.visibility,
                            },

                            airCover: {
                                name: 'Air Cover',
                                humidity: hour.humidity,
                                dew: hour.dew,
                                pressure: hour.pressure,
                                snowDepth: hour.snowdepth ? hour.snowdepth : 0
                            }
                        }
                    ];
                    counter++;
                });
                forecastArr.current = [
                    ...forecastArr.current,
                    {
                        info: {
                            day: findDay(day.datetime),
                            conditions: day.conditions,
                            date: day.datetime,
                            description: day.description,
                            place: selectedPlace.formatted_address,
                            iconSmall: null,
                            iconBig: null,
                        },

                        temperature: {
                            current: day.temp,
                            feelsLike: day.feelslike,
                            maxTemp: day.tempmax,
                            minTemp: day.tempmin
                        },

                        sun: {
                            sunrise: day.sunrise,
                            sunset: day.sunset,
                            uvIndex: day.uvindex,
                            solarRadiation: day.solarradiation
                        },

                        precipitation: {
                            type: day.preciptype ? day.preciptype[0] : day.preciptype,
                            probability: day.precipprob,
                            cloudcover: day.cloudcover,
                            cover: day.precipcover
                        },

                        wind: {
                            speed: day.windspeed,
                            direction: day.winddir,
                            speedIncrease: day.windgust,
                            visibility: day.visibility,
                        },

                        airCover: {
                            humidity: day.humidity,
                            dew: day.dew,
                            pressure: day.pressure,
                            snowDepth: day.snowdepth ? day.snowdepth : 0
                        },

                        hours: tempArr,
                    }
                ];
            });

            // console.log('forecastArr:')
            // console.log(forecastArr)
        };

        if(currentWeather) fillForecastArr();
    }, [selectedPlace.formatted_address, currentWeather]);

    useEffect(() => {
        if(forecastArr.current.length !== 0) 
            getAnimations(
                currentWeather.currentConditions.datetime, 
                forecastArr, 
                animationsObj,
                setWeatherAnimations,
                secondSlideData
            );

    }, [forecastArr, currentWeather]);

    return { 
        forecastArr,  
        photoArr,
        videoArr, 
        secondSlideData, 
        loadingWeatherDataRef,
        errorFetchingWeatherDataRef,
        loadingPhotosRef,
        errorPhotosRef,
        loadingVideosRef,
        errorFetchingVideosRef
    };
};

export default usePreProcessor;