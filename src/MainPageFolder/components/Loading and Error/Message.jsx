import styles from './Loading_And_Error.module.css';
import loadingGIF from './gifs/loadingGIF.gif';
import errorGIF from './gifs/errorGIF.gif';

const MessageComponent = ({ loading, error }) => {
    const temp = ';(';
    const msg = loading ? 'Loading GIF because data is still loading' : error ? 'Error GIF because an error had occured' : null;
    return (
        <div className={styles.container}>
            {error && 
                <div className={styles.text}>
                    <h1>Sorry, an error occured {temp}</h1>
                    <h2>{error}</h2>
                </div>
            }

            {loading &&
                <div className={styles.text}>
                    <h1>Un momento, por favor.</h1>
                </div>
            }
            
            <div className={styles.img_div}>
                {error && <img src={errorGIF} alt={msg} />}
                {loading && <img src={loadingGIF} alt={msg} />}
            </div>
        </div>
    );
};

export default MessageComponent;