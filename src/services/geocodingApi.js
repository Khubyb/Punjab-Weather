import axios from 'axios';
import punjabCities from '../data/punjabCities';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

/**
 * Searches the static Punjab city list first (instant, always-relevant),
 * then falls back to the live Open-Meteo geocoding API for anything else
 * the user might type, filtered to Pakistan so stray global matches don't
 * show up in a "Punjab Weather" search box.
 */
export async function searchCities(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const localMatches = punjabCities.filter((city) =>
    city.name.toLowerCase().includes(trimmed.toLowerCase())
  );

  if (localMatches.length > 0 || trimmed.length < 3) {
    return localMatches.map((c) => ({ ...c, source: 'local' }));
  }

  try {
    const { data } = await axios.get(GEOCODING_URL, {
      params: { name: trimmed, count: 8, language: 'en', format: 'json' },
      timeout: 8000
    });
    const results = data?.results || [];
    return results
      .filter((r) => r.country_code === 'PK')
      .map((r) => ({
        name: r.admin1 && r.admin1 !== r.name ? `${r.name}, ${r.admin1}` : r.name,
        lat: r.latitude,
        lon: r.longitude,
        source: 'remote'
      }));
  } catch (err) {
    return [];
  }
}
