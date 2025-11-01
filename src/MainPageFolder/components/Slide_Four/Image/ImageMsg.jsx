import styles from './Image.module.css';
import loadingGIF from '../../Loading and Error/gifs/loadingGIF.gif';
import errorGIF from '../../Loading and Error/gifs/errorGIF.gif';

const ImageMsgComponent = ({ loading, error }) => {
    const temp = ';(';
    const msg = loading ? 'Loading GIF because images are still loading' : error ? 'Error GIF because an error had occured' : null;
    return (
        <div className={styles.loading_error_container}>
            {error && 
                <div className={styles.text}>
                    <h1>Sorry, an error occured! No images available {temp}</h1>
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

export default ImageMsgComponent;