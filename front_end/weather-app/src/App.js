import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";

import "./App.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "long", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
const App = () => {
  const [city, setCity] = useState("");
  const [city2, setCity2] = useState("");

  const [weatherData, setWeatherData] = useState(null);
  const [weatherData2, setWeatherData2] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [forecastData2, setForecastData2] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
  const [mapUrl2, setMapUrl2] = useState("");
  const [tempUnit, setTempUnit] = useState("metric");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/weather/${city}?units=${tempUnit}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/forecast/${city}?units=${tempUnit}`
        );
        setForecastData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWeatherData2 = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/weather/${city2}?units=${tempUnit}`
        );
        setWeatherData2(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchForecastData2 = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/forecast/${city2}?units=${tempUnit}`
        );
        setForecastData2(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (city && city2) {
      fetchWeatherData();
      fetchForecastData();
      fetchWeatherData2();
      fetchForecastData2();
      setMapUrl(
        `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`
      );
      setMapUrl2(
        `https://maps.google.com/maps?q=${city2}&t=&z=13&ie=UTF8&iwloc=&output=embed`
      );
    }
  }, [city, city2, tempUnit]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCity2Change = (event) => {
    setCity2(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleAddToFavorites = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const handleFavouriteClick = (location) => {
    const updatedFavourites = favorites.filter((fav) => fav !== location);
    setFavorites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city 1"
          value={city}
          onChange={handleCityChange}
        />
        <input
          type="text"
          placeholder="Enter city 2"
          value={city2}
          onChange={handleCity2Change}
        />
        <button type="submit">Search</button>
        <div className="toggle-container">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={isFahrenheit}
              onChange={() => setIsFahrenheit(!isFahrenheit)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-text">
            {isFahrenheit ? "Fahrenheit" : "Celsius"}
          </span>
        </div>
      </form>

      <div className="weather-cards">
        {weatherData && (
          <WeatherCard
            data={weatherData}
            isFahrenheit={isFahrenheit}
            handleAddToFavorites={handleAddToFavorites}
          />
        )}
        {weatherData2 && (
          <WeatherCard
            data={weatherData2}
            isFahrenheit={isFahrenheit}
            handleAddToFavorites={handleAddToFavorites}
          />
        )}
      </div>

      <div className="forecast-cards">
        {forecastData && (
          <div className="forecast-container">
            <h2>Forecast - {city}</h2>
            <div className="forecast-list">
              {forecastData?.list.slice(0, 3).map((data, index) => (
                <ForecastCard
                  key={index}
                  data={data}
                  formatDate={formatDate}
                  isFahrenheit={isFahrenheit}
                />
              ))}
            </div>
          </div>
        )}
        {forecastData2 && (
          <div className="forecast-container">
            <h2>Forecast - {city2}</h2>
            <div className="forecast-list">
              {forecastData2?.list.slice(0, 3).map((data, index) => (
                <ForecastCard
                  key={index}
                  data={data}
                  formatDate={formatDate}
                  isFahrenheit={isFahrenheit}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="map-box-container">
        {mapUrl && (
          <div className="map-box">
            <iframe
              title="map"
              className="map-iframe"
              src={mapUrl}
              allowFullScreen=""
            ></iframe>
          </div>
        )}
        {mapUrl2 && (
          <div className="map-box">
            <iframe
              title="map"
              className="map-iframe"
              src={mapUrl2}
              allowFullScreen=""
            ></iframe>
          </div>
        )}
      </div>

      <div className="favourites-container">
        <h2>Favourites</h2>
        <ul>
          {favorites.map((city) => (
            <li key={city}>
              <button onClick={() => handleFavouriteClick(city)}>{city}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
