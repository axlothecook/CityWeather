import { useEffect, useRef } from "react"

const useImageLink = (placeId, API_KEY) => {
    const photoArr = useRef([]);
    const loadingPhotos = useRef(false);
    const errorPhotos = useRef(null);
    const positionArray = [
        {
            top: "20%",
            left: "25%"
        },
        {
            top: "45%",
            left: "60%"
        },
        {
            top: "20%",
            left: "40%"
        },
        {
            top: "50%",
            left: "40%"
        },
        {
            top: "20%",
            left: "65%"
        },
        {
            top: "35%",
            left: "55%"
        },
        {
            top: "30%",
            left: "75%"
        },
        {
            top: "5%",
            left: "15%"
        },
        {
            top: "10%",
            left: "5%"
        },
        {
            top: "65%",
            left: "5%"
        },
    ];

    useEffect(() => {
        const fetchImages = async(id) => {
            try {
                loadingPhotos.current = true;
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
                            top: positionArray[counter].top,
                            left: positionArray[counter].left,
                        });
                        counter++;
                    });
                    photoArr.current = [...tempArr];
                })
                .catch((e) => console.log(`Fetch Images Data Error: ${e}`));
            } catch (err) {
                photoArr.current = null;
                errorPhotos.current = err;
            } finally {
                loadingPhotos.current = false;
            };
        };

        if(placeId) fetchImages(placeId);
    }, [placeId]);

    return { photoArr, loadingPhotos, errorPhotos }
};

export default useImageLink;