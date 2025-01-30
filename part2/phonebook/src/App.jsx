import { useState } from 'react'

const Persons = ( {persons, filterShow} ) => {
  const filteredPersons = persons.filter(person => 
    ((person.name).
    toLowerCase()).
    includes(filterShow.toLowerCase()))
  return (
      filteredPersons.map(person =>
        <div key={person.id}>{person.name} {person.number}</div>
      )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterShow, setFilterShow] =useState('')

  const isNameExist = () => {
    let isName = false
    persons.map(person => {
      if (person.name === newName) isName = true
    })
    return isName
  }

  const addName = ( event ) =>{
    event.preventDefault()
    if (isNameExist()) {
      alert( `${newName} is already added to phonebook` )
      return
    }
    
    const newId = persons.at(-1).id + 1
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newId
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)    
  }

  const handleFilter = (event) => {
    setFilterShow(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter shown with <input 
        value={filterShow} 
        onChange={handleFilter} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filterShow={filterShow} />
    </div>
  )
}

export default App