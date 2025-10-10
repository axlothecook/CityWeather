import styles from './MainPageStyle.module.css';
import { useState, useRef } from 'react';
import { WeatherContext } from './components/Contexts';
import useWeatherData from './components/Fetching/FetchWeatherData';
import SlideOne from './components/Slide_One/Slide_One';
import SlideTwo from './components/Slide_Two/Slide_Two';
import SlideThree from './components/Slide_Three/Slide_Three';
// import API_KEY from '../../.env';
//process.env.REACT_APP_GOOGLEMAPS_API_KEY
// const API_KEY = globalThis.GOOGLE_MAPS_API_KEY;

const MainPage = () => {
    const [selectedPlace, setSelectedPlace] = useState(false);
    const [dailyForecastData, setDailyForecastData] = useState();
    const [hourlyForecastData, setHourlyForecastData] = useState();
    const [videosArr, setVideosArr] = useState([]);
    const [imagesArr, setImagesArr] = useState([]);
    let countRef = useRef(0);
    let xCoordRef = useRef(0);
    let yCoordRef = useRef(0);
    let shouldRefetch = useRef(false);
    let { currentWeather, loading, error } = useWeatherData(shouldRefetch, selectedPlace);

    // console.log('currentWeather in main:');
    // console.log(currentWeather);
    // console.log(loading);
    // console.log(error);


    function fetchVideos(latitute, longitute) {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${latitute}%2C${longitute}&locationRadius=30mi&q=walking%20tour&type=video&videoDuration=long&key=${API_KEY}`)
        .then((reponse) => reponse.json())
        .then((response) => {
            setVideosArr([
                ...response.items
            ]);
        })
        .catch((e) => console.log(`Fetch Videos Data Error: ${e}`));
    };

    function setBlob() {
        var element = document.querySelector('#blobParent');
        if(element) {
            var position = element.getBoundingClientRect();
            console.log(position)
            xCoordRef.current = position.x;
            yCoordRef.current = position.y;
            element.style.position = 'fixed';
            element.style.zIndex = '5';
            element.style.transformOrigin = '300px 300px';
            element.style.left = position.x + 'px';
            element.style.top = position.y + 'px';
        };
    };

    {/* <div className={selectedPlace ? styles.blobParentTransition : styles.blobParentNoTransition} id='blobParent'>
                        <div className={selectedPlace ? styles.blobTransition : styles.blobNoTransition}></div>
                    </div> */}

    return (
        <div className={selectedPlace ? styles.outerWrapper : ''}>
            <div className={selectedPlace ? styles.wrapperSelection : styles.wrapperNoSelection}>
                <WeatherContext value={{ setSelectedPlace, shouldRefetch }}>
                    <SlideOne />
                </WeatherContext>
                {/* {loading && <h1>loading</h1>}
                {error && <h1>error</h1>} */}
                <WeatherContext value={{ currentWeather, selectedPlace }}>
                    {selectedPlace && <SlideTwo />}
                    {selectedPlace && <SlideThree />}
                </WeatherContext>
                {selectedPlace && <div className={styles.slideFour}></div>}
            </div>
        </div>
    )
};

export default MainPage;