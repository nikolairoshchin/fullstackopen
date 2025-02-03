import axios from 'axios'
import { useState } from 'react'

const AddName = ( {persons, setPersons} ) => {
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
    
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
    })
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)    
  }

  return (
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
  )
}

export default AddName