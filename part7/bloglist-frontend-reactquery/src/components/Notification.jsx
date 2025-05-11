import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const Notification = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  if (notification.message === null) {
    return null
  }

  return (
    <div className={notification.messageStyle}>
      {notification.message}
    </div>
  )
}

export default Notification