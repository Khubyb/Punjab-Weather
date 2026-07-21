import axios from 'axios';

// Open-Meteo is used because it is free, requires no API key, and allows
// direct browser (CORS) requests — a hard requirement for a backend-less app.
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

const CURRENT_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'precipitation',
  'weather_code',
  'cloud_cover',
  'pressure_msl',
  'wind_speed_10m',
  'wind_direction_10m',
  'uv_index'
].join(',');

const HOURLY_FIELDS = [
  'temperature_2m',
  'precipitation_probability',
  'weather_code',
  'wind_speed_10m',
  'relative_humidity_2m'
].join(',');

const DAILY_FIELDS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'sunrise',
  'sunset',
  'precipitation_probability_max',
  'wind_speed_10m_max',
  'uv_index_max'
].join(',');

/**
 * Fetches current + hourly + 7-day forecast for a single coordinate pair.
 */
export async function fetchWeather(lat, lon) {
  const { data } = await axios.get(FORECAST_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current: CURRENT_FIELDS,
      hourly: HOURLY_FIELDS,
      daily: DAILY_FIELDS,
      timezone: 'auto',
      forecast_days: 7
    },
    timeout: 12000
  });
  return data;
}

/**
 * Fetches air quality (US AQI + PM2.5) for a coordinate pair. Not every
 * location has AQI coverage, so callers should treat failures as optional.
 */
export async function fetchAirQuality(lat, lon) {
  const { data } = await axios.get(AIR_QUALITY_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'us_aqi,pm2_5',
      timezone: 'auto'
    },
    timeout: 12000
  });
  return data;
}
