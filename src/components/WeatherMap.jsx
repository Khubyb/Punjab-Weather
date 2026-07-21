import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import punjabCities from '../data/punjabCities';

// Leaflet's default marker icons reference image paths that don't survive
// bundling — rebuild them from the unpkg CDN so pins render correctly.
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [34, 55],
  iconAnchor: [17, 55],
  popupAnchor: [1, -46],
  className: 'selected-marker'
});

function Recenter({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], Math.max(map.getZoom(), 9), { duration: 0.8 });
  }, [lat, lon, map]);
  return null;
}

export default function WeatherMap({ city, onSelectCity }) {
  const [radarTile, setRadarTile] = useState(null);
  const [showRadar, setShowRadar] = useState(false);

  useEffect(() => {
    // RainViewer's public API needs no key and returns the latest radar frame path.
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then((r) => r.json())
      .then((data) => {
        const last = data?.radar?.past?.slice(-1)?.[0];
        if (last) setRadarTile(`${data.host}${last.path}/256/{z}/{x}/{y}/2/1_1.png`);
      })
      .catch(() => setRadarTile(null));
  }, []);

  return (
    <div>
      <div className="map-wrap">
        <MapContainer center={[city.lat, city.lon]} zoom={8} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showRadar && radarTile && <TileLayer url={radarTile} opacity={0.55} />}
          <Recenter lat={city.lat} lon={city.lon} />

          {punjabCities.map((c) => (
            <Marker
              key={c.name}
              position={[c.lat, c.lon]}
              icon={c.name === city.name ? selectedIcon : defaultIcon}
              eventHandlers={{ click: () => onSelectCity(c) }}
            >
              <Popup>
                <strong>{c.name}</strong>
                <br />
                Click "View weather" to load live conditions here.
                <br />
                <button
                  className="ripple"
                  style={{
                    marginTop: 6,
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 10px',
                    background: 'linear-gradient(135deg,#e8a93b,#c9542c)',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                  onClick={() => onSelectCity(c)}
                >
                  View weather
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-legend">
        <span>
          <span className="dot" /> Selected: {city.name}
        </span>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showRadar}
            onChange={(e) => setShowRadar(e.target.checked)}
            disabled={!radarTile}
          />
          Live rain radar {radarTile ? '' : '(unavailable)'}
        </label>
        <span>Zoom, pan, and click any marker to jump to that city's weather.</span>
      </div>
    </div>
  );
}
