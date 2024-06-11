import styles from './App.module.css'
import Alert from './components/Alert/Alert';
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import useWeather from './hooks/useWeather';

function App() {
  // console.log(import.meta.env);

  const { weather, loading, callAPI, hasWeatherData, notFound, initialState, setWeather } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Consulta de clima</h1>
      <div className={styles.container}>
        <Form callAPI={callAPI} setWeather={setWeather} initialState={initialState} />
        {loading ? <Spinner /> : hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
