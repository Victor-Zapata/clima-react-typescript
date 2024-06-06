import axios from "axios"

type useWeatherValues = {
    callAPI: (name: string, code: string) => void
}

const useWeather = (): useWeatherValues => {
    const API_KEY = '81f56ba7a3d7d75cd1a9a0a7457a23b2'
    const callAPI = async (name: string, code: string) => {

        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name},${code}&appid=${API_KEY}&units=metric`);
        console.log(data);

    }
    return (
        { callAPI }
    )
}

export default useWeather