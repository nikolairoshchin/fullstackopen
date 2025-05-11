import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    messageStyle: "box message"
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage (state, action) {
            return {...state, message: action.payload}
        },
        setMessageStyle (state, action) {
            return {...state, messageStyle: action.payload}
        }
    }
})

export const setNotification = (message, messageStyle) => {
    return dispatch => {
        dispatch(setMessage(message))
        dispatch(setMessageStyle(messageStyle))
        setTimeout(() => {
            dispatch(setMessage(''))},
            3000
       ) 

    }
}

export const { setMessage, setMessageStyle } = notificationSlice.actions
export default notificationSlice.reducer