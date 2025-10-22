import styles from '../Icons.module.css';

const WindBlueIcon = () => {
    return (
        <svg 
            className={styles.icon_small_wind}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 32 32" 
            id="arrow_blue"
        >
            <path fill="#669DF6" fillRule="evenodd" d="M16 16v14h1.556L30 2 2 14.444V16z"></path>
        </svg>
    );
};

export default WindBlueIcon;