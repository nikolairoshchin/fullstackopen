import { createContext, useReducer } from "react";

const initialState = []

const usersReducer = (state, action) => {
    switch (action.type) {
      case "setUsers": {
        return action.payload
      }
    }
  }

const UsersContext = createContext()

export const UsersContextProvider = (props) => {
    const [users, usersDispatch] = useReducer(usersReducer, initialState)
  
    return (
      <UsersContext.Provider value={[users, usersDispatch] }>
        {props.children}
      </UsersContext.Provider>
    )
}

export default UsersContext