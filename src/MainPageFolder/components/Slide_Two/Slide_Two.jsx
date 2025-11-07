import { useContext } from 'react';
import styles from './Slide_Two.module.css';
import { WeatherContext } from '../Contexts';
import SearchBarWrapper from '../Search Bar/Search_Bar_Wrapper';
import SearchBar from '../Search Bar/Search_Bar';
import AnimatedContainer from './Animated Container/Animated_container';
import TextContainer from './Text_container';

const SlideTwo = () => {
    const { weatherAnimations } = useContext(WeatherContext);

    return (
        <div className={styles.slide_Two_Parent} id='secondSlideId'>
            {weatherAnimations &&   
                <div className={styles.slide_Two_Child}>
                    <AnimatedContainer>
                        <SearchBarWrapper indicator={false}>
                            <SearchBar />
                        </SearchBarWrapper>
                    </AnimatedContainer>
                    <div style={{backgroundImage: `${weatherAnimations.secondSlide.bgClr}`}}>
                        <TextContainer />
                    </div>
                </div>
            }
        </div>
    );
};

export default SlideTwo;