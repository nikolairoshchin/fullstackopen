import { useState } from 'react'
import Persons from './components/Persons'
import FilterShown from './components/FilterShown'
import AddName from './components/AddName'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [filterShow, setFilterShow] = useState('')

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