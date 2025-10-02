import styles from './Rain.module.css';
import RainDroplets from './Rain_Droplets';

const Rain = () => {
    return (
        <div className={styles.rain}>
            <div className={styles.rain_cloud}></div>
            <div className={styles.rain_cloud_edition}></div>
            <RainDroplets />
        </div>
    )
};

export default Rain;