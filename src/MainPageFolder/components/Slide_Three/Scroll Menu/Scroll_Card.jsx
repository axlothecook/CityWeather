import { useRef } from 'react';
import styles from './Scroll.module.css';

const ScrollCard = ({ dayInfo, temp, onDrag, defaultSelected, onClick }) => {
  const date = useRef(dayInfo.date ? dayInfo.date.substring(5) : dayInfo.time.substring(0, 5));
  const day = useRef(dayInfo.day === 'Today' ? dayInfo.day : dayInfo.day.substring(0, 3));
  return (
    <div 
      className={styles.card} 
      onMouseUp={() => {
        onDrag();
      }}
      onClick={() => {
        if(onClick) onClick();
      }}
    >
      <button className={defaultSelected ? styles.selected_card : styles.normal_card} >
        <h4>{day.current}</h4>
        <h4>{date.current}</h4>
        {dayInfo.iconSmall}
        <h4>{temp}°</h4>
      </button>
    </div>
  );
};

export default ScrollCard;