import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice ({
    name: 'notification',
    initialState,
    reducers: {
        showMessage(state, action) {
            return action.payload
        },
        hideMessage(state, action) {
            return ''
        }
    }
})

export const setNotification = (message, timeout = 5) => {
    return dispatch => {
        dispatch(showMessage(message))
        setTimeout(() => {
            dispatch(hideMessage())},
            timeout*1000
       )
    }
}

export const { showMessage, hideMessage } = notificationSlice.actions
export default notificationSlice.reducer