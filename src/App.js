import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "914b8ee166ef0b97ca4e28acdd4016d0";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const [fahrenheit, setFahrenheit] = useState();

  function backgroundChange() {
    var temp = weatherData.main.temp - 273;
    console.log(temp);
 

    if (temp > -10 && temp <= 0) {
      document.body.style.backgroundImage = "url('https://i.ibb.co/zFHcT6G/winter1.jpg')";

    } else if (temp > 1 && temp <= 15) {

      document.body.style.backgroundImage = "url('https://i.ibb.co/x1R4T3t/winter.jpg')";

    } else if (temp > 16 && temp <= 25) {
      document.body.style.backgroundImage = "url('https://i.ibb.co/9hRg9Ng/spring-jp.jpg')";
    } else if (temp > 26) {
      document.body.style.backgroundImage = "url('https://i.ibb.co/93jgch7/warmth.jpg')";
    }
  }

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=914b8ee166ef0b97ca4e28acdd4016d0`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  function waveHello(fahrenheitValue) {
    console.log("wave");
    const celsiusValue = fahrenheitValue - 273;
    setFahrenheit(celsiusValue);
  }

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main == "undefined" ? (
        <div>
          <p>Welcome To weather app! Enter a city to get weather data</p>
        </div>
      ) : (
        <div className="text-background">
        <div className="weather-data">
          {backgroundChange()}
          <p className="city">{weatherData.name}</p>
          {/* <p className='temp'>{fahrenheit}°F</p> */}
          <p className="temp">{Math.round(weatherData.main.temp - 273)}°F</p>
          <p className="weather">{weatherData.weather[0].main}</p>

          <p>{fahrenheit}</p>
        </div>
        </div>
      )}

      {weatherData.cod === "404" ? <div>City Not Found</div> : <div></div>}
    </div>
  );
}

export default App;
