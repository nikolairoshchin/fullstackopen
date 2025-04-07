import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={ [notification, setNotification] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext