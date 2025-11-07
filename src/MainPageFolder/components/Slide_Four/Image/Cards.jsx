import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from './Image.module.css';
import { PhotosAndVideosContext } from "../../Contexts";
import ImageMsgComponent from "./ImageMsg";
import './style.css';

export const DragCards = () => {
  return (
    <section className={styles.section}>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);
  const { 
    photoArr, 
    loadingPhotosRef,
    errorPhotosRef,
  } = useContext(PhotosAndVideosContext);
  
  return (
    <>
      {(loadingPhotosRef.current || errorPhotosRef.current) && 
        <ImageMsgComponent loading={loadingPhotosRef.current} error={errorPhotosRef.current} />
      }
      {(!loadingPhotosRef.current && !errorPhotosRef.current) && 
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
      }
    </>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate }) => {
  const [zIndex, setZIndex] = useState(0);
  const [doubleClicked, setDoubleClicked] = useState(false);

  const updateZIndex = () => {
    console.log('sss')
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
        zIndex
      }}
      className='drag-elements'
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      // onDoubleClick={() => setDoubleClicked(!doubleClicked)}
    />
  );
};

