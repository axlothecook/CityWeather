import styles from './MainPageStyle.module.css';
import { useState, useRef } from 'react';
import { PhotosAndVideosContext, WeatherContext } from './components/Contexts';
import SlideOne from './components/Slide_One/Slide_One';
import SlideTwo from './components/Slide_Two/Slide_Two';
import SlideThree from './components/Slide_Three/Slide_Three';
import usePreProcessor from './components/Fetching/FetchingPreProcessor';
import SlideFour from './components/Slide_Four/Slide_Four';
// import API_KEY from '../../.env';
//process.env.REACT_APP_GOOGLEMAPS_API_KEY
// const API_KEY = globalThis.GOOGLE_MAPS_API_KEY;

const MainPage = () => {
    const [selectedPlace, setSelectedPlace] = useState(false);
    const [videosArr, setVideosArr] = useState([]);
    const [imagesArr, setImagesArr] = useState([]);
    const [weatherAnimations, setWeatherAnimations] = useState({
        secondSlide: {
            icon: null,
            background: '',
            bgClr: ''
        },
        thirdSlide: {
            background: '',
            animation: null
        }
    });
    const countRef = useRef(0);
    const xCoordRef = useRef(0);
    const yCoordRef = useRef(0);
    const shouldRefetch = useRef(false);

    let { 
        forecastArr, 
        photoArr,
        videoArr, 
        secondSlideData, 
        loadingData,
        errorFetching
    } = usePreProcessor(shouldRefetch, selectedPlace, setWeatherAnimations);

    console.log('forecastArr:')
    console.log(forecastArr)

    return (
        <div className={selectedPlace ? styles.outerWrapper : ''}>
            <div className={selectedPlace ? styles.wrapperSelection : styles.wrapperNoSelection}>
                <WeatherContext value={{ setSelectedPlace, shouldRefetch }}>
                    <SlideOne />
                </WeatherContext>
                {loadingData.current && <h1>loading</h1>}
                {errorFetching.current && <h1>error : {errorFetching.current}</h1>}
                <WeatherContext value={{ forecastArr, weatherAnimations, secondSlideData }}>
                    {selectedPlace && <SlideTwo />}
                    {selectedPlace && <SlideThree />}
                    <PhotosAndVideosContext value={{ photoArr, videoArr }}>
                        {selectedPlace && <SlideFour />}
                    </PhotosAndVideosContext>
                </WeatherContext>
            </div>
        </div>
    )
};

export default MainPage;