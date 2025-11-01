import styles from './Slide_One.module.css';
import SearchBarWrapper from '../Search Bar/Search_Bar_Wrapper';
import SearchBar from '../Search Bar/Search_Bar';

const SlideOne = () => {
    return (
        <div className={styles.slideOne}>
            <div className={styles.search_bar_container}>
                <h1>Search anywhere</h1>
                <SearchBarWrapper indicator={true}>
                    <SearchBar />
                </SearchBarWrapper>
            </div>
        </div>
    );
};

export default SlideOne;