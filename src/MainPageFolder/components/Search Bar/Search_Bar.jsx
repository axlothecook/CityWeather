import { useContext } from 'react';
import styles from './Search_Bar.module.css';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { APIKeysContext, WeatherContext } from '../Contexts';

const SearchBar = ({ switchTab }) => {
    const { GOOGLE_API_KEY } = useContext(APIKeysContext);
    const { setSelectedPlace, shouldRefetch, indicatorRef } = useContext(WeatherContext);

    function onSubmit(place) {
        setSelectedPlace(place);
        shouldRefetch.current = true;
        document.querySelector('#input').value = '';
        if(switchTab) {
            setTimeout(switchTab, 2000);
            indicatorRef.current = true;
        } else indicatorRef.current = false;
    };

    return (
        <ReactGoogleAutocomplete
            className={styles.input} 
            apiKey={GOOGLE_API_KEY}
            id='input'
            onPlaceSelected={(place) => onSubmit(place)}
            options={{
                types: ["(cities)"]
            }}
        />
    )
};


export default SearchBar;