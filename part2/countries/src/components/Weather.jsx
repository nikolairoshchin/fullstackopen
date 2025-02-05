import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_OPENWEATHERMAP_KEY
  const lat = city.capitalInfo.latlng[0]
  const lng = city.capitalInfo.latlng[1]

  useEffect (() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
    .then(response => setWeather(response.data))
  }, [])
  
    if (!weather) return null
  return (
    <>
      <h2> Weather in {city.capital} </h2>
      <div>Temperature {weather.main.temp} &deg;C</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
      <div>Wind {weather.wind.speed} m/s</div>
    </>
  )
}

export default Weather