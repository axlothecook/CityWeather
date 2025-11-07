import styles from './Slide_One.module.css';
import SearchBarWrapper from '../Search Bar/Search_Bar_Wrapper';
import SearchBar from '../Search Bar/Search_Bar';
import Card from './cards/Card';
import nyc from './cards/images/nyc.jpg';
import amazonas from './cards/images/amazonas.jpg';
import tokyo from './cards/images/tokyo.jpg';
import romania from './cards/images/romania.png';
import { useContext } from 'react';
import { WeatherContext } from '../Contexts';

const SlideOne = () => {
    const { setTemplatePlace } = useContext(WeatherContext);
    const imgArr = [
        {
            link: nyc,
            name: 'New York City, USA',
            code: 'New York City NY, USA'
        }, 
        {
            link: amazonas,
            name: 'Manaus, Brazil',
            code: 'Manus State of Amazonas, Brazil'
        }, 
        {
            link: tokyo,
            name: 'Tokyo, Japan',
            code: 'Tokyo Japan'
        }, 
        {
            link: romania,
            name: 'Cluj-Napoca, Romania',
            code: 'Cluj-Napoca Romania'
        }
    ];
    return (
        <div className={styles.slide_one_parent}>
            <div className={styles.slide_one_child}>
                <div className={styles.search_bar_container}>
                    <h1>Search anywhere</h1>
                    <SearchBarWrapper indicator={true}>
                        <SearchBar />
                    </SearchBarWrapper>
                </div>
                <div className={styles.cards_container}>
                    {imgArr.map((item, index) => (
                        <Card 
                            key={index} 
                            image={item.link} 
                            name={item.name} 
                            onClick={() => setTemplatePlace(item.code)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideOne;