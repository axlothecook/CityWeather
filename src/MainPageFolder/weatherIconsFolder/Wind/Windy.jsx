import styles from './Windy.module.css';

const Windy = () => {
    return (
        <div className={styles.wind_container}>
            <div className={styles.small_windy_cloud}></div>
            <div className={styles.top_wind_bar}>
                <div className={styles.top_wind_bar_branchoff_finisher}></div>
                <div className={styles.top_wind_bar_branchoff_curve}></div>
            </div>
            <div className={styles.middle_wind_bar}>
                <div className={styles.middle_wind_bar_branchoff_finisher}></div>
                <div className={styles.middle_wind_bar_branchoff_curve}></div>
            </div>
            <div className={styles.bottom_wind_bar}>
                <div className={styles.bottom_wind_bar_branchoff_finisher}></div>
                <div className={styles.bottom_wind_bar_branchoff_curve}></div>
            </div>
        </div>
    );
};

export default Windy;