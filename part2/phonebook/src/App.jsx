import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import FilterShown from './components/FilterShown'
import AddName from './components/AddName'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterShow, setFilterShow] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('message')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
        <Notification message={message} messageStyle={messageStyle}/>
        <FilterShown filterShow={filterShow} setFilterShow={setFilterShow} />
      <h2>Add new</h2>
        <AddName 
          persons={persons} 
          setPersons={setPersons}
          setMessage={setMessage}
          setMessageStyle={setMessageStyle} />
      <h2>Numbers</h2>
        <Persons 
          persons={persons} 
          setPersons={setPersons} 
          filterShow={filterShow} />
    </div>
  )
}

export default App