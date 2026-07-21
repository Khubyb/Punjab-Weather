import React from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WeatherBackground from './components/WeatherBackground.jsx';
import Home from './pages/Home.jsx';
import useWeather from './hooks/useWeather.js';
import useTheme from './hooks/useTheme.js';
import { conditionFamily } from './utils/helpers';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { city, weather, airQuality, loading, error, selectCity, retry } = useWeather();

  const family = weather?.current
    ? conditionFamily(weather.current.weather_code, weather.current.is_day)
    : 'clear';

  return (
    <div className="app">
      <WeatherBackground family={family} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Home
        city={city}
        weather={weather}
        airQuality={airQuality}
        loading={loading}
        error={error}
        selectCity={selectCity}
        retry={retry}
      />
      <Footer />
    </div>
  );
}
