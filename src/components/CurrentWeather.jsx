import React from 'react';
import LiveClock from './LiveClock.jsx';
import { describeWeatherCode, round } from '../utils/helpers';

export default function CurrentWeather({ city, weather }) {
  if (!weather?.current) return null;
  const c = weather.current;
  const { label, icon } = describeWeatherCode(c.weather_code);

  return (
    <div className="hero-panel">
      <div className="hero-panel-top">
        <div>
          <div className="hero-city">{city.name}, Punjab</div>
          <div className="hero-date">Live weather updates</div>
        </div>
        <LiveClock compact />
      </div>

      <div className="hero-temp-row">
        <div className="hero-icon">{icon}</div>
        <div>
          <div className="hero-temp">{round(c.temperature_2m)}°C</div>
          <div className="hero-desc">
            {label} · Feels like {round(c.apparent_temperature)}°C
          </div>
        </div>
      </div>

      <div className="hero-meta-row">
        <div className="hero-meta-item">
          Humidity
          <b>{round(c.relative_humidity_2m)}%</b>
        </div>
        <div className="hero-meta-item">
          Wind
          <b>{round(c.wind_speed_10m)} km/h</b>
        </div>
        <div className="hero-meta-item">
          Cloud
          <b>{round(c.cloud_cover)}%</b>
        </div>
        <div className="hero-meta-item">
          UV Index
          <b>{round(c.uv_index, 1)}</b>
        </div>
      </div>
    </div>
  );
}
