import React from 'react';
import { round, windDirectionLabel } from '../utils/helpers';
import { formatClockTime } from '../utils/formatDate';

export default function WeatherCards({ weather }) {
  if (!weather?.current || !weather?.daily) return null;
  const c = weather.current;
  const d = weather.daily;

  const items = [
    { label: 'Feels Like', value: `${round(c.apparent_temperature)}°C`, icon: '🌡️' },
    { label: 'Humidity', value: `${round(c.relative_humidity_2m)}%`, icon: '💧' },
    {
      label: 'Wind',
      value: `${round(c.wind_speed_10m)} km/h`,
      sub: windDirectionLabel(c.wind_direction_10m),
      icon: '🍃'
    },
    { label: 'Pressure', value: `${round(c.pressure_msl)} hPa`, icon: '📟' },
    { label: 'UV Index', value: round(c.uv_index, 1), icon: '🔆' },
    { label: 'Cloud Cover', value: `${round(c.cloud_cover)}%`, icon: '☁️' },
    { label: 'Rain Chance', value: `${round(d.precipitation_probability_max?.[0])}%`, icon: '🌧️' },
    { label: 'Sunrise', value: d.sunrise ? formatClockTime(d.sunrise[0]) : '—', icon: '🌅' },
    { label: 'Sunset', value: d.sunset ? formatClockTime(d.sunset[0]) : '—', icon: '🌇' }
  ];

  return (
    <div className="cards-grid">
      {items.map((item) => (
        <div className="info-card" key={item.label}>
          <div className="label">
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </div>
          <div className="value">{item.value}</div>
          {item.sub && <div className="sub-value">{item.sub}</div>}
        </div>
      ))}
    </div>
  );
}
