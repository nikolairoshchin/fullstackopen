
const Country = ( {show, setFindCountry} ) => {
  const handleShowButton = (countryName) => {
    setFindCountry(countryName)
  }
  
  return (
    <>
    {show.map(country => 
        <div key={country.name.common}> {country.name.common} 
          <button onClick={() => handleShowButton(country.name.common)} >show</button>
        </div>)
    }
    </>
  )
}

export default Country