import { useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

async function request(endpoint, query) {
  if (!API_KEY) {
    throw new Error("Missing API key. Add VITE_WEATHER_API_KEY to your .env file and restart the dev server.");
  }
  const res = await fetch(`${BASE}/${endpoint}?${query}&appid=${API_KEY}&units=metric`);
  if (res.status === 404) throw new Error("City not found. Check the spelling and try again.");
  if (res.status === 401) throw new Error("API key is invalid or not active yet. New keys can take up to a couple of hours.");
  if (!res.ok) throw new Error("Something went wrong. Please try again.");
  return res.json();
}

export function useWeather() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const load = useCallback(async (query) => {
    setLoading(true);
    setError("");
    try {
      const [cur, fc] = await Promise.all([
        request("weather", query),
        request("forecast", query),
      ]);
      setCurrent(cur);
      setForecast(fc);
      return cur;
    } catch (err) {
      setError(err.message);
      setCurrent(null);
      setForecast(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

    const searchCity = useCallback(
    (city) => load(`q=${encodeURIComponent(city)}`),
    [load]
  );

  const searchCoords = useCallback(
    (lat, lon) => load(`lat=${lat}&lon=${lon}`),
    [load]
  );

  return { current, forecast, loading, error, searchCity, searchCoords };
}
