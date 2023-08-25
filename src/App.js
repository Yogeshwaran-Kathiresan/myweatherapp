import React, { useState } from 'react'
import './App.css'
import { GrLocation } from 'react-icons/gr'

function App() {

  const apiKey = 'fbcfae6829114fae632943c6f008cdae';

  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data);
        }
      )
    }
  }

  return (
    <div className='container'>
      <h1> My Weather Application</h1>
      <input
        className='input-box'
        placeholder='Enter the City...'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />
      {typeof weatherData.main === 'undefined' ? (
        <div>
          <h3>Hooray! Welcome to the weather app. Enter the City name to check the weather..</h3>
        </div>
      ) : (
        <div className='weather-box'>
          <p className='city'><GrLocation className='map-icon' /> {weatherData.name}</p>
          <div className='second-line'>
            <p className='temp'>{Math.round(weatherData.main.temp)}°F</p>
            <p className='weather'>{weatherData.weather[0].main}</p>
          </div>
        </div>
      )}

      {weatherData.cod == "404" ? (
        <h2>City not found!</h2>
      ) : (
        <>
        </>
      )}
    </div>
  )
}

export default App