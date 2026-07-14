import React, { useMemo } from "react";

// Deterministic pseudo-random generator so re-renders don't jitter
// element positions (avoids a "new random layout every render" bug).
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Renders the full-viewport animated background: gradient + moving
 * clouds / rain / snow / lightning / fog / stars, swapped based on
 * the current weather's theme key. Purely decorative (aria-hidden).
 */
export default function WeatherBackground({ themeKey }) {
  const rand = useMemo(() => seededRandom(42), []);

  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        top: 5 + rand() * 40,
        scale: 0.6 + rand() * 0.9,
        duration: 40 + rand() * 40,
        delay: -rand() * 40,
      })),
    [rand]
  );

  const raindrops = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        left: rand() * 100,
        duration: 0.6 + rand() * 0.6,
        delay: rand() * 2,
      })),
    [rand]
  );

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 35 }, () => ({
        left: rand() * 100,
        duration: 6 + rand() * 8,
        delay: rand() * 8,
        size: 4 + rand() * 6,
      })),
    [rand]
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        top: rand() * 60,
        left: rand() * 100,
        delay: rand() * 4,
        size: 1 + rand() * 2,
      })),
    [rand]
  );

  const birds = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        top: 10 + rand() * 20,
        duration: 18 + rand() * 10,
        delay: -rand() * 20,
      })),
    [rand]
  );

  return (
    <div className={`weather-bg theme-${themeKey}`} aria-hidden="true">
      {/* Sun rays (sunny only) */}
      {themeKey === "sunny" && <div className="sun-glow" />}

      {/* Moon + stars (night only) */}
      {themeKey === "night" && (
        <>
          <div className="moon" />
          {stars.map((s, i) => (
            <span
              key={i}
              className="star"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Clouds (sunny / cloudy / rainy / storm / night) */}
      {themeKey !== "fog" &&
        clouds.map((c, i) => (
          <div
            key={i}
            className={`cloud cloud-${(i % 3) + 1}`}
            style={{
              top: `${c.top}%`,
              transform: `scale(${c.scale})`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}

      {/* Flying birds (sunny only) */}
      {themeKey === "sunny" &&
        birds.map((b, i) => (
          <div
            key={i}
            className="bird"
            style={{
              top: `${b.top}%`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <i className="bx bx-cross"></i>
          </div>
        ))}

      {/* Rain + splash (rainy / storm) */}
      {(themeKey === "rainy" || themeKey === "storm") &&
        raindrops.map((r, i) => (
          <span
            key={i}
            className="raindrop"
            style={{
              left: `${r.left}%`,
              animationDuration: `${r.duration}s`,
              animationDelay: `${r.delay}s`,
            }}
          />
        ))}

      {/* Lightning flash (storm only) */}
      {themeKey === "storm" && <div className="lightning-flash" />}

      {/* Snow (snow only) */}
      {themeKey === "snow" &&
        snowflakes.map((s, i) => (
          <span
            key={i}
            className="snowflake"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

      {/* Fog layers (fog only) */}
      {themeKey === "fog" && (
        <>
          <div className="fog-layer fog-layer-1" />
          <div className="fog-layer fog-layer-2" />
        </>
      )}
    </div>
  );
}
