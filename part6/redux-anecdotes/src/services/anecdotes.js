import axios from "axios"

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createNew = async (content) => {
    const asObject = {
        content: content,
        votes: 0
      }
    const response = await axios.post(baseURL, asObject)
    return response.data
}

const modify = async (id) => {
    const url = `${baseURL}/${id}`
    const item = await axios.get(url)
    const anecdote = item.data
    const changedAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
    }
    const respond = await axios.put(url, changedAnecdote)
}

export default { getAll, createNew, modify }