import styles from './Snow.module.css';

const Snow = () => {
    return (        
        <div className={styles.snow}>
            <div className={styles.snow_cloud}></div>
            <div className={styles.snowflakesContainer} aria-hidden="true">
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
                <div className={styles.snowflake}>❅</div>
            </div>
        </div>
    );
};

export default Snow;