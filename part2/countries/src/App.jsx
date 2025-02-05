import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

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
      <Countries 
        countriesList={countriesList} 
        findCountry={findCountry} 
        setFindCountry={setFindCountry} />
    </div>
    </>
  )
}

export default App
