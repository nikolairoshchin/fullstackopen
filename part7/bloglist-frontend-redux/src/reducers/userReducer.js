import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from "../services/blogs";

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser (state, action) {
            return action.payload
        }
    }
})


export const loginUser = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch(setUser(user))
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        blogService.setToken(user.token); 
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.clear();
        dispatch(setUser(null))
        window.location.reload();
    }
}


export const { setUser } = userSlice.actions
export default userSlice.reducer