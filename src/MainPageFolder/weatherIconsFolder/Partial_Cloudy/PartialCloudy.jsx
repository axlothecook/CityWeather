import styles from './Partial_Cloudy.module.css';
import ClearDay from '../Clear_Day/ClearDay';
import ClearNight from '../Clear_Night/ClearNight';

const PartialCloudy= ({ isDay }) => {
    return (
        <div className={styles.partial_cloudy}>
            {isDay ? <ClearDay /> : <ClearNight />}
            <div className={isDay ? styles.partial_cloudy_cloud_day : styles.partial_cloudy_cloud_night}></div>
        </div>
    )
};

export default PartialCloudy;