import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice ({
  name: 'anecdote',
  initialState,
  reducers: {
    voteAction(state, action) {
        const id = action.payload
        const anecdoteToChange = state.find(n => n.id === id)
        const changedAnecdote = { 
          ...anecdoteToChange, 
          votes: anecdoteToChange.votes + 1
        }
        const unsortedState = state.map(item =>
          item.id !== id ? item : changedAnecdote 
        )
        
        return [
          ...unsortedState.sort(( a, b ) => {
            return b.votes - a.votes
          })
        ]
    },

    addNewAnecdote(state, action) {
      return state.concat(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const respond = await anecdoteService.getAll()
    dispatch(setAnecdotes(respond))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const respond = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(respond))
  }
}

export const voteChange = (id) => {
  return async dispatch => {
    const respond = await anecdoteService.modify(id)
    dispatch(voteAction(id))
  }
}


export const { voteAction, addNewAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer