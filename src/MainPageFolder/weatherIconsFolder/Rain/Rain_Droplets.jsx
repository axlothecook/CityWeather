import styles from './Rain_Droplets.module.css';

const RainDroplets = () => {
    return (
        <div className={styles.raindrop_wrapper}>
            <div className={styles.first_raindrop_parent}>
                <div className={styles.first_raindrop}></div>
            </div>

            <div className={styles.second_raindrop_parent}>
                <div className={styles.second_raindrop}></div>
            </div>

            <div className={styles.third_raindrop_parent}>
                <div className={styles.third_raindrop}></div>
            </div>

            <div className={styles.fourth_raindrop_parent}>
                <div className={styles.fourth_raindrop}></div>
            </div>
        </div>
    )
};

export default RainDroplets;