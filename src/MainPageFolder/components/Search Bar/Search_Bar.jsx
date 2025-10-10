import { useContext, useState } from 'react';
import styles from './Search_Bar.module.css';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { APIKeysContext, WeatherContext } from '../Contexts';

const SearchBar = ({ switchTab }) => {
    const { GOOGLE_API_KEY } = useContext(APIKeysContext);
    const { setSelectedPlace, shouldRefetch } = useContext(WeatherContext);

    return (
        <ReactGoogleAutocomplete
            className={styles.input} 
            apiKey={GOOGLE_API_KEY}
            onPlaceSelected={(place) => {
                setSelectedPlace(place);
                shouldRefetch.current = true;
                if(switchTab) setTimeout(switchTab, 1000);

                // fetchVideos(place.geometry.location.lat(), place.geometry.location.lng());
                // fetchImages(place.place_id);
            }}
            options={{
                types: ["(cities)"]
            }}
        />
    )
};


export default SearchBar;