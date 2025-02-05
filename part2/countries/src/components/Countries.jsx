import CountryData from './CountryData'
import Country from './Country'

const Countries = ({ countriesList, findCountry, setFindCountry }) => {
  const show = countriesList.filter(country => 
    country.name.common
    .toLowerCase()
    .includes(findCountry.toLowerCase())    
  )

  switch (true) {
    case (show.length === 0): return null
    case (show.length === 1): return <CountryData show={show} />
    case (show.length < 10): return <Country show={show} setFindCountry={setFindCountry} />
    default: return <>'Too many matches, specify another filter'</>
  }
}

export default Countries