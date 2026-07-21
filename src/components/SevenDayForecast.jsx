import React, { useMemo } from 'react';
import { describeWeatherCode, round } from '../utils/helpers';
import { formatDayName, formatShortDate } from '../utils/formatDate';

export default function SevenDayForecast({ weather }) {
  const days = useMemo(() => {
    if (!weather?.daily) return [];
    const d = weather.daily;
    return d.time.map((t, i) => ({
      date: t,
      max: d.temperature_2m_max[i],
      min: d.temperature_2m_min[i],
      code: d.weather_code[i],
      wind: d.wind_speed_10m_max[i],
      rain: d.precipitation_probability_max[i]
    }));
  }, [weather]);

  if (days.length === 0) return null;

  return (
    <div className="days-grid">
      {days.map((day, i) => {
        const { label, icon } = describeWeatherCode(day.code);
        return (
          <div className="day-card" key={day.date}>
            <div className="day-name">{formatDayName(day.date, i)}</div>
            <div className="day-date">{formatShortDate(day.date)}</div>
            <div className="day-icon">{icon}</div>
            <div className="day-temps">
              {round(day.max)}° <span className="lo">/ {round(day.min)}°</span>
            </div>
            <div className="day-desc">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
