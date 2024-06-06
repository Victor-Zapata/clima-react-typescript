
import styles from './Alert.module.css'

export type AlertProps = {
    alert: string
}

const Alert = ({ alert }: AlertProps) => {
    return (
        <div className={styles.alert}>{alert}</div>
    )
}

export default Alert