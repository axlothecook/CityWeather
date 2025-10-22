import styles from './Wind.module.css';

const WindChart = () => {
    return (
        <div className={styles.chart_wrapper}>
            <h1>Wind</h1>
            <div className={styles.chart}>
                chart
            </div>
            <div className={styles.chart_buttons}>
                <button>Speed</button>
                <button>Direction</button>
                <button>Visibility</button>
            </div>
        </div>
    );
};

export default WindChart;