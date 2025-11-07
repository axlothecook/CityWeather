import RainDroplets from '../Rain/Rain_Droplets';
import styles from './Thunderstorm.module.css';

const Thunderstorm = () => {
    return (
        <div className={styles.thunderstorm}>
            <div className={styles.thunder_cloud}></div>
            <div className={styles.thunder_cloud_edition}></div>
            <RainDroplets />
            <div className={styles.thunderboltContainer_first}>
                <div className={styles.thunderbolt}></div>
            </div>

            <div className={styles.thunderboltContainer_second}>
                <div className={styles.thunderbolt}></div>
            </div>
        </div>
    );
};

export default Thunderstorm;