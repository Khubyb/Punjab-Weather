import React, { useMemo } from 'react';
import { describeWeatherCode, round } from '../utils/helpers';
import { formatHour } from '../utils/formatDate';

export default function HourlyForecast({ weather }) {
  const hours = useMemo(() => {
    if (!weather?.hourly) return [];
    const now = new Date();
    const times = weather.hourly.time;
    const startIdx = times.findIndex((t) => new Date(t) >= now);
    const from = startIdx === -1 ? 0 : startIdx;
    return times.slice(from, from + 24).map((t, i) => {
      const idx = from + i;
      return {
        time: t,
        temp: weather.hourly.temperature_2m[idx],
        code: weather.hourly.weather_code[idx],
        rain: weather.hourly.precipitation_probability[idx],
        wind: weather.hourly.wind_speed_10m[idx],
        humidity: weather.hourly.relative_humidity_2m[idx]
      };
    });
  }, [weather]);

  if (hours.length === 0) return null;

  return (
    <div className="hourly-rail hscroll">
      {hours.map((h) => {
        const { icon } = describeWeatherCode(h.code);
        return (
          <div className="hour-card" key={h.time}>
            <div className="hour-time">{formatHour(h.time)}</div>
            <div className="hour-icon">{icon}</div>
            <div className="hour-temp">{round(h.temp)}°C</div>
            <div className="hour-rain">💧 {round(h.rain)}%</div>
          </div>
        );
      })}
    </div>
  );
}
