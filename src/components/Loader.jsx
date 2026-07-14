import React from "react";

/**
 * Full-screen loading experience shown while the initial weather
 * fetch (default city) is in flight, and briefly on subsequent
 * searches for a consistent, premium feel.
 */
export default function Loader() {
  return (
    <div className="loader-screen" role="status" aria-live="polite">
      <div className="loader-logo">
        <i className="bx bx-sun loader-icon"></i>
        <span className="loader-title">Punjab Weather Pro</span>
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill"></div>
      </div>
      <p className="loader-subtext">Fetching the skies over Punjab…</p>
    </div>
  );
}
