// Maps an OpenWeatherMap "main" condition + isDay flag to one of our
// internal theme keys. Each key drives both the animated background
// (WeatherBackground.jsx) and the icon shown in cards.

export function getThemeKey(weatherMain, isDay) {
  const main = (weatherMain || "").toLowerCase();

  if (!isDay) return "night";
  if (main === "clear") return "sunny";
  if (main === "clouds") return "cloudy";
  if (["rain", "drizzle"].includes(main)) return "rainy";
  if (main === "thunderstorm") return "storm";
  if (main === "snow") return "snow";
  if (["mist", "fog", "haze", "smoke", "dust", "sand"].includes(main))
    return "fog";
  return "cloudy";
}

// Human-friendly gradient + accent labels per theme, used purely for
// the small text label under the background (kept subtle in the UI).
export const THEME_LABELS = {
  sunny: "Clear Skies",
  cloudy: "Cloudy",
  rainy: "Rainy",
  storm: "Thunderstorm",
  snow: "Snowfall",
  fog: "Foggy",
  night: "Clear Night",
};

// Determines whether "now" falls between the city's sunrise/sunset.
export function isDaytime(dtUnix, sunriseUnix, sunsetUnix) {
  return dtUnix >= sunriseUnix && dtUnix < sunsetUnix;
}
