import { useState } from "react";
import { WEATHER_API_URL } from "./Api";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/search/Search";
import WeatherMap from "./components/weatherMap/WeatherMap";

function App() {
  const API_KEY_WEATHER = process.env.REACT_APP_API_KEY_WEATHER;

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)
  const [weatherMap, setWeatherMap] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")
    const temp_new = "temp_new"


    const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lang=da&lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`)
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}forecast?lang=da&lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`)
    const weatherMapFetch = fetch(`https://tile.openweathermap.org/map/${temp_new}/${100}/${9.501785}/${56.26392}.png?appid=${API_KEY_WEATHER}`)

    Promise.all([currentWeatherFetch, forecastWeatherFetch, weatherMapFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()
        const weatherMapResponse = await response[2].json()
        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecastWeather({ city: searchData.label, ...forecastResponse })
        setWeatherMap({ city: searchData.label, ...weatherMapResponse })
      }
      )
      .catch(err => console.error(err))
  };
  console.log(currentWeather, forecastWeather);


  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />
      <div>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecastWeather && <Forecast data={forecastWeather} />}
        {weatherMap && <WeatherMap data={weatherMap} />}
      </div>
    </div>
  );
}

export default App;
