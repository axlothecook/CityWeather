import styles from './Sun.module.css';

const ClearDay = ({ isCloudy }) => {
    return (
        <div className={styles.sun}>
            <div className={styles.sunOrb}></div>
            <div className={isCloudy ? styles.sun_center_partially_cloudy : styles.sun_center_clear_day}></div>
        </div>
    );
};

export default ClearDay;