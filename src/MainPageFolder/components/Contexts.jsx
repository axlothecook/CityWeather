import { createContext } from 'react';

export const WeatherContext = createContext(null);

export const PhotosAndVideosContext = createContext(null);

export const APIKeysContext = createContext({
    VISUAL_CROSSING_API_KEY: import.meta.env.VITE_VISUAL_CROSSING_API_KEY,
    GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
});