import { useState } from "react";
import { WEATHER_API_URL } from "./Api";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/search/Search";

function App() {
  const API_KEY_WEATHER = process.env.REACT_APP_API_KEY_WEATHER;

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")


    const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lang=da&lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`)
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}forecast?lang=da&lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`)

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()
        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecastWeather({ city: searchData.label, ...forecastResponse })
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
      </div>
    </div>
  );
}

export default App;
