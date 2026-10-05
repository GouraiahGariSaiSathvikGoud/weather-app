import { MapPin } from "lucide-react";
import { toUnit, formatDate, formatTime } from "../utils/weather";

function CurrentWeather({ data, unit }) {
  const { name, sys, main, weather, timezone, dt } = data;
  const w = weather[0];

    return (
    <section className="glass animate-fade-up w-full max-w-xl rounded-3xl p-8 text-center text-white">
      <div className="flex items-center justify-center gap-2 text-xl font-medium">
        <MapPin size={20} />
        {name}, {sys.country}
      </div>
      <p className="mt-1 text-sm text-white/70">
        {formatDate(dt, timezone)} · {formatTime(dt, timezone)}
      </p>

            <img
        src={`https://openweathermap.org/img/wn/${w.icon}@4x.png`}
        alt={w.description}
        className="animate-float mx-auto h-40 w-40 drop-shadow-2xl"
      />

            <p className="text-8xl font-light">{toUnit(main.temp, unit)}°</p>
      <p className="mt-2 text-xl capitalize">{w.description}</p>
      <p className="mt-1 text-white/80">
        Feels like {toUnit(main.feels_like, unit)}° · H {toUnit(main.temp_max, unit)}° · L {toUnit(main.temp_min, unit)}°
      </p>
    </section>
  );
}

export default CurrentWeather;

