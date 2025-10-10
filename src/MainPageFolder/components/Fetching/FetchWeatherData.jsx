import { useState, useRef, useEffect, useContext } from 'react';
import { APIKeysContext } from '../Contexts';

const useWeatherData = (shouldRefetch, selectedPlace) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    let loading = useRef(true);
    let error = useRef(null);
    const { VISUAL_CROSSING_API_KEY } = useContext(APIKeysContext);
    let latitude;
    let longitude;
    if (selectedPlace) {
        latitude = selectedPlace.geometry.location.lat();
        longitude = selectedPlace.geometry.location.lng();
    };

    useEffect(() => {
        const fetchData = async() => {
            shouldRefetch.current = false;
            try {
                fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${VISUAL_CROSSING_API_KEY}&unitGroup=metric`, {mode: 'cors'})
                .then((response) => response.json())
                .then((response) => {
                    setCurrentWeather(response);
                })
                .catch((e) => console.log(`Fetch Weather Data Error: ${e}`));
            } catch (err) {
                setCurrentWeather(null);
                error.current = err;
            } finally {
                loading.current = false;
            }
        };

        if(shouldRefetch.current) fetchData();
        
    }, [selectedPlace]);

    return { currentWeather, loading, error };
};

export default useWeatherData;