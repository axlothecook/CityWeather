import { Line } from "react-chartjs-2";
import styles from './Chart.module.css';

const ChartComponent = ({ chartData, onClick, name, subSelectedItem, itemArr }) => {
    return (
        <div className={chartData.name === 'Temperature' ? styles.wrapper_temp : styles.wrapper_general}>
            <div className={ chartData.name === 'Temperature' ? styles.temp_chart : styles.general_chart}>
                {(name !== 'UV Index' && subSelectedItem !== 'Snow Depth') && 
                <Line
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: false
                            },
                            legend: {
                                display: false,
                            },
                            datalabels: {
                                clamp: true,
                                color: 'black',
                                align: 'top',
                                font: {
                                    size: 15
                                },
                                display: 'auto'
                            },
                        },
                        layout: {
                            padding: {
                                top: 40,
                                left: 30,
                                right: 30
                            }
                        },
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                beginAtZero: chartData.beginAtZero,
                                display: false,
                            }
                        },
                    }}
                />}

                {(name === 'UV Index' || subSelectedItem === 'Snow Depth') &&
                <Line
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: false
                            },
                            legend: {
                                display: false,
                            },
                            datalabels: {
                                clamp: true,
                                color: 'black',
                                align: 'top',
                                font: {
                                    size: 15
                                },
                                display: 'auto'
                            },
                        },
                        layout: {
                            padding: {
                                top: 40,
                                left: 30,
                                right: 30
                            }
                        },
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                beginAtZero: chartData.beginAtZero,
                                display: false,
                            }
                        },
                    }}
                />}
            </div>

            {(name === 'Air Cover' || name === 'Wind') && 
                <div className={styles.buttons}>
                    {itemArr && itemArr.map((item) => (
                        <button  
                            key={item}
                            style={{backgroundColor: (subSelectedItem === item) ? '#f8f9fa' : ''}} 
                            onClick={() => onClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            }                        
        </div>
    );
};

export default ChartComponent;