import { useEffect, useRef, useState } from 'react';
import styles from './Charts.module.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartComponent from './Chart';
import Select from 'react-select'
import { motion } from 'framer-motion';
Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

const ChartsWrapper = ({ selectedDay, date }) => {
    const label = useRef('');
    const dataArr = useRef([]);
    const color = useRef('');
    const [selectedItem, setSelectedItem] = useState('Precipitation Probability');
    const [subSelectedItem, setSubSelectedItem] = useState('Humidity');
    const [tempChartData, setTempChartData] = useState({
        labels: selectedDay.hours.map((hour) => hour.info.time), 
        datasets: [
            {
                label: 'Current Temperature in °C',
                data: selectedDay.hours.map((hour) => hour.temperature.current),
                backgroundColor: ['gold'],
                borderColor: 'gold',
                borderWidth: 3
            },
            {
                label: 'Feels Like Temperature in °C',
                data: selectedDay.hours.map((hour) => hour.temperature.feelsLike),
                backgroundColor: ['rgba(0, 0, 255, 0.22)'],
                borderColor: 'rgba(0, 0, 255, 0.22)',
                borderWidth: 2,
                borderDash: [10, 5]
            },
        ],
        name: selectedDay.hours[0].temperature.name,
        beginAtZero: true
    });
    const [generalChartData, setGeneralChartData] = useState({
        labels: selectedDay.hours.map((hour) => hour.info.time), 
        datasets: [
            {
                label: 'Precipitation Probability in %',
                data: selectedDay.hours.map((hour) => hour.precip.prob),
                backgroundColor: ['blue'],
                borderColor: 'blue',
                borderWidth: 3
            },
        ],

    });
    const [open, setOpen] = useState(false);
    const itemArr = useRef(null);
    const weatherOptions = [
        { value: 'Air Cover', label: 'Air Cover' },
        { value: 'Precipitation Probability', label: 'Precipitation' },
        { value: 'UV Index', label: 'UV Index' },
        { value: 'Wind', label: 'Wind' }
    ];

    const selectStyles = (open) => ({
        dropdownIndicator: (base) => ({
            ...base,
            transition: 'all .2s ease',
            transform: open ? 'rotate(180deg)' : null
        }),
        control: () => ({
            display: 'flex',
            border: '1px solid #dfdfdf',
            borderRadius: '5px',
            boxShadow: 'none',
            cursor: 'pointer'
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? '#ccc' : state.isSelected ? '#a7a7a7ff' : '#eee',
            color: '#000',
            cursor: 'pointer',
        }),
        menu: (provided) => ({
            ...provided,
            marginTop: 0,
            borderwidth: 10,
            height: open ? "9.2rem" : "0",
            backgroundColor: '#eee',
            overflow: "hidden",
            opacity: open ? 1 : 0,
            transition: "all .4s ease-in-out",
            visibility: open ? "visible" : "hidden"
        })
    });

    useEffect(() => {
        function updateTemperature () {
            setTempChartData({
                    labels: selectedDay.hours.map((hour) => hour.info.time), 
                    datasets: [
                        {
                            label: 'Current Temperature in °C',
                            data: selectedDay.hours.map((hour) => hour.temperature.current),
                            backgroundColor: ['gold'],
                            borderColor: 'gold',
                            borderWidth: 3,
                        },
                        {
                            label: 'Feels Like Temperature in °C',
                            data: selectedDay.hours.map((hour) => hour.temperature.feelsLike),
                            backgroundColor: ['rgba(0, 0, 255, 0.22)'],
                            borderColor: 'rgba(0,0,255, 0.22)',
                            borderWidth: 2,
                            borderDash: [10, 5]
                        },
                    ],
                name: selectedDay.hours[0].temperature.name,
                beginAtZero: true
            });
        };

        updateTemperature();
    }, [selectedDay]);

    useEffect(() => {
        function updateIndividualGraphs () {
            if (subSelectedItem === 'Dew') {
                label.current = 'Dew Point in °C';
                dataArr.current = selectedDay.hours.map((hour) => hour.airCover.dew);
                color.current = '#845E99';
            } else if (subSelectedItem === 'Humidity') {
                label.current = 'Humidity in %';
                dataArr.current = selectedDay.hours.map((hour) => hour.airCover.humidity);
                color.current = '#2878B6';
            } else if (subSelectedItem === 'Air Pressure') {
                label.current = 'Air Pressure in hPa';
                dataArr.current = selectedDay.hours.map((hour) => hour.airCover.pressure);
                color.current = '#2878B6';
            } else if (subSelectedItem === 'Snow Depth') {
                label.current = 'Snow Depth in meters';
                dataArr.current = selectedDay.hours.map((hour) => hour.airCover.snowDepth);
                color.current = '#101E28';
            } else if (subSelectedItem === 'Wind Direction') {
                label.current = 'Wind Direction in degrees °';
                dataArr.current = selectedDay.hours.map((hour) => hour.wind.direction);
                color.current = '#9B1111';
            } else if (subSelectedItem === 'Wind Speed') {
                label.current = 'Wind Speed in km/h';
                dataArr.current = selectedDay.hours.map((hour) => hour.wind.speed);
                color.current = '#249292';
            } else if (subSelectedItem === 'Visibility') {
                label.current = 'Visibility in km';
                dataArr.current = selectedDay.hours.map((hour) => hour.wind.visibility);
                color.current = '#007C7C';
            };

            setGeneralChartData({
                labels: selectedDay.hours.map((hour) => hour.info.time), 
                datasets: [
                    {
                        label: label.current,
                        data: dataArr.current,
                        backgroundColor: [color.current],
                        borderColor: color.current,
                        borderWidth: 3,
                        stepped: (selectedItem === 'Snow Depth') ? 'middle' : false,
                    }
                ],
                beginAtZero: false,
            });
        };

        updateIndividualGraphs();
        
    }, [subSelectedItem]);

    useEffect(() => {
        function updateGeneralChartData () {
            if (selectedItem === 'Precipitation Probability') {
                label.current = 'Precipitation Probability in %';
                dataArr.current = selectedDay.hours.map((hour) => hour.precip.prob);
                color.current = 'blue';
                itemArr.current = null;
            } else if (selectedItem === 'Air Cover') {
                label.current = 'Humidity in %';
                dataArr.current = selectedDay.hours.map((hour) => hour.airCover.humidity);
                color.current = '#2878B6';
                itemArr.current = ['Humidity', 'Dew', 'Air Pressure', 'Snow Depth'];
                setSubSelectedItem('Humidity');
            } else if (selectedItem === 'UV Index') {
                label.current = 'UV Index in scale of 1 - 11+';
                dataArr.current = selectedDay.hours.map((hour) => hour.uvIndex.uvIndex);
                color.current = '#DD4D4D';
                itemArr.current = null;
            } else if (selectedItem === 'Wind') {
                label.current = 'Wind Direction in degrees °';
                dataArr.current = selectedDay.hours.map((hour) => hour.wind.direction);
                color.current = '#9B1111';
                itemArr.current = ['Wind Direction', 'Wind Speed', 'Visibility'];
                setSubSelectedItem('Wind Direction');
            };

            setGeneralChartData({
                labels: selectedDay.hours.map((hour) => hour.info.time), 
                datasets: [
                    {
                        label: label.current,
                        data: dataArr.current,
                        backgroundColor: [color.current],
                        borderColor: color.current,
                        borderWidth: 3,
                        stepped: (selectedItem === 'UV Index') ? 'middle' : false
                    }
                ],
                beginAtZero: false,
            });
        };

        updateGeneralChartData();
        
    }, [selectedDay, selectedItem]);

    return (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }} 
        className={styles.charts_wrapper}>
            <h1>{date}</h1>
            <div className={styles.main_chart_wrapper}>
                <h2>Temperature</h2>
                <ChartComponent chartData={tempChartData} />
            </div>
            <div className={styles.rest_of_charts_wrapper}>
                <div className={styles.selection_wrapper}>
                    <div onClick={() => setOpen(!open)}>
                        <Select 
                        options={weatherOptions}
                        placeholder='Select'
                        defaultValue={weatherOptions[1]} 
                        isClearable={true}
                        isSearchable={null}
                        className={styles.select} 
                        onChange={e => {
                            if(e) setSelectedItem(e.value);
                        }}
                        styles={selectStyles(open)}
                        onBlur={() => setOpen(false)}
                        menuIsOpen
                        />
                    </div>
                    <h2>{selectedItem}</h2>
                </div>
                <ChartComponent 
                    chartData={generalChartData} 
                    onClick={(word) => setSubSelectedItem(word)} 
                    name={selectedItem} 
                    subSelectedItem={subSelectedItem} 
                    itemArr={itemArr.current} 
                />
            </div>
        </motion.div>
    );
};

export default ChartsWrapper;