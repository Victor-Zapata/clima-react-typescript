import axios from "axios"
import { useMemo, useState } from "react"
import { z } from "zod"

//ZOD
//primero creo mi schema
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type Weather = z.infer<typeof Weather>

//luego verifico que se respete mi schema usando el metodo safeParse(de ZOD)
const useWeather = () => {

    const initialState = {
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    }

    const [weather, setWeather] = useState<Weather>(initialState)

    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const API_KEY = import.meta.env.VITE_API_KEY
    const callAPI = async (name: string, code: string) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name},${code}&appid=${API_KEY}&units=metric`);
            const result = Weather.safeParse(data)
            if (result.success) {
                setWeather(result.data)
            }
        } catch (error) {
            setNotFound(true)
            return
        } finally {
            setLoading(false)
            setTimeout(() => {
                setNotFound(false)
            }, 3000);
        }
    }

    const hasWeatherData = useMemo(() => weather.name != '', [weather])

    return {
        weather,
        callAPI,
        hasWeatherData,
        loading,
        notFound,
        setWeather,
        initialState
    }
}

export default useWeather