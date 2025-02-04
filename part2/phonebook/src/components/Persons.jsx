import phonebookService from '../services/phonebook'

const Persons = ( {persons, setPersons, filterShow } ) => {
  const filteredPersons = persons.filter(person => 
    ((person.name).
    toLowerCase()).
    includes(filterShow.toLowerCase()))

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(response => {
        setPersons(persons.filter(person => person.id != response.id))
        showMessage(`${response.name} was deleted succefully`)
      })
    }
  }

  return (
      filteredPersons.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </div>
      )
  )
}

export default Persons