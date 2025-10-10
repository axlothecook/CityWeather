import SearchBar from './Search_Bar';
import stylesFirstSlide from '../Slide_One/Slide_One.module.css';
import stylesSecondSlide from '../Slide_Two/Slide_Two.module.css';

const SearchBarWrapper = ({ indicator }) => {
    function switchTab() {
        var element = document.querySelector('#secondSlideId');
        if(element) element.scrollIntoView({ behaviour: 'instant', block: 'start' });
    };

    return (
        <div className={indicator ? stylesFirstSlide.search_bar_container_first_slide : stylesSecondSlide.search_bar_container_second_slide}>
            <SearchBar switchTab={indicator ? switchTab : null} />
        </div>
    );
};


export default SearchBarWrapper;