import { useState } from "react";
import { Search, LocateFixed, Clock } from "lucide-react";

function SearchBar({ onSearch, onLocate, recent, loading }) {
  const [city, setCity] = useState("");

    const submit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setCity("");
  };

    return (
    <div className="w-full max-w-xl">
      <form onSubmit={submit} className="glass flex items-center gap-2 rounded-full px-4 py-2">
        <Search size={20} className="text-white/80" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 bg-transparent py-1 text-white placeholder-white/60 outline-none"
        />

                <button
          type="button"
          onClick={onLocate}
          title="Use my location"
          className="rounded-full p-2 text-white transition hover:bg-white/20"
        >
          <LocateFixed size={20} />
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:scale-105 disabled:opacity-60"
        >
          Search
        </button>
      </form>

            {recent.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Clock size={16} className="text-white/70" />
          {recent.map((c) => (
            <button
              key={c}
              onClick={() => onSearch(c)}
              className="glass rounded-full px-3 py-1 text-sm text-white transition hover:bg-white/25"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

