import { useCallback, useEffect, useState } from 'react';
import { fetchWeather, fetchAirQuality } from '../services/weatherApi';
import punjabCities from '../data/punjabCities';

const DEFAULT_CITY = punjabCities.find((c) => c.name === 'Lahore') || punjabCities[0];

export default function useWeather() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (targetCity) => {
    if (!navigator.onLine) {
      setError({ type: 'offline', message: 'No internet connection. Reconnect to see live weather.' });
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(targetCity.lat, targetCity.lon);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError({
        type: err.code === 'ECONNABORTED' ? 'timeout' : 'api',
        message:
          err.code === 'ECONNABORTED'
            ? 'The weather service took too long to respond. Please try again.'
            : 'Could not load weather for this city right now. Please try again shortly.'
      });
      setLoading(false);
      return;
    }

    // Air quality is a nice-to-have; failures here should never break the page.
    try {
      const aq = await fetchAirQuality(targetCity.lat, targetCity.lon);
      setAirQuality(aq);
    } catch (err) {
      setAirQuality(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load(city);
  }, [city, load]);

  const selectCity = useCallback((nextCity) => {
    if (!nextCity || nextCity.lat == null || nextCity.lon == null) return;
    setCity(nextCity);
  }, []);

  const retry = useCallback(() => load(city), [load, city]);

  return { city, weather, airQuality, loading, error, selectCity, retry };
}
