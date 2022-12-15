import CurrentWeather from "./components/current-weather/CurrentWeather";
import Search from "./components/search/Search";

function App() {

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  }

  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />
      <div>
        <CurrentWeather />
      </div>
    </div>
  );
}

export default App;
