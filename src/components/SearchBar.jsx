import React, { useMemo, useRef, useState } from "react";
import PUNJAB_CITIES from "../data/punjabCities";

/**
 * Search input with live autocomplete restricted to Punjab, Pakistan
 * cities, plus a "use my location" button and quick access to the
 * user's recent search history.
 */
export default function SearchBar({ onSearch, onUseLocation, history }) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => {
    if (!value.trim()) return [];
    const query = value.trim().toLowerCase();
    return PUNJAB_CITIES.filter((city) =>
      city.toLowerCase().startsWith(query)
    ).slice(0, 6);
  }, [value]);

  function submit(city) {
    const chosen = city ?? value;
    if (!chosen.trim()) return;
    onSearch(chosen.trim());
    setValue("");
    setShowSuggestions(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  }

  function handleKeyDown(e) {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") submit();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      submit(activeIndex >= 0 ? suggestions[activeIndex] : value);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div className="search-wrap">
      <div className="search-bar glass">
        <i className="bx bx-search search-icon"></i>
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Search any city in Punjab… (e.g. Multan)"
          onChange={(e) => {
            setValue(e.target.value);
            setShowSuggestions(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          onKeyDown={handleKeyDown}
          aria-label="Search for a city in Punjab"
        />
        <button className="search-btn" onClick={() => submit()}>
          Search
        </button>
        <button
          className="location-btn"
          onClick={onUseLocation}
          title="Use my current location"
          aria-label="Use my current location"
        >
          <i className="bx bx-current-location"></i>
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions glass">
          {suggestions.map((city, i) => (
            <li
              key={city}
              className={i === activeIndex ? "active" : ""}
              onMouseDown={() => submit(city)}
            >
              <i className="bx bx-map-pin"></i> {city}
            </li>
          ))}
        </ul>
      )}

      {showSuggestions && suggestions.length === 0 && history.length > 0 && !value && (
        <ul className="suggestions glass">
          <li className="suggestions-label">Recent searches</li>
          {history.slice(0, 5).map((city) => (
            <li key={city} onMouseDown={() => submit(city)}>
              <i className="bx bx-history"></i> {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
