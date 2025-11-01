import { useState, useRef, useEffect, useContext } from 'react';
import { APIKeysContext } from '../Contexts';

const useWeatherData = (shouldRefetch, latitude, longitude) => {
    const { VISUAL_CROSSING_API_KEY } = useContext(APIKeysContext);
    const [currentWeather, setCurrentWeather] = useState(null);
    const loadingWeatherData = useRef(false);
    const errorWeatherData = useRef(null);

    useEffect(() => {
        const fetchData = async() => {
            shouldRefetch.current = false;
            try {
                loadingWeatherData.current = true;
                fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${VISUAL_CROSSING_API_KEY}&unitGroup=metric`, {mode: 'cors'})
                .then((response) => response.json())
                .then((response) => {
                    setCurrentWeather(response);
                })
                .catch((e) => {
                    console.log(`Fetch Weather Data Error: ${e}`);
                    errorWeatherData.current = e;
                });
            } catch (err) {
                setCurrentWeather(null);
                errorWeatherData.current = err;
            } finally {
                loadingWeatherData.current = false;
            };
        };

        if(shouldRefetch.current) fetchData();
        
    }, [latitude, longitude, shouldRefetch]);

    return { currentWeather, loadingWeatherData, errorWeatherData };
};

export default useWeatherData;