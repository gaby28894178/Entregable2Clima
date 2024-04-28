import React, { useState } from 'react'
import './components/style/cardWaters.css'


const WeatherCard = ({weather,temp}) => {
    const [isCelcius, setIsCelcius] = useState(true)


const ChangeTem=()=>{
    setIsCelcius(!isCelcius)

}

  return (
    <article className='card'>
      <h1 className='card__title' >Weather App</h1>
      <h2 className='card__country'>{weather?.name},{weather?.sys.country}</h2>
      <section className='card__body' >
        <div className='card__img-container'>
            <img className='card__img' src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            <article className='info'>
                <h3 className='info__title'>{weather?.weather[0].description}</h3>
                <ul className='info__list'>
                    <li className='info__item'><samp className='info__label'> Viento </samp><samp className='info__value'> {weather?.wind.speed} m/s</samp></li>
                    <li className='info__item'><samp className='info__label'> Clouds </samp><samp className='info__value'> {weather?.clouds.all} %</samp></li>
                    <li className='info__item'><samp className='info__label'> Humedad</samp><span className='info__value'> {weather?.main.humidity} %</span></li>
                    
                </ul>
            </article>
        </div>
      </section>
            <h2 className='card__temp'>{isCelcius?`${temp?.celsius}°C `:`${temp?.farengei} °F`}</h2>
            <button className='card__btn' onClick={ChangeTem} > Change to {isCelcius ?  `°F`:`°C`} </button>
    </article>
  )
}

export default WeatherCard
