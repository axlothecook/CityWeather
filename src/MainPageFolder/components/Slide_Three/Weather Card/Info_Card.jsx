import styles from './Weather_Card.module.css';

const InfoCard = ({ info, temp, city, country }) => {
    return (
        <div className={styles.info_card}>
            <div className={styles.info_card_first_child}>
                <div>
                    <h1>{city}</h1>
                    <h3>{country}</h3>
                </div>
                <h2>{info.date}</h2>
                <h2>{info.conditions}</h2>
                <h3>{info.description}</h3>
            </div>
            <div className={styles.info_card_last_child}>
                <h2>{temp.current}°C</h2>
                {info.iconBig}
            </div>
        </div>
    );
};

export default InfoCard;