import styles from './Rain_Droplets.module.css';

const RainDroplets = () => {
    return (
        <div className={styles.wrapper_parent}>
            <div className={styles.wrapper_child}>
                <div className={styles.parent_one}>
                    <div className={styles.raindrop_one}></div>
                </div>

                <div className={styles.parent_two}>
                    <div className={styles.raindrop_two}></div>
                </div>

                <div className={styles.parent_three}>
                    <div className={styles.raindrop_three}></div>
                </div>

                <div className={styles.parent_four}>
                    <div className={styles.raindrop_four}></div>
                </div>

                <div className={styles.parent_five}>
                    <div className={styles.raindrop_five}></div>
                </div>

                <div className={styles.parent_six}>
                    <div className={styles.raindrop_six}></div>
                </div>

                <div className={styles.parent_seven}>
                    <div className={styles.raindrop_seven}></div>
                </div>

                <div className={styles.parent_eight}>
                    <div className={styles.raindrop_eight}></div>
                </div>
            </div>
        </div>
    )
};

export default RainDroplets;