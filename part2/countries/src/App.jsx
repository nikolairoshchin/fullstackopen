import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryData = ( {show} ) => {
  return (
    <>
      <h1 > {show[0].name.common} </h1>
      <div> Capital {show[0].capital} </div>
      <div> Area  {show[0].area} km<sup>2</sup> </div>
      <h2>Languages</h2> 
      {Object.values(show[0].languages).map(lang => <li key={lang}>{lang} </li>)}
      <p> <img src={show[0].flags.png} /> </p>
    </>
  )
}

const Country = ( {show} ) => {
  return (
    <>
    {show.map(country => 
        <div key={country.name.common}> {country.name.common} </div>)
    }
    </>
  )
}

const Countries = ({ countriesList, findCountry }) => {
  const show = countriesList.filter(country => 
    country.name.common
    .toLowerCase()
    .includes(findCountry.toLowerCase())    
  )

  switch (true) {
    case (show.length === 0): return null
    case (show.length === 1): return <CountryData show={show} />
    case (show.length < 10): return <Country show={show} />
    default: return <>'Too many matches, specify another filter'</>
  }
}

function App() {
  const [countriesList, setCountriesList] = useState([])
  const [findCountry, setFindCountry] = useState('')

  useEffect (() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountriesList(response.data))
  }, [])

  const handleFindCountry = (event) => {
    setFindCountry(event.target.value)
  }

  return (
    <>
    find countries
      <input 
      value={findCountry}
      onChange={handleFindCountry}></input>
    <div>
      <Countries countriesList={countriesList} findCountry={findCountry} />
    </div>
    </>
  )
}

export default App
