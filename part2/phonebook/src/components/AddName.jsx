import { useState } from 'react'
import phonebookService from '../services/phonebook'

const AddName = ( {persons, setPersons, setMessage, setMessageStyle} ) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const showMessage = (text, style) => {
    setMessageStyle(`box ${style}`)
    setMessage(text)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
  }

  const addName = ( event ) =>{    
    event.preventDefault()
    const pers = persons.find(p => p.name === newName)
    if (pers) {
      const changedPerson = {...pers, number: newNumber}
 
      if (window.confirm( `${newName} is already added to phonebook, replace the old number with a new one?` ))
        {
          phonebookService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === response.id ? response : person))
            showMessage(`Number of ${response.name} has been changed`, 'message')
          })
          .catch(error =>{
            showMessage(`${newName} has already been removed`, 'error')
          })
        }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      phonebookService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          showMessage(`${response.name} was added`, 'message')
      })
    }
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