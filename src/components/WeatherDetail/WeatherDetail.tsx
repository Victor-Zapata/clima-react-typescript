import { Weather } from "../../hooks/useWeather"
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}

const WeatherDetail = ({ weather }: WeatherDetailProps) => {

    return (
        <div className={styles.container}>
            <h2>Clima de: {weather.name}</h2>
            <p className={styles.current}>{weather.main.temp.toFixed(1)}{' '}&deg;C</p>

            <div className={styles.temperatures}>
                <p>Min: <span>{weather.main.temp_min.toFixed(1)}{' '}&deg;C</span></p>
                <p>Max: <span>{weather.main.temp_max.toFixed(1)}{' '}&deg;C</span></p>
            </div>
        </div>
    )
}

export default WeatherDetail