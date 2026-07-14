import React from "react";
import { describeAQI } from "../services/weatherAPI";

const ICONS = {
  sunny: "bx bx-sun",
  cloudy: "bx bxs-cloud",
  rainy: "bx bxs-cloud-rain",
  storm: "bx bxs-cloud-lightning",
  snow: "bx bxs-cloud-snow",
  fog: "bx bx-water",
  night: "bx bx-moon",
};

function formatTime(unixSeconds, timezoneOffsetSeconds) {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

/**
 * Hero card: temperature, condition, and the full grid of current
 * weather details (humidity, wind, pressure, AQI, sunrise/sunset...).
 */
export default function WeatherCard({
  weather,
  aqi,
  themeKey,
  units,
  onToggleUnits,
  isFavorite,
  onToggleFavorite,
}) {
  if (!weather) return null;

  const { name, sys, main, weather: cond, wind, visibility, clouds, dt, timezone } =
    weather;
  const description = cond[0]?.description ?? "";
  const iconClass = ICONS[themeKey] ?? "bx bxs-cloud";
  const aqiInfo = aqi ? describeAQI(aqi.main?.aqi) : null;
  const unitLabel = units === "metric" ? "°C" : "°F";
  const speedLabel = units === "metric" ? "km/h" : "mph";

  const details = [
    { icon: "bx bx-water-percent", label: "Humidity", value: `${main.humidity}%` },
    { icon: "bx bx-tachometer", label: "Pressure", value: `${main.pressure} hPa` },
    {
      icon: "bx bx-visibility",
      label: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
    },
    { icon: "bx bx-wind", label: "Wind Speed", value: `${Math.round(wind.speed)} ${speedLabel}` },
    { icon: "bx bx-compass", label: "Wind Direction", value: `${wind.deg}°` },
    { icon: "bx bxs-cloud", label: "Cloud Cover", value: `${clouds.all}%` },
    {
      icon: "bx bx-sunrise",
      label: "Sunrise",
      value: formatTime(sys.sunrise, timezone),
    },
    {
      icon: "bx bx-sunset",
      label: "Sunset",
      value: formatTime(sys.sunset, timezone),
    },
    {
      icon: "bx bx-air-conditioner",
      label: "Air Quality",
      value: aqiInfo ? aqiInfo.label : "—",
    },
  ];

  return (
    <section className="weather-card glass fade-in-up">
      <div className="weather-card-top">
        <div>
          <h2 className="weather-city">
            <i className="bx bx-map"></i> {name}, {sys.country}
          </h2>
          <p className="weather-updated">
            Last updated {formatTime(dt, timezone)}
          </p>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={onToggleFavorite}
          title="Save to favorites"
          aria-label="Toggle favorite city"
        >
          <i className={`bx ${isFavorite ? "bxs-heart" : "bx-heart"}`}></i>
        </button>
      </div>

      <div className="weather-card-main">
        <i className={`${iconClass} weather-hero-icon float`}></i>
        <div className="weather-temp-block">
          <span className="weather-temp">
            {Math.round(main.temp)}
            <sup>{unitLabel}</sup>
          </span>
          <span className="weather-desc">{description}</span>
          <span className="weather-feels">
            Feels like {Math.round(main.feels_like)}
            {unitLabel}
          </span>
        </div>
        <button className="units-toggle" onClick={onToggleUnits}>
          °C / °F
        </button>
      </div>

      <div className="weather-minmax">
        <span>
          <i className="bx bx-down-arrow-alt"></i> Min {Math.round(main.temp_min)}
          {unitLabel}
        </span>
        <span>
          <i className="bx bx-up-arrow-alt"></i> Max {Math.round(main.temp_max)}
          {unitLabel}
        </span>
      </div>

      <div className="weather-details-grid">
        {details.map((d) => (
          <div className="detail-tile glass-inset" key={d.label}>
            <i className={d.icon}></i>
            <span className="detail-label">{d.label}</span>
            <span className="detail-value">{d.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
