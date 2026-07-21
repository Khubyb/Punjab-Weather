import React, { useMemo } from 'react';

/**
 * Renders a fixed, full-viewport animated background whose look changes
 * with the current condition family: clear, night, cloudy, rain, snow,
 * fog, or thunder. Purely decorative — aria-hidden.
 */
export default function WeatherBackground({ family = 'clear' }) {
  const clouds = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        top: 8 + i * 14 + Math.random() * 6,
        size: 90 + Math.random() * 90,
        duration: 30 + Math.random() * 20,
        delay: -Math.random() * 20
      })),
    []
  );

  const raindrops = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: Math.random() * 100,
        duration: 0.6 + Math.random() * 0.6,
        delay: Math.random() * 2
      })),
    []
  );

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 34 }).map(() => ({
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 6
      })),
    []
  );

  const showClouds = ['cloudy', 'rain', 'thunder', 'clear'].includes(family);
  const showRain = family === 'rain' || family === 'thunder';
  const showSnow = family === 'snow';
  const showFog = family === 'fog';
  const showSun = family === 'clear';
  const showLightning = family === 'thunder';

  return (
    <div className={`weather-bg ${family}`} aria-hidden="true">
      {showSun && <div className="sun-glow" />}

      {showClouds &&
        clouds.map((c, i) => (
          <div
            key={i}
            className="cloud"
            style={{
              top: `${c.top}%`,
              width: c.size,
              height: c.size * 0.5,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`
            }}
          />
        ))}

      {showRain &&
        raindrops.map((r, i) => (
          <div
            key={i}
            className="raindrop"
            style={{
              left: `${r.left}%`,
              animationDuration: `${r.duration}s`,
              animationDelay: `${r.delay}s`
            }}
          />
        ))}

      {showSnow &&
        snowflakes.map((s, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`
            }}
          />
        ))}

      {showFog && (
        <>
          <div className="fog-layer" style={{ top: '20%' }} />
          <div className="fog-layer" style={{ top: '45%', animationDuration: '24s' }} />
          <div className="fog-layer" style={{ top: '70%', animationDuration: '20s' }} />
        </>
      )}

      {showLightning && <div className="lightning-flash" />}
    </div>
  );
}
