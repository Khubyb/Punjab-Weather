import React, { useCallback, useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import Forecast from "./components/Forecast.jsx";
import MapSection from "./components/MapSection.jsx";
import Loader from "./components/Loader.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import Developer from "./components/Developer.jsx";
import ErrorView from "./components/ErrorView.jsx";
import Toast from "./components/Toast.jsx";
import WeatherBackground from "./components/WeatherBackground.jsx";

import useDarkMode from "./hooks/useDarkMode.js";
import {
  geocodeCity,
  fetchCurrentWeather,
  fetchForecast,
  fetchAirQuality,
} from "./services/weatherAPI.js";
import { getThemeKey, isDaytime } from "./utils/weatherTheme.js";

const DEFAULT_CITY = "Bahawalpur";
const HISTORY_KEY = "pwp-history";
const FAVORITES_KEY = "pwp-favorites";

export default function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [units, setUnits] = useState("metric");
  const [activeSection, setActiveSection] = useState("home");

  const [location, setLocation] = useState(null); // { lat, lon, name, country }
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // { hourly, daily, source }
  const [aqi, setAqi] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) ?? [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  /**
   * Core data-loading pipeline: geocode -> current weather -> forecast
   * + AQI in parallel. Any failure surfaces the "City Not Found" /
   * generic error view rather than a blank screen.
   */
  const loadCity = useCallback(
    async (cityName) => {
      setLoading(true);
      setError(null);
      try {
        const geo = await geocodeCity(cityName);
        setLocation(geo);

        const [weatherData, forecastData, aqiData] = await Promise.all([
          fetchCurrentWeather(geo.lat, geo.lon, units),
          fetchForecast(geo.lat, geo.lon, units),
          fetchAirQuality(geo.lat, geo.lon).catch(() => null),
        ]);

        setWeather(weatherData);
        setForecast(forecastData);
        setAqi(aqiData);

        setHistory((prev) => {
          const next = [geo.name, ...prev.filter((c) => c !== geo.name)].slice(0, 8);
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
          return next;
        });
      } catch (err) {
        console.error(err);
        setWeather(null);
        setForecast(null);
        setAqi(null);
        setError(
          err.code === "CITY_NOT_FOUND"
            ? `We couldn't find "${cityName}" in Punjab. Check the spelling and try again.`
            : "Something went wrong fetching the weather. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  // Initial load with the default city.
  useEffect(() => {
    loadCity(DEFAULT_CITY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch whenever the units toggle changes, as long as we already
  // have a resolved location.
  useEffect(() => {
    if (location) loadCity(location.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  // Track online/offline status for the "offline" UI message.
  useEffect(() => {
    function goOnline() {
      setIsOffline(false);
      showToast("Back online");
    }
    function goOffline() {
      setIsOffline(true);
      showToast("You're offline — showing last known data");
    }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [showToast]);

  // Keyboard shortcut: "/" focuses search, "d" toggles dark mode.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        document.querySelector(".search-bar input")?.focus();
      }
      if (e.key.toLowerCase() === "d" && document.activeElement.tagName !== "INPUT") {
        setIsDark((v) => !v);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setIsDark]);

  function handleUseLocation() {
    if (!navigator.geolocation) {
      showToast("Geolocation isn't supported on this browser");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const [weatherData, forecastData, aqiData] = await Promise.all([
            fetchCurrentWeather(lat, lon, units),
            fetchForecast(lat, lon, units),
            fetchAirQuality(lat, lon).catch(() => null),
          ]);
          setLocation({ lat, lon, name: weatherData.name, country: weatherData.sys.country });
          setWeather(weatherData);
          setForecast(forecastData);
          setAqi(aqiData);
          setError(null);
        } catch (err) {
          setError("Couldn't fetch weather for your current location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        showToast("Location access denied");
      }
    );
  }

  function toggleFavorite() {
    if (!location) return;
    setFavorites((prev) => {
      const exists = prev.includes(location.name);
      const next = exists
        ? prev.filter((c) => c !== location.name)
        : [...prev, location.name];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      showToast(exists ? "Removed from favorites" : "Added to favorites");
      return next;
    });
  }

  const now = weather ? weather.dt : Math.floor(Date.now() / 1000);
  const dayNow = weather
    ? isDaytime(now, weather.sys.sunrise, weather.sys.sunset)
    : true;
  const themeKey = weather ? getThemeKey(weather.weather[0]?.main, dayNow) : "sunny";

  function scrollToSection(id) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app-root">
      <WeatherBackground themeKey={themeKey} />

      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
      />

      {loading && <Loader />}

      {!loading && (
        <main>
          <section id="home" className="hero-section">
            <h1 className="hero-title fade-in-up">
              <i className="bx bxs-cloud-rain hero-icon"></i> Punjab Weather Pro
            </h1>
            <p className="hero-subtitle fade-in-up">
              Real-time, beautiful weather for every city in Punjab
            </p>
            <div className="hero-datetime fade-in-up">
              <span>
                <i className="bx bx-calendar"></i>{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>
                <i className="bx bx-time"></i>{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <SearchBar onSearch={loadCity} onUseLocation={handleUseLocation} history={history} />

            {isOffline && (
              <p className="offline-banner">
                <i className="bx bx-wifi-off"></i> You're offline — showing the last data we loaded.
              </p>
            )}
          </section>

          <section id="weather" className="page-section">
            {error && <ErrorView message={error} onRetry={() => loadCity(DEFAULT_CITY)} />}

            {!error && weather && (
              <>
                <WeatherCard
                  weather={weather}
                  aqi={aqi}
                  themeKey={themeKey}
                  units={units}
                  onToggleUnits={() =>
                    setUnits((u) => (u === "metric" ? "imperial" : "metric"))
                  }
                  isFavorite={favorites.includes(location?.name)}
                  onToggleFavorite={toggleFavorite}
                />
                <HourlyForecast
                  hourly={forecast?.hourly}
                  timezone={weather.timezone}
                  units={units}
                />
                <Forecast daily={forecast?.daily} timezone={weather.timezone} units={units} />
                <MapSection lat={location?.lat} lon={location?.lon} name={location?.name} />
              </>
            )}
          </section>

          <About />
          <Developer />
          <Footer />
        </main>
      )}

      <Toast message={toast} />
    </div>
  );
}
