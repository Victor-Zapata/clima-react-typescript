import { useState } from "react"
import { countries } from "../../data/countries"
import styles from './Form.module.css'
import Alert from "../Alert/Alert"
import type { Request } from "../../types"
import useWeather from "../../hooks/useWeather"

const Form = () => {

    const [request, setRequest] = useState<Request>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const { callAPI } = useWeather()

    const handleRequest = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setRequest({ ...request, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(request).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
        callAPI(request.city, request.country)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {
                alert && <Alert alert={alert} />
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