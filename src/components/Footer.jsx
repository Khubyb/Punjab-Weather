import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="truck-stripe" style={{ marginBottom: 30 }} />
        <div className="footer-top">
          <div className="footer-col">
            <div className="brand" style={{ marginBottom: 10 }}>
              <span className="brand-mark">☀️</span>
              Punjab Weather
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', maxWidth: '32ch' }}>
              Live, animated weather for every city in Punjab — built entirely for the front end,
              no servers involved.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#weather">Weather</a></li>
              <li><a href="#forecast">Forecast</a></li>
              <li><a href="#map">Weather Map</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Data &amp; Credits</h4>
            <ul>
              <li><a href="https://open-meteo.com" target="_blank" rel="noreferrer">Weather data — Open-Meteo</a></li>
              <li><a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">Map tiles — OpenStreetMap</a></li>
              <li><a href="https://www.rainviewer.com" target="_blank" rel="noreferrer">Rain radar — RainViewer</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
