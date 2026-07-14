import React from "react";

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

function normalizeEntry(entry) {
  // Handles both One Call ("temp" is a number) and the free
  // 5-day/3-hour endpoint ("main.temp") shapes.
  const temp = typeof entry.temp === "number" ? entry.temp : entry.main?.temp;
  const pop = entry.pop ?? 0;
  return { dt: entry.dt, temp, pop, weatherMain: entry.weather?.[0]?.main };
}

function formatHour(unixSeconds, timezoneOffsetSeconds) {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Horizontally scrollable strip of the next 24 hours, with
 * temperature and rain-probability for each slot.
 */
export default function HourlyForecast({ hourly, timezone, units }) {
  if (!hourly || hourly.length === 0) return null;
  const unitLabel = units === "metric" ? "°" : "°";

  return (
    <section className="hourly-forecast glass fade-in-up">
      <h3 className="section-title">
        <i className="bx bx-time-five"></i> Hourly Forecast
      </h3>
      <div className="hourly-scroll">
        {hourly.map((raw, i) => {
          const entry = normalizeEntry(raw);
          const icon = ICONS[entry.weatherMain] ?? "bx bxs-cloud";
          return (
            <div className="hourly-tile" key={entry.dt ?? i}>
              <span className="hourly-time">
                {i === 0 ? "Now" : formatHour(entry.dt, timezone)}
              </span>
              <i className={`${icon} hourly-icon`}></i>
              <span className="hourly-temp">
                {Math.round(entry.temp)}
                {unitLabel}
              </span>
              <span className="hourly-pop">
                <i className="bx bx-droplet"></i> {Math.round(entry.pop * 100)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
