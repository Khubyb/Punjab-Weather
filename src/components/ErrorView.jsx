import React from "react";

/**
 * Friendly "not found" / generic error state with a retry action.
 */
export default function ErrorView({ message, onRetry }) {
  return (
    <div className="error-view glass fade-in-up">
      <i className="bx bx-cloud-light-rain error-illustration shake"></i>
      <h2>City Not Found</h2>
      <p>{message || "We couldn't find weather data for that city. Please check the spelling and try again."}</p>
      <button className="retry-btn" onClick={onRetry}>
        <i className="bx bx-refresh"></i> Try Again
      </button>
    </div>
  );
}
