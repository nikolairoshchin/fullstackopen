import { useState } from 'react'

const Persons = ( {persons} ) => {
  return (
      persons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-1234', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} />
    </div>
  )
}

export default App