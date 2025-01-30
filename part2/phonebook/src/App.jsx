import { useState } from 'react'

const Persons = ( {persons} ) => {
  return (
      persons.map(person =>
        <p key={person.name}>{person.name}</p>
      )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

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
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)    
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App