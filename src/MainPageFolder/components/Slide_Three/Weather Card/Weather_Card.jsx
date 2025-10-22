import styles from './Weather_Card.module.css';

const Card = ({ data }) => {

    // console.log('data:')
    // console.log(data)
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <div className={styles.top_left_corner}>
                    <h1>{data.topLeft.back}</h1>
                    <div>
                        <h1>{data.topLeft.front}</h1>
                        {data.id === 0 && <span>°C</span>}
                        {data.id === 3 && <span>°</span>}
                        {data.id === 4 && <span>%</span>}
                    </div>
                </div>
                <div className={styles.top_right_corner}>
                    <h1>{data.topRight.back}</h1>
                    <div>
                        <h1>{data.topRight.front}</h1>
                        {data.id === 0 && <span>°C</span>}
                        {data.id === 1 && <span>okta</span>}
                        {data.id === 3 && <span>km/h</span>}
                        {data.id === 4 && <span>hPa</span>}
                    </div>
                </div>
            </div>
            <div className={styles.middle_row}>
                {data.mainIcon}
            </div>
            <div className={styles.row}>
                <div className={styles.bottom_left_corner}>
                    <h1>{data.bottomLeft.back}</h1>
                    <div>
                        <h1>{data.bottomLeft.front}</h1>
                        {(data.id === 0 || data.id === 4) && <span>°C</span>}
                        {data.id === 1 && <span>%</span>}
                        {data.id === 3 && <span>m/s</span>}
                    </div>
                </div>
                <div className={styles.bottom_right_corner}>
                    <h1>{data.bottomRight.back}</h1>
                    <div>
                        <h1>{data.bottomRight.front}</h1>
                        {data.id === 0 && <span>°C</span>}
                        {data.id === 1 && <span>%</span>}
                        {data.id === 2 && 
                        <div className={styles.measurement_unit}>
                            <span>kW/m</span>
                            <span>2</span>
                        </div>}
                        {data.id === 3 && <span>km</span>}
                        {data.id === 4 && <span>cm</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;