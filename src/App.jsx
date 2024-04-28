import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  const [isloading, setIsloading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const success = pos => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }

    const error = () => {
      setIsloading(true)
      setShowMessage(true)
      setTimeout(()=>{
        setHasError(true)

      })
      
 
   
      
    }

    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  useEffect(() => {
    setTimeout(() => {    
      setShowMessage(true)
      setIsloading(false)
    },3000)
  

  
  
  }, [])

  useEffect(() => {
    if (coords) {
      const APY_KEY = 'd7299db7aba5222ad676f13151c1b9a7'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APY_KEY}`

      axios.get(url)
        .then(res => {
          setTemp(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farengei = ((celsius * 9 / 5 )+(32)).toFixed(1)
          setTemp({ celsius, farengei })
          setWeather(res.data)
        })
        .catch(error => {
          setHasError(true)
          setIsloading(false)
        })
        .finally(() => {
          setIsloading(false)
        })
    }
  }, [coords])

  return (
    <div className='app'>
      {isloading ? (
        <div>
          <h1 style={{ color: 'red' }}>Loading</h1>
          {showMessage && (
            <p style={{ color: 'black' }}>Por favor active la ubicación para poder mostrar la información. Gracias.</p>
          )}
        </div>
      ) :
       hasError ? (
        <h1> ❌ No bloques la ubicación </h1>
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </div>
  )
}

export default App
