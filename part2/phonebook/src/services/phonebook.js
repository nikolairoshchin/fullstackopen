import axios from 'axios'
const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newRecord) => {
    const request = axios.post(baseURL, newRecord)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, record) => {
    const request = axios.put(`${baseURL}/${id}`, record)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }