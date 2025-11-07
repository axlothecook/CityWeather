import styles from './Partial_Cloudy.module.css';
import ClearDay from '../Clear_Day/ClearDay';
import ClearNight from '../Clear_Night/ClearNight';

const PartialCloudy= ({ isItDay }) => {
    return (
        <div className={styles.partial_cloudy}>
            {isItDay ? <ClearDay isCloudy={true} /> : <ClearNight />}
            <div className={isItDay ? styles.partial_cloudy_cloud_day : styles.partial_cloudy_cloud_night}></div>
        </div>
    );
};

export default PartialCloudy;