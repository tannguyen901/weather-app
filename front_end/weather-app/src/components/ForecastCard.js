import React from "react";

function ForecastCard({ data, isFahrenheit }) {
  const date = new Date(data.dt * 1000);
  const dateString = date.toLocaleDateString();
  const temperature = isFahrenheit
    ? (data.main.temp * 9) / 5 + 32
    : data.main.temp;

  return (
    <div className="forecast-card">
      <p className="forecast-date">{dateString}</p>
      <img
        src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
        className="forecast-icon"
      />
      <p className="forecast-temp">{Math.round(temperature)}{isFahrenheit ? "°F" : "°C"}</p>
      <p className="forecast-description">{data.weather[0].description}</p>
    </div>
  );
}

export default ForecastCard;
