import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../Contexts";
import styles from '../Body/Container.module.css';
import Card from "./Weather_Card";
import InfoCard from "./Info_Card";
import TemperatureIcon from "../icons/components/Temperature";
import WindRedIcon from '../icons/components/WindRed';
import PrecipitationIcon from '../icons/components/Precip';
import SunIcon from '../icons/components/Sun';
import AirCoverIcon from '../icons/components/Air_Cover';

const CardManager = ({ selectedDay }) => {
    const { forecastArr, secondSlideData } = useContext(WeatherContext);
    const [data, setData] = useState([]);
    useEffect(() => {
        function setUpForecastDataArray() {
            if(!hourlyForecast && forecastArr.current) 
            setData([
                {
                    id: 0,
                    topLeft: {
                        back: 'Feels Like',
                        front: selectedDay.temperature.feelsLike,
                    },
                    topRight: {
                        back: 'Currently',
                        front: selectedDay.temperature.current,
                    },
                    mainIcon: <TemperatureIcon />,
                    bottomLeft: {
                        back: 'Maximum',
                        front: selectedDay.temperature.maxTemp,
                    },
                    bottomRight: {
                        back: 'Minimum',
                        front: selectedDay.temperature.minTemp
                    },
                },
                {
                    id: 1,
                    topLeft: {
                        back: 'Falling Type',
                        front: selectedDay.precipitation.type ? selectedDay.precipitation.type : 'None'
                    },
                    topRight: {
                        back: 'Cloud Cover',
                        front: selectedDay.precipitation.cloudcover
                    },
                    mainIcon: <PrecipitationIcon /> ,
                    bottomLeft: {
                        back: 'Cover',
                        front: selectedDay.precipitation.cover
                    },
                    bottomRight: {
                        back: 'Probability',
                        front: selectedDay.precipitation.probability
                    },
                },
                {
                    id: 2,
                    topLeft: {
                        back: 'Sunrise',
                        front: selectedDay.sun.sunrise
                    },
                    mainIcon: <SunIcon />,
                    topRight: {
                        back: 'Sunset',
                        front: selectedDay.sun.sunset
                    },
                    bottomLeft: {
                        back: 'UV Index',
                        front: selectedDay.sun.uvIndex
                    },
                    bottomRight: {
                        back: 'Solar Radiation',
                        front: selectedDay.sun.solarRadiation
                    },
                },
                {
                    id: 3,
                    topLeft: {
                        back: 'Direction',
                        front: selectedDay.wind.direction
                    },
                    topRight: {
                        back: 'Speed',
                        front: selectedDay.wind.speed
                    },
                    mainIcon: <WindRedIcon /> ,
                    bottomLeft: {
                        back: 'Speed Increase',
                        front: selectedDay.wind.speedIncrease
                    },
                    bottomRight: {
                        back: 'Visibility',
                        front: selectedDay.wind.visibility
                    },
                },
                {
                    id: 4,
                    topLeft: {
                        back: 'Humidity',
                        front: selectedDay.airCover.humidity
                    },
                    topRight: {
                        back: 'Athmospheric Pressure',
                        front: selectedDay.airCover.pressure
                    },
                    mainIcon: <AirCoverIcon />,
                    bottomLeft: {
                        back: 'Dew',
                        front: selectedDay.airCover.dew
                    },
                    bottomRight: {
                        back: 'Snow Depth',
                        front: selectedDay.airCover.snowDepth
                    },
                },
            ]);
        };

        if(selectedDay) setUpForecastDataArray();

    }, [selectedDay]);
    
    return (
        <div className={styles.cards_container}>
            <InfoCard 
                info={selectedDay.info} 
                temp={selectedDay.temperature} 
                city={secondSlideData.current.city} 
                country={secondSlideData.current.country} 
            />
            {data.map((item) => (
                <Card data={item} key={item.id} />
            ))}
        </div>
    );
};

export default CardManager;