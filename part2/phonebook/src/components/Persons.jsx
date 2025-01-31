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

export default Persons