import styles from './Card.module.css';

const Card = ({ image, name, onClick }) => {
    return (
        <div 
        className={styles.card}
        onClick={onClick}
        >
            <div className={styles.image_container}>
                <img src={image} />
            </div>
            <div className={styles.name_container}>
                <h1>{name}</h1>
            </div>
        </div>
    );
};

export default Card;