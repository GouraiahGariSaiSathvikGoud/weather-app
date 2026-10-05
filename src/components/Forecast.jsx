import { groupForecast, toUnit, weekday } from "../utils/weather";

function Forecast({ forecast, unit }) {
  const tz = forecast.city.timezone;
  const days = groupForecast(forecast.list, tz);

    return (
    <section className="glass animate-fade-up w-full max-w-xl rounded-3xl p-6 text-white">
      <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-white/70">
        5-Day Forecast
      </h3>
      <ul className="divide-y divide-white/10">
        {days.map((d, i) => (
          <li key={d.dt} className="flex items-center justify-between py-2">
            <span className="w-16 font-medium">{i === 0 ? "Today" : weekday(d.dt, tz)}</span>

                        <img
              src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
              alt={d.description}
              className="h-10 w-10"
            />
            <span className="hidden flex-1 px-3 text-sm capitalize text-white/80 sm:block">
              {d.description}
            </span>
            <span className="text-white/70">{toUnit(d.min, unit)}°</span>
            <span className="ml-3 w-10 text-right font-semibold">{toUnit(d.max, unit)}°</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Forecast;

