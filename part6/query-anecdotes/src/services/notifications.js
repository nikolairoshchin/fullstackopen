
export const showMessage = (message, dispatch) => {
    dispatch({ type: 'SET', payload: `you added "${content}"` })
        setTimeout(() => {
        dispatch({ type: 'CLEAR' })
    }, 5000)
}