import { useContext, useEffect, useRef, useState } from "react"
import { APIKeysContext } from "../Contexts";

const useVideoLink = (latitude, longitude) => {
    const { GOOGLE_API_KEY } = useContext(APIKeysContext);
    const [videoArr, setVideoArr] = useState([]);
    const loadingVideos = useRef(false);
    const errorVideos = useRef(false);

    useEffect(() => {
        const fetchVideos = async() => {
            try {
                loadingVideos.current = true;
                fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${latitude}%2C${longitude}&locationRadius=30mi&q=walking%20tour&type=video&videoDuration=long&key=${GOOGLE_API_KEY}`)
                .then((reponse) => reponse.json())
                .then((response) => {
                    setVideoArr([
                        ...response.items
                    ]);
                })
                .catch((e) => {
                    console.log(`Fetch Videos Data Error: ${e}`);
                    errorVideos.current = e;
                });
            } catch (err) {
                setVideoArr(null);
                errorVideos.current = err;
            } finally {
                loadingVideos.current = false;
            };
        };

        if(latitude && longitude) fetchVideos();
    }, [latitude, longitude]);

    return { videoArr, loadingVideos, errorVideos }
};

export default useVideoLink;