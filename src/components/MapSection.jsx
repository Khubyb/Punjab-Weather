import React from "react";

/**
 * Embeds an interactive OpenStreetMap view centered on the current
 * city's coordinates. Uses OSM's free embed endpoint, so no API key
 * is required.
 */
export default function MapSection({ lat, lon, name }) {
  if (lat == null || lon == null) return null;

  const delta = 0.15;
  const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <section className="map-section glass fade-in-up">
      <h3 className="section-title">
        <i className="bx bx-map"></i> {name} on the Map
      </h3>
      <div className="map-frame-wrap">
        <iframe
          title={`Map of ${name}`}
          src={src}
          className="map-frame"
          loading="lazy"
        />
      </div>
    </section>
  );
}
