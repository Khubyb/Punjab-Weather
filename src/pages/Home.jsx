import React from 'react';
import SearchBar from '../components/SearchBar.jsx';
import CurrentWeather from '../components/CurrentWeather.jsx';
import WeatherCards from '../components/WeatherCards.jsx';
import HourlyForecast from '../components/HourlyForecast.jsx';
import SevenDayForecast from '../components/SevenDayForecast.jsx';
import { Spinner, SkeletonCards } from '../components/Loader.jsx';
import MapPage from './MapPage.jsx';
import punjabCities from '../data/punjabCities';

function ErrorCard({ error, onRetry }) {
  const titles = {
    offline: "You're offline",
    timeout: 'Request timed out',
    api: 'Weather service unavailable'
  };
  return (
    <div className="error-card">
      <h3>{titles[error.type] || 'Something went wrong'}</h3>
      <p>{error.message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}

export default function Home({ city, weather, airQuality, loading, error, selectCity, retry }) {
  return (
    <>
      {/* -------------------- Hero / Home -------------------- */}
      <section id="home" className="hero">
        <div className="container hero-content">
          <div>
            <div className="hero-eyebrow">Punjab, Pakistan · Live Forecast</div>
            <h1 className="hero-title">
              Know the sky over <span>every city in Punjab</span>
            </h1>
            <SearchBar onSelectCity={selectCity} selectedCity={city} />
          </div>

          {loading ? (
            <Spinner label={`Loading weather for ${city.name}…`} />
          ) : error ? (
            <ErrorCard error={error} onRetry={retry} />
          ) : (
            <CurrentWeather city={city} weather={weather} />
          )}
        </div>
      </section>

      {/* -------------------- Current conditions -------------------- */}
      <section id="weather" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Current Conditions</h2>
              <p className="section-sub">Detailed live readings for {city.name}</p>
            </div>
          </div>
          {loading ? (
            <SkeletonCards count={9} />
          ) : error ? (
            <ErrorCard error={error} onRetry={retry} />
          ) : (
            <WeatherCards weather={weather} />
          )}
        </div>
      </section>

      {/* -------------------- Hourly + 7-day forecast -------------------- */}
      <section id="forecast" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Hourly Forecast</h2>
              <p className="section-sub">Next 24 hours</p>
            </div>
          </div>
          {loading ? (
            <SkeletonCards count={8} />
          ) : error ? (
            <ErrorCard error={error} onRetry={retry} />
          ) : (
            <HourlyForecast weather={weather} />
          )}
        </div>

        <div className="container" style={{ marginTop: 46 }}>
          <div className="section-head">
            <div>
              <h2 className="section-title">7-Day Forecast</h2>
              <p className="section-sub">Plan the week ahead across Punjab</p>
            </div>
          </div>
          {loading ? (
            <SkeletonCards count={7} />
          ) : error ? (
            <ErrorCard error={error} onRetry={retry} />
          ) : (
            <SevenDayForecast weather={weather} />
          )}
        </div>
      </section>

      {/* -------------------- Map -------------------- */}
      <MapPage city={city} onSelectCity={selectCity} />

      {/* -------------------- About -------------------- */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-card">
            <h3>About Punjab Weather</h3>
            <p>
              Punjab Weather is a front-end-only forecasting app covering all {punjabCities.length}+
              major cities of Punjab, from Lahore and Faisalabad to Rahim Yar Khan and Bhakkar.
              Every reading — temperature, wind, humidity, and the 7-day outlook — is pulled live
              from open weather APIs, with no backend server involved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
