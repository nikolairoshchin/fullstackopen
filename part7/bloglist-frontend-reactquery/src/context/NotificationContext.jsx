import { createContext, useReducer } from "react";

const initialState = {
    message: null,
    messageStyle: "box message"
}

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "setMessage": {
        return {...state, message: action.payload}
      }
      case "setMessageStyle": {
        return {...state, messageStyle: action.payload}
      }
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
}

export default NotificationContext