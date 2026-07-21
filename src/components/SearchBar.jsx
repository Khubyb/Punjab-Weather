import React, { useEffect, useRef, useState } from 'react';
import { searchCities } from '../services/geocodingApi';
import { debounce } from '../utils/helpers';
import punjabCities from '../data/punjabCities';

export default function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearch = useRef(
    debounce(async (q) => {
      const results = await searchCities(q);
      setSuggestions(results);
      setHighlighted(-1);
    }, 280)
  ).current;

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const commit = (city) => {
    if (!city) return;
    onSelectCity(city);
    setQuery(city.name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlighted >= 0 && suggestions[highlighted]) {
        commit(suggestions[highlighted]);
      } else if (suggestions.length > 0) {
        commit(suggestions[0]);
      } else {
        // Fall back to an exact (case-insensitive) match against the full list
        const exact = punjabCities.find(
          (c) => c.name.toLowerCase() === query.trim().toLowerCase()
        );
        if (exact) commit(exact);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-wrap">
      <div className="search-box">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          placeholder="Search Lahore, Multan, Bahawalpur…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          onKeyDown={handleKeyDown}
          aria-label="Search for a city in Punjab"
          aria-autocomplete="list"
        />
        {query.length > 0 && (
          <button
            type="button"
            className="clear-btn"
            aria-label="Clear search"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
          >
            ✕
          </button>
        )}
        <button className="ripple" onClick={() => handleKeyDown({ key: 'Enter', preventDefault() {} })}>
          Search
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions" role="listbox">
          {suggestions.map((s, i) => (
            <button
              key={`${s.name}-${i}`}
              role="option"
              aria-selected={highlighted === i}
              className={highlighted === i ? 'highlighted' : ''}
              onMouseDown={() => commit(s)}
            >
              <span>{s.name}</span>
              <span aria-hidden="true">📍</span>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.trim().length > 0 && suggestions.length === 0 && (
        <div className="search-suggestions">
          <div style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No matching Punjab city found.
          </div>
        </div>
      )}
    </div>
  );
}
