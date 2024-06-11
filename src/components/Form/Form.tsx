import { Dispatch, SetStateAction, useState } from "react"
import { countries } from "../../data/countries"
import styles from './Form.module.css'
import Alert from "../Alert/Alert"
import type { Request } from "../../types"
import { Weather } from "../../hooks/useWeather"

type FormsProps = {
    callAPI: (name: string, code: string) => Promise<void>
    setWeather: Dispatch<SetStateAction<{ name: string; main: { temp: number; temp_max: number; temp_min: number; }; }>>
    initialState: Weather
}

const Form = ({ callAPI, setWeather, initialState }: FormsProps) => {

    const [request, setRequest] = useState<Request>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleRequest = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setRequest({ ...request, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setWeather(initialState)
        if (Object.values(request).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
        callAPI(request.city, request.country)
        setTimeout(() => {
            setRequest({
                city: '',
                country: ''
            })
        }, 1500);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {
                alert && <Alert children={alert} />
            }
            <div className={styles.field}>
                <label htmlFor="city">Ciudad: </label>
                <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Ciudad"
                    onChange={(e) => handleRequest(e)}
                    value={request.city}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="city">País: </label>
                <select name="country" value={request.country} id="country" onChange={(e) => handleRequest(e)} >
                    <option value="">-- Seleccione un País --</option>
                    {countries.map((item) => {
                        return <option key={item.code} value={item.code}>
                            {item.name}
                        </option>
                    })}
                </select>
            </div>
            <input className={styles.submit} type="submit" value='Consultar Clima' />
        </form>
    )
}

export default Form