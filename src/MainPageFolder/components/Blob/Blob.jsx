import { useEffect, useRef, useState } from 'react';
import styles from './Blob.module.css';

const BlobComponent = ({ selectedPlace, indicatorRef }) => {
    const [blobParentClass, setBlobParentClass] = useState(styles.blobParentNoTransition);
    const [blobClass, setBlobClass] = useState(styles.blobNoTransition);
    const xCoordRef = useRef(null);
    const yCoordRef = useRef(null);

    function setBlob() {
        var element = document.querySelector('#blobParent');
        if(element) {
            xCoordRef.current = 100;
            yCoordRef.current = 100;
            element.style.position = 'fixed';
            element.style.transformOrigin = '300px 300px';
            element.style.left = 100 + 'px';
            element.style.top = 100 + 'px';
        };
    };

    setBlob();

    useEffect(() => {
        function changeClass () {
            setBlobParentClass(styles.blobParentTransition);
            setBlobClass(styles.blobTransition);
            const timer = setTimeout(() => {
                setBlobParentClass(styles.blobParentNoTransition);
                setBlobClass(styles.blobNoTransition);
            }, 3000);

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