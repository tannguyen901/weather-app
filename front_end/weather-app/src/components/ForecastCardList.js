import React from "react";
import ForecastCard from "./ForecastCard";

import "./ForecastCardList.css";

function ForecastCardList(props) {
  const { data, city } = props;

  return (
    <div className="forecast-card-list">
      <h2>Forecast - {city}</h2>
      <div className="forecast-card-list-container">
        {data.list.slice(0, 5).map((data, index) => (
          <ForecastCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default ForecastCardList;
