import styles from './Fully_Cloudy.module.css';

const Cloudy = () => {
    return (
        <div className={styles.cloud_big}>
            <div className={styles.cloud_small_bottom_left}></div>
            <div className={styles.cloud_small_top_right}></div>
        </div>
    )
};

export default Cloudy;