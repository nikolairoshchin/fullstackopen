import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import FilterShown from './components/FilterShown'
import AddName from './components/AddName'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterShow, setFilterShow] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
        <FilterShown filterShow={filterShow} setFilterShow={setFilterShow} />
      <h2>Add new</h2>
        <AddName persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
        <Persons persons={persons} filterShow={filterShow} />
    </div>
  )
}

export default App