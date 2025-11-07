import { useEffect, useState } from 'react';
import styles from './Blob.module.css';

const BlobComponent = ({ selectedPlace, indicatorRef }) => {
    const [blobParentClass, setBlobParentClass] = useState(styles.blobParentNoTransition);
    const [blobClass, setBlobClass] = useState(styles.blobNoTransition);

    // useEffect(() => {
    //     function positionBlob () {
    //         var element = document.querySelector('#blobParent');
    //         if(element) {
    //             const position = element.getBoundingClientRect();
    //             console.log(position)
    //             element.style.position = 'fixed';
    //             element.style.transformOrigin = 'center';
    //             element.style.top = position.top + 'px';
    //         };
    //     };

    //     positionBlob();
    // }, [selectedPlace]);

    useEffect(() => {
        function changeClass () {
            setBlobParentClass(styles.blobParentTransition);
            setBlobClass(styles.blobTransition);
            const timer = setTimeout(() => {
                setBlobParentClass(styles.blobParentNoTransition);
                setBlobClass(styles.blobNoTransition);
            }, 1500);

            return () => clearTimeout(timer);
        };

        if(selectedPlace && indicatorRef.current) changeClass();
    }, [selectedPlace])

    return (
        <div className={blobParentClass} id='blobParent'>
            <div className={blobClass}></div>
        </div>
    );
};

export default BlobComponent;