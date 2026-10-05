import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset } from "lucide-react";
import { windSpeed, visibilityText, formatTime } from "../utils/weather";

function DetailsGrid({ data, unit }) {
  const { main, wind, visibility, sys, timezone } = data;

  const items = [
    { icon: Droplets, label: "Humidity", value: `${main.humidity}%` },
    { icon: Wind, label: "Wind", value: windSpeed(wind.speed, unit) },
    { icon: Gauge, label: "Pressure", value: `${main.pressure} hPa` },
    { icon: Eye, label: "Visibility", value: visibilityText(visibility, unit) },
    { icon: Sunrise, label: "Sunrise", value: formatTime(sys.sunrise, timezone) },
    { icon: Sunset, label: "Sunset", value: formatTime(sys.sunset, timezone) },
  ];

    return (
    <section className="grid w-full max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map(({ icon: Icon, label, value }, i) => (
        <div
          key={label}
          className="glass animate-fade-up rounded-2xl p-4 text-white"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <Icon size={20} className="text-white/80" />
          <p className="mt-2 text-xs uppercase tracking-wide text-white/70">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      ))}
    </section>
  );
}

export default DetailsGrid;

