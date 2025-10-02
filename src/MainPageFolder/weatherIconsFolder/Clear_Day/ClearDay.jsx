import styles from './Sun.module.css';

const ClearDay = () => {
    return (
        <div className={styles.sun}>
            <div className={styles.sunOrb}></div>
            <div className={styles.sunCenter}></div>
        </div>
    )
};

export default ClearDay;