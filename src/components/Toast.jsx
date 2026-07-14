import React from "react";

/**
 * Simple animated toast, e.g. "Offline — showing last known data",
 * "Added to favorites", etc. Pass `null` message to hide.
 */
export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast glass fade-in-up" role="status">
      <i className="bx bx-bell"></i> {message}
    </div>
  );
}
