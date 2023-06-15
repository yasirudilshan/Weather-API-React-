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
      document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/3d-winter-snowy-landscape_1048-9671.jpg?w=900&t=st=1686848303~exp=1686848903~hmac=7bf80bf6745ad0fb26d6687b2b0a0976368e0eb3e1a3e1ffb29d6808a30a1d50')";
    } else if (temp > 1 && temp <= 15) {
      document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/snow-winter-background-sky-landscape-with-cold-cloud-blizzard-stylized-blurred-snowflakes-snowdrift-realistic-style_333792-43.jpg?w=1380&t=st=1686848432~exp=1686849032~hmac=b434f3ce0426b8925d0fc0a39d97fef25f3a2a2447beb9bd742a4e5b93f2070e')";
    } else if (temp > 16 && temp <= 25) {
      document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/yellow-orange-sunset-background_1308-20105.jpg?w=996&t=st=1686848531~exp=1686849131~hmac=f2038d806870303f29c12d2b187755b9702830a57aefa4f6deb61bbb0100810c')";
    } else if (temp > 26) {
      document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/gradient-summer-heat-background_23-2149423259.jpg?w=996&t=st=1686848530~exp=1686849130~hmac=a2f50449cb15eaff2237969e7742aeb5adb5b564ae69df9661654e778b6002ca')";
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
        <div className="weather-data">
          {backgroundChange()}
          <p className="city">{weatherData.name}</p>
          {/* <p className='temp'>{fahrenheit}°F</p> */}
          <p className="temp">{Math.round(weatherData.main.temp - 273)}°F</p>
          <p className="weather">{weatherData.weather[0].main}</p>

          <p>{fahrenheit}</p>
        </div>
      )}

      {weatherData.cod === "404" ? <div>City Not Found</div> : <div></div>}
    </div>
  );
}

export default App;
