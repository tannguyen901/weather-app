import React from "react";

function WeatherCard({ data, isFahrenheit, handleAddToFavorites }) {
  const { name } = data;

  const handleAddToFavoritesClick = () => {
    handleAddToFavorites(name);
  };

  const temperature = isFahrenheit
    ? (data.main.temp * 9) / 5 + 32
    : data.main.temp;
  const feelsLike = isFahrenheit
    ? (data.main.feels_like * 9) / 5 + 32
    : data.main.feels_like;

  const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <div className="weather-summary">
        <img src={weatherIconUrl} alt={data.weather[0].description} />
        <div className="temperature">{temperature.toFixed(1)}°</div>
        <div className="description">{data.weather[0].description}</div>
      </div>
      <div className="details">
        <div>Feels like: {feelsLike.toFixed(1)}°</div>
        <div>Humidity: {data.main.humidity}%</div>
        <div>Wind: {data.wind.speed} m/s</div>
      </div>
      <button onClick={handleAddToFavoritesClick}>Add to favorites</button>
    </div>
  );
}

export default React.memo(WeatherCard);