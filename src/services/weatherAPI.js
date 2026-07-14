// =============================================================
// weatherAPI.js
// Thin wrapper around the OpenWeatherMap REST API.
//
// Required setup:
//   1. Create a free account at https://openweathermap.org/api
//   2. Copy your API key into a `.env` file at the project root:
//        VITE_OPENWEATHER_API_KEY=your_key_here
//   3. Restart the dev server after adding the key (Vite only
//      reads .env files on startup).
//
// Notes on plan limits:
//   - Geocoding, Current Weather, 5 day/3 hour Forecast and Air
//     Pollution all work on OpenWeatherMap's free "Student" tier.
//   - The 16-day/daily forecast and "One Call 3.0" endpoints
//     require a paid subscription. This service tries One Call 3.0
//     first (for a true 7-day + hourly forecast) and automatically
//     falls back to the free 5-day/3-hour endpoint, grouping it
//     into daily buckets, if the request fails (e.g. 401/403).
// =============================================================

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

/**
 * Small helper to fetch JSON and throw a readable error on failure.
 */
async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const err = new Error(`Request failed with status ${response.status}`);
    err.status = response.status;
    throw err;
  }
  return response.json();
}

/**
 * Resolve a free-text city name to coordinates using the Geocoding API.
 * We append ",PK" so "Multan" resolves to Multan, Punjab, Pakistan
 * rather than a same-named place elsewhere in the world.
 */
export async function geocodeCity(cityName) {
  const query = encodeURIComponent(`${cityName},PK`);
  const url = `${BASE_URL}/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`;
  const data = await getJSON(url);

  if (!data || data.length === 0) {
    const err = new Error("CITY_NOT_FOUND");
    err.code = "CITY_NOT_FOUND";
    throw err;
  }

  const { lat, lon, name, country, state } = data[0];
  return { lat, lon, name, country, state };
}

/**
 * Current weather conditions for a given coordinate pair.
 */
export async function fetchCurrentWeather(lat, lon, units = "metric") {
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  return getJSON(url);
}

/**
 * Air Quality Index for a given coordinate pair.
 * OpenWeatherMap returns an AQI on a 1 (Good) to 5 (Very Poor) scale.
 */
export async function fetchAirQuality(lat, lon) {
  const url = `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const data = await getJSON(url);
  return data?.list?.[0] ?? null;
}

/**
 * Attempts a true 7-day + hourly forecast via One Call 3.0.
 * Falls back to the free 5-day/3-hour endpoint, reshaped into the
 * same { hourly, daily } shape the UI expects, if One Call is
 * unavailable on the current API key/plan.
 */
export async function fetchForecast(lat, lon, units = "metric") {
  try {
    const url = `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${API_KEY}`;
    const data = await getJSON(url);
    return {
      source: "onecall",
      hourly: data.hourly.slice(0, 24),
      daily: data.daily.slice(0, 7),
    };
  } catch (err) {
    // Fallback: free 5 day / 3 hour forecast endpoint
    const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
    const data = await getJSON(url);
    return {
      source: "forecast5",
      hourly: data.list.slice(0, 8), // next 24h in 3h steps
      daily: groupIntoDailyBuckets(data.list),
    };
  }
}

/**
 * Groups 3-hour forecast entries from the free tier into daily
 * min/max/representative buckets so the 7-day (up to 5-day) UI can
 * render consistently regardless of which endpoint served the data.
 */
function groupIntoDailyBuckets(list) {
  const byDay = {};

  list.forEach((entry) => {
    const dateKey = entry.dt_txt.split(" ")[0];
    if (!byDay[dateKey]) byDay[dateKey] = [];
    byDay[dateKey].push(entry);
  });

  return Object.entries(byDay).map(([date, entries]) => {
    const temps = entries.map((e) => e.main.temp);
    // Prefer the entry closest to midday as the "representative" icon/description
    const midday = entries.reduce((closest, e) => {
      const hour = Number(e.dt_txt.split(" ")[1].split(":")[0]);
      const closestHour = Number(closest.dt_txt.split(" ")[1].split(":")[0]);
      return Math.abs(hour - 12) < Math.abs(closestHour - 12) ? e : closest;
    }, entries[0]);

    return {
      dt: midday.dt,
      temp: { min: Math.min(...temps), max: Math.max(...temps) },
      weather: midday.weather,
      pop: Math.max(...entries.map((e) => e.pop ?? 0)),
    };
  });
}

/**
 * Maps an OpenWeatherMap AQI (1-5) to a human label + color token
 * used by the WeatherCard UI.
 */
export function describeAQI(aqi) {
  const table = {
    1: { label: "Good", color: "var(--aqi-good)" },
    2: { label: "Fair", color: "var(--aqi-fair)" },
    3: { label: "Moderate", color: "var(--aqi-moderate)" },
    4: { label: "Poor", color: "var(--aqi-poor)" },
    5: { label: "Very Poor", color: "var(--aqi-very-poor)" },
  };
  return table[aqi] ?? { label: "Unknown", color: "var(--aqi-unknown)" };
}
