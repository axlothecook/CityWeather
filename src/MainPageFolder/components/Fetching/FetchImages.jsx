import { useState, useEffect, useRef } from "react"

const useImageLInk = (placeId, API_KEY) => {
    // const [imagesArr, setImagesArr] = useState([]);
    const imagesArr = useRef([]);

    useEffect(() => {
        function fetchImages(id) {
            fetch(`https://places.googleapis.com/v1/places/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": "AIzaSyBnxOTyLUp6dwVolwpt7T_ll3yEMKWDjXo",
                    "X-Goog-Fieldmask": "id,displayName,photos"
                }
            })
            .then((reponse) => reponse.json())
            .then((response) => {
                let tempArr = [];
                let counter = 0;
                response.photos.map((photo) => {
                    tempArr.push({
                        id: counter,
                        link: `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400&key=${API_KEY}`,
                    });
                    counter++;
                });
                // setImagesArr([...tempArr]);
                imagesArr.current = [...tempArr];
            })
            .catch((e) => console.log(`Fetch Images Data Error: ${e}`));
        };

        fetchImages(placeId);
    }, [placeId]);

    return { imagesArr }
};

export default useImageLInk;