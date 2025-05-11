import { useContext } from "react"
import NotificationContext from '../context/NotificationContext'

export const useNotification = () =>{
    const [notification, notificationDispatch] = useContext(NotificationContext)

const setNotification = (message, messageStyle) => {
    notificationDispatch({ type: 'setMessage', payload: message })
    notificationDispatch({ type: 'setMessageStyle', payload: messageStyle })
    setTimeout(() => {
      notificationDispatch({ type: 'setMessage', payload: null }) 
    }, 3000) 
}
return setNotification
}
