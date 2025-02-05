import Weather from './Weather'

const CountryData = ( {show} ) => {
  return (
    <>
      <h1 > {show[0].name.common} </h1>
      <div> Capital {show[0].capital} </div>
      <div> Area  {show[0].area} km<sup>2</sup> </div>
      <h2>Languages</h2> 
      {Object.values(show[0].languages).map(lang => <li key={lang}>{lang} </li>)}
      <p> <img src={show[0].flags.png} /> </p>
      <Weather city = {show[0]} />
    </>
  )
}

export default CountryData