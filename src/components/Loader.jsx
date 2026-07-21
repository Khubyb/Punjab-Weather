import React from 'react';

export function Spinner({ label = 'Fetching live weather…' }) {
  return (
    <div className="loader-wrap">
      <div className="spinner" role="status" aria-label="Loading" />
      <p>{label}</p>
    </div>
  );
}

export function SkeletonCards({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton skeleton-card" />
      ))}
    </div>
  );
}
