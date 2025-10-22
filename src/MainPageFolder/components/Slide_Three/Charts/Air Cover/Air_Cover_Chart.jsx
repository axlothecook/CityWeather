import styles from './Air_Cover.module.css';

const AirCoverChart = () => {
    return (
        <div className={styles.chart_wrapper}>
            <h1>Air Cover</h1>
            <div className={styles.chart}>
                chart
            </div>
            <div className={styles.chart_buttons}>
                <button>Humidity</button>
                <button>Dew</button>
                <button>Pressure</button>
                <button>Snow Depth</button>
            </div>
        </div>
    );
};

export default AirCoverChart;