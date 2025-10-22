import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from './Image.module.css';
import { PhotosAndVideosContext } from "../../Contexts";

export const DragCards = () => {
  return (
    <section className={styles.section}>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);
  const { photoArr } = useContext(PhotosAndVideosContext);
    // const [doubleClicked, setDoubleClicked] = useState(false);
  
  return (
    <div className={styles.container} ref={containerRef}>
      {photoArr.current && photoArr.current.map((photo) => (
        <Card
          containerRef={containerRef}
          key={photo.id} 
          src={photo.link}
          alt='Photo of searched city'
          rotate="6deg"
          top={photo.top}
          left={photo.left}
        />
      ))}
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate }) => {
  const [zIndex, setZIndex] = useState(0);
  const [doubleClicked, setDoubleClicked] = useState(false);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
        position: 'absolute', 
        width: doubleClicked ? '30rem' : '16rem', 
        backgroundColor: 'oklch(92.2% 0 0)', 
        padding: '1rem', 
        paddingBottom: '4rem',
        cursor: 'grab'
      }}
      className="drag-elements"
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      onDoubleClick={() => setDoubleClicked(!doubleClicked)}
    />
  );
};

