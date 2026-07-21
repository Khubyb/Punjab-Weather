import React from 'react';
import WeatherMap from '../components/WeatherMap.jsx';

export default function MapPage({ city, onSelectCity }) {
  return (
    <section id="map" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">Interactive Weather Map</h2>
            <p className="section-sub">
              Explore every city in Punjab. Zoom, pan, and click a marker to view its weather.
            </p>
          </div>
        </div>
        <WeatherMap city={city} onSelectCity={onSelectCity} />
      </div>
    </section>
  );
}
