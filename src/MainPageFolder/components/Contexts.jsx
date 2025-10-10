import { createContext } from 'react';

export const WeatherContext = createContext(null);

export const APIKeysContext = createContext({
    VISUAL_CROSSING_API_KEY: 'EGYDHJSZBZVFZUKTEY664TM36',
    GOOGLE_API_KEY: 'AIzaSyBnxOTyLUp6dwVolwpt7T_ll3yEMKWDjXo',
});