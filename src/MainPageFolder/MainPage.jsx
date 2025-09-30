import styles from './MainPageStyle.module.css';
import { useState, useRef, useEffect } from 'react';
import ReactGoogleAutocomplete from "react-google-autocomplete";
// import API_KEY from '../../.env';
//process.env.REACT_APP_GOOGLEMAPS_API_KEY
// const API_KEY = globalThis.GOOGLE_MAPS_API_KEY;
const API_KEY = 'AIzaSyBnxOTyLUp6dwVolwpt7T_ll3yEMKWDjXo';

const MainPage = () => {
    const [currentWeatherData, setCurrentWeatherData] = useState();
    const [dailyForecastData, setDailyForecastData] = useState();
    const [hourlyForecastData, setHourlyForecastData] = useState();
    const [videosArr, setVideosArr] = useState([]);
    const [imagesArr, setImagesArr] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(false);
    let countRef = useRef(0);

    function fetchWeatherData(latitute, longitute) {
        fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}&location.latitude=${latitute}&location.longitude=${longitute}`)
        .then((response) => response.json())
        .then((response) => {
            console.log('current weather:');
            console.log(response);
            // setCurrentWeatherData(response);
        })
        .catch((e) => console.log(`Fetch WEather Data Error: ${e}`));

        fetch(`https://weather.googleapis.com/v1/forecast/days:lookup?key=${API_KEY}&location.latitude=${latitute}&location.longitude=${longitute}`)
        .then((response) => response.json())
        .then((response) => {
            console.log('daily forecast:');
            console.log(response);
            // setDailyForecastData(response);
            // if(response.nextPageToken) {
            //     let temp = response.nextPageToken;
            //     fetch(`https://weather.googleapis.com/v1/forecast/days:lookup?key=${API_KEY}&location.latitude=${latitute}&location.longitude=${longitute}&pageToken=${temp}`)
            //     .then((response) => response.json())
            //     .then((response) => {
            //         console.log('response 2:');
            //         console.log(response);
            //     })
            //     .catch((e) => console.log(`Fetch Weather Data Error2: ${e}`));
            // };
        })
        .catch((e) => console.log(`Fetch WEather Data Error: ${e}`));

        fetch(`https://weather.googleapis.com/v1/forecast/hours:lookup?key=${API_KEY}&location.latitude=${latitute}&location.longitude=${longitute}&hours=168&pageSize=24`)
        .then((response) => response.json())
        .then((response) => {
            console.log('hourly forecast:');
            console.log(response);
            // setHourlyForecastData(response);
            // if(response.nextPageToken) {
            //     let temp = response.nextPageToken;
            //     fetch(`https://weather.googleapis.com/v1/forecast/hours:lookup?key=${API_KEY}&location.latitude=${latitute}&location.longitude=${longitute}&hours=168&pageSize=24&pageToken=${temp}`)
            //     .then((response) => response.json())
            //     .then((response) => {
            //         console.log('response 2:');
            //         console.log(response);
            //     })
            //     .catch((e) => console.log(`Fetch Weather Data Error2: ${e}`));
            // };
        })
        .catch((e) => console.log(`Fetch Weather Data Error1: ${e}`));
    };

    function fetchImages(placeId) {
        fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": "AIzaSyBnxOTyLUp6dwVolwpt7T_ll3yEMKWDjXo",
                "X-Goog-Fieldmask": "id,displayName,photos"
            }
        })
        .then((reponse) => reponse.json())
        .then((response) => {
            let tempArr = [];
            let counter = 0;
            response.photos.map((photo) => {
                tempArr.push({
                    id: counter,
                    link: `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400&key=${API_KEY}`,
                });
                counter++;
            });
            setImagesArr([...tempArr]);
        })
        .catch((e) => console.log(`Fetch Images Data Error: ${e}`));
    };

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

    return (
        <div className={selectedPlace ? styles.outerWrapper : ''}>
            <div className={selectedPlace ? styles.wrapperSelection : styles.wrapperNoSelection}>
                <div className={styles.slideOne}>
                    <div className={styles.divWithSearchBar}>
                        <h1>Search anywhere</h1>
                        <ReactGoogleAutocomplete
                            className={styles.input} 
                            apiKey={API_KEY}
                            style={{ width: "90%" }}
                            onPlaceSelected={(place) => {
                                setSelectedPlace(true);
                                fetchWeatherData(place.geometry.location.lat(), place.geometry.location.lng());
                                // fetchVideos(place.geometry.location.lat(), place.geometry.location.lng());
                                // fetchImages(place.place_id);
                            }}
                            options={{
                                types: ["(cities)"]
                            }}
                        />
                    </div>
                    <div className={styles.blobParent}>
                        <div className={styles.blob}></div>
                    </div>
                </div>
                {selectedPlace && <div className={styles.slideTwo}></div>}
                {selectedPlace && <div className={styles.slideThree}></div>}
                {selectedPlace && <div className={styles.slideFour}></div>}
            </div>
        </div>
    )
};

export default MainPage;