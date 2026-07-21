// Maps WMO weather codes (used by Open-Meteo) to a human description,
// an emoji-style icon glyph, and a "condition family" that drives which
// animated background/effect is shown (see WeatherBackground.jsx).
const WEATHER_CODE_MAP = {
  0: { label: 'Clear sky', icon: '☀️', family: 'clear' },
  1: { label: 'Mainly clear', icon: '🌤️', family: 'clear' },
  2: { label: 'Partly cloudy', icon: '⛅', family: 'cloudy' },
  3: { label: 'Overcast', icon: '☁️', family: 'cloudy' },
  45: { label: 'Fog', icon: '🌫️', family: 'fog' },
  48: { label: 'Depositing rime fog', icon: '🌫️', family: 'fog' },
  51: { label: 'Light drizzle', icon: '🌦️', family: 'rain' },
  53: { label: 'Moderate drizzle', icon: '🌦️', family: 'rain' },
  55: { label: 'Dense drizzle', icon: '🌧️', family: 'rain' },
  56: { label: 'Light freezing drizzle', icon: '🌧️', family: 'rain' },
  57: { label: 'Dense freezing drizzle', icon: '🌧️', family: 'rain' },
  61: { label: 'Slight rain', icon: '🌦️', family: 'rain' },
  63: { label: 'Moderate rain', icon: '🌧️', family: 'rain' },
  65: { label: 'Heavy rain', icon: '🌧️', family: 'rain' },
  66: { label: 'Light freezing rain', icon: '🌧️', family: 'rain' },
  67: { label: 'Heavy freezing rain', icon: '🌧️', family: 'rain' },
  71: { label: 'Slight snow fall', icon: '🌨️', family: 'snow' },
  73: { label: 'Moderate snow fall', icon: '❄️', family: 'snow' },
  75: { label: 'Heavy snow fall', icon: '❄️', family: 'snow' },
  77: { label: 'Snow grains', icon: '❄️', family: 'snow' },
  80: { label: 'Slight rain showers', icon: '🌦️', family: 'rain' },
  81: { label: 'Moderate rain showers', icon: '🌧️', family: 'rain' },
  82: { label: 'Violent rain showers', icon: '⛈️', family: 'thunder' },
  85: { label: 'Slight snow showers', icon: '🌨️', family: 'snow' },
  86: { label: 'Heavy snow showers', icon: '❄️', family: 'snow' },
  95: { label: 'Thunderstorm', icon: '⛈️', family: 'thunder' },
  96: { label: 'Thunderstorm, slight hail', icon: '⛈️', family: 'thunder' },
  99: { label: 'Thunderstorm, heavy hail', icon: '⛈️', family: 'thunder' }
};

export function describeWeatherCode(code) {
  return WEATHER_CODE_MAP[code] || { label: 'Unknown', icon: '🌡️', family: 'clear' };
}

export function conditionFamily(code, isDay = 1) {
  const { family } = describeWeatherCode(code);
  if (family === 'clear' && !isDay) return 'night';
  return family;
}

export function aqiLabel(aqi) {
  if (aqi == null) return { label: 'N/A', tone: 'neutral' };
  if (aqi <= 50) return { label: 'Good', tone: 'good' };
  if (aqi <= 100) return { label: 'Moderate', tone: 'moderate' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', tone: 'poor' };
  if (aqi <= 200) return { label: 'Unhealthy', tone: 'poor' };
  if (aqi <= 300) return { label: 'Very Unhealthy', tone: 'severe' };
  return { label: 'Hazardous', tone: 'severe' };
}

export function windDirectionLabel(deg) {
  if (deg == null) return '—';
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function round(value, digits = 0) {
  if (value == null || Number.isNaN(value)) return '—';
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
