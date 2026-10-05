import { useEffect, useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { getTheme } from "./utils/weather";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DetailsGrid from "./components/DetailsGrid";
import Forecast from "./components/Forecast";
import Skeleton from "./components/Skeleton";

function App() {
  const { current, forecast, loading, error, searchCity, searchCoords } = useWeather();
  const [unit, setUnit] = useState("C");
  const [geoError, setGeoError] = useState("");

    const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentCities")) || [];
    } catch {
      return [];
    }
  });
  const [initialCity] = useState(() => recent[0] || "London");

    const addRecent = (name) => {
    const updated = [name, ...recent.filter((c) => c !== name)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

    const handleSearch = async (city) => {
    setGeoError("");
    const data = await searchCity(city);
    if (data) addRecent(data.name);
  };

    const handleLocate = () => {
    setGeoError("");
    if (!navigator.geolocation) {
      setGeoError("Your browser does not support location access.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const data = await searchCoords(pos.coords.latitude, pos.coords.longitude);
        if (data) addRecent(data.name);
      },
      () => setGeoError("Location access was denied.")
    );
  };

    useEffect(() => {
    searchCity(initialCity);
  }, [searchCity, initialCity]);

    const theme = current
    ? getTheme(current.weather[0].main, current.weather[0].icon)
    : getTheme("Default");

      return (
    <div className="relative isolate min-h-screen">
      <div
        key={theme.key}
        className="animate-fade-in fixed inset-0 -z-10"
        style={{ background: theme.gradient }}
      />

            <main className="flex flex-col items-center gap-6 px-4 py-10">
        <header className="flex w-full max-w-xl items-center justify-between text-white">
          <h1 className="text-3xl font-bold tracking-tight">Weatherly</h1>
          <div className="glass flex rounded-full p-1">
            {["C", "F"].map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`rounded-full px-4 py-1 text-sm font-medium transition ${
                  unit === u ? "bg-white text-gray-900" : "text-white"
                }`}
              >
                °{u}
              </button>
            ))}
          </div>
        </header>

                <SearchBar
          onSearch={handleSearch}
          onLocate={handleLocate}
          recent={recent}
          loading={loading}
        />

        {(error || geoError) && (
          <p className="glass rounded-xl px-4 py-3 text-white">⚠ {error || geoError}</p>
        )}

                {loading ? (
          <Skeleton />
        ) : (
          current &&
          forecast && (
            <>
              <CurrentWeather data={current} unit={unit} />
              <DetailsGrid data={current} unit={unit} />
              <Forecast forecast={forecast} unit={unit} />
            </>
          )
        )}

                <footer className="pb-4 text-xs text-white/60">
          Weather data from OpenWeatherMap
        </footer>
      </main>
    </div>
  );
}

export default App;

