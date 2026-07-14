import React, { useMemo } from "react";

const ICONS = {
  Clear: "bx bx-sun",
  Clouds: "bx bxs-cloud",
  Rain: "bx bxs-cloud-rain",
  Drizzle: "bx bxs-cloud-rain",
  Thunderstorm: "bx bxs-cloud-lightning",
  Snow: "bx bxs-cloud-snow",
  Mist: "bx bx-water",
  Haze: "bx bx-water",
  Fog: "bx bx-water",
};

function formatDay(unixSeconds, timezoneOffsetSeconds, index) {
  if (index === 0) return "Today";
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

/**
 * 7-day (or up to 5-day on the free API tier) forecast list, plus a
 * lightweight animated bar chart visualizing the daily max temps.
 */
export default function Forecast({ daily, timezone, units }) {
  if (!daily || daily.length === 0) return null;
  const unitLabel = units === "metric" ? "°" : "°";

  const maxTemp = useMemo(
    () => Math.max(...daily.map((d) => d.temp.max)),
    [daily]
  );
  const minTemp = useMemo(
    () => Math.min(...daily.map((d) => d.temp.min)),
    [daily]
  );
  const range = Math.max(maxTemp - minTemp, 1);

  return (
    <section className="forecast glass fade-in-up">
      <h3 className="section-title">
        <i className="bx bx-calendar-week"></i> {daily.length}-Day Forecast
      </h3>

      <div className="forecast-chart" aria-hidden="true">
        {daily.map((day, i) => {
          const heightPct = ((day.temp.max - minTemp) / range) * 70 + 20;
          return (
            <div className="chart-bar-wrap" key={day.dt ?? i}>
              <div
                className="chart-bar"
                style={{ "--bar-height": `${heightPct}%`, "--bar-delay": `${i * 80}ms` }}
              >
                <span className="chart-bar-temp">{Math.round(day.temp.max)}°</span>
              </div>
              <span className="chart-bar-label">
                {formatDay(day.dt, timezone, i)}
              </span>
            </div>
          );
        })}
      </div>

      <ul className="forecast-list">
        {daily.map((day, i) => {
          const icon = ICONS[day.weather?.[0]?.main] ?? "bx bxs-cloud";
          return (
            <li className="forecast-row" key={day.dt ?? i}>
              <span className="forecast-day">{formatDay(day.dt, timezone, i)}</span>
              <i className={`${icon} forecast-icon`}></i>
              <span className="forecast-desc">{day.weather?.[0]?.description}</span>
              <span className="forecast-pop">
                <i className="bx bx-droplet"></i> {Math.round((day.pop ?? 0) * 100)}%
              </span>
              <span className="forecast-minmax">
                <b>{Math.round(day.temp.max)}{unitLabel}</b> / {Math.round(day.temp.min)}
                {unitLabel}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
