import styles from './MainPageStyle.module.css';
import { useState, useRef } from 'react';
import { PhotosAndVideosContext, WeatherContext } from './components/Contexts';
import SlideOne from './components/Slide_One/Slide_One';
import SlideTwo from './components/Slide_Two/Slide_Two';
import SlideThree from './components/Slide_Three/Slide_Three';
import usePreProcessor from './components/Fetching/FetchingPreProcessor';
import SlideFour from './components/Slide_Four/Slide_Four';
import BlobComponent from './components/Blob/Blob';
import MessageComponent from './components/Loading and Error/Message';

const MainPage = () => {
    const [selectedPlace, setSelectedPlace] = useState(false);
    const [templatePlace, setTemplatePlace] = useState(null);
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
    const shouldRefetch = useRef(false);
    const indicatorRef = useRef(false);

    let { 
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
    } = usePreProcessor(shouldRefetch, selectedPlace, setWeatherAnimations);

    return (
        <div className={selectedPlace ? styles.outerWrapper : ''}>
            <div className={selectedPlace ? styles.wrapperSelection : styles.wrapperNoSelection}>
                <BlobComponent selectedPlace={selectedPlace} indicatorRef={indicatorRef} />
                <WeatherContext value={{ templatePlace, setTemplatePlace, indicatorRef, setSelectedPlace, shouldRefetch }}>
                    <SlideOne />
                </WeatherContext>
                {(loadingWeatherDataRef.current || errorFetchingWeatherDataRef.current) && 
                    <MessageComponent 
                        loading={loadingWeatherDataRef.current} 
                        error={errorFetchingWeatherDataRef.current} 
                    />
                }
                <WeatherContext value={{ indicatorRef, setSelectedPlace, shouldRefetch, forecastArr, weatherAnimations, secondSlideData }}>
                    {forecastArr.current.length !== 0 && <SlideTwo />}
                    {forecastArr.current.length !== 0 && <SlideThree />}
                    <PhotosAndVideosContext 
                        value={{ 
                            photoArr, 
                            videoArr, 
                            loadingPhotosRef, 
                            errorPhotosRef, 
                            loadingVideosRef, 
                            errorFetchingVideosRef 
                        }}>
                        {forecastArr.current.length !== 0 && <SlideFour />}
                    </PhotosAndVideosContext>
                </WeatherContext>
            </div>
        </div>
    )
};

export default MainPage;