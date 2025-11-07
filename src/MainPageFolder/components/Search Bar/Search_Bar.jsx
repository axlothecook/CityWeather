import { useContext, useEffect, useState } from 'react';
import styles from './Search_Bar.module.css';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { APIKeysContext, WeatherContext } from '../Contexts';

const SearchBar = ({ switchTab }) => {
    const { GOOGLE_API_KEY } = useContext(APIKeysContext);
    const { templatePlace, setSelectedPlace, shouldRefetch, indicatorRef } = useContext(WeatherContext);
    const [input, setInput] = useState('');

    function onSubmit(place) {
        setSelectedPlace(place);
        shouldRefetch.current = true;
        document.querySelector('#input').value = '';
        if(switchTab) {
            setTimeout(switchTab, 1000);
            indicatorRef.current = true;
        } else indicatorRef.current = false;
    };

    useEffect(() => {
        if(templatePlace) setInput(templatePlace);
    }, [templatePlace]);

    return (
        <ReactGoogleAutocomplete
            className={styles.input} 
            apiKey={GOOGLE_API_KEY}
            id='input'
            value={input}
            onChange={e => setInput(e.target.value)}
            onPlaceSelected={place => {
                onSubmit(place);
                setInput(undefined);
            }}
            options={{
                types: ["(cities)"]
            }}
        />
    );
};


export default SearchBar;