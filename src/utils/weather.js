const THEMES = {
  Clear: {
    day: "linear-gradient(135deg, #56ccf2, #2f80ed)",
    night: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  },
  Clouds: {
    day: "linear-gradient(135deg, #7f8fa6, #4b6584)",
    night: "linear-gradient(135deg, #232526, #414345)",
  },
  Rain: {
    day: "linear-gradient(135deg, #373b44, #4286f4)",
    night: "linear-gradient(135deg, #141e30, #243b55)",
  },
  Thunderstorm: {
    day: "linear-gradient(135deg, #2c3e50, #4b3f72)",
    night: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  },
  Snow: {
    day: "linear-gradient(135deg, #5b86e5, #36d1dc)",
    night: "linear-gradient(135deg, #3a4a6b, #6b7fa6)",
  },
  Mist: {
    day: "linear-gradient(135deg, #606c88, #3f4c6b)",
    night: "linear-gradient(135deg, #2b323e, #3f4c6b)",
  },
  Default: {
    day: "linear-gradient(135deg, #667eea, #764ba2)",
    night: "linear-gradient(135deg, #1e1b4b, #312e81)",
  },
};
const GROUPS = {
  Drizzle: "Rain",
  Smoke: "Mist", Haze: "Mist", Dust: "Mist", Fog: "Mist",
  Sand: "Mist", Ash: "Mist", Squall: "Mist", Tornado: "Mist",
};
export function getTheme(main, icon = "") {
  const key = GROUPS[main] || main;
  const set = THEMES[key] || THEMES.Default;
  const isNight = icon.endsWith("n");
  return { key: `${key}-${isNight ? "n" : "d"}`, gradient: isNight ? set.night : set.day };
}
export const toUnit = (celsius, unit) =>
  unit === "F" ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);
export const windSpeed = (ms, unit) =>
  unit === "F" ? `${(ms * 2.237).toFixed(1)} mph` : `${(ms * 3.6).toFixed(1)} km/h`;
export const visibilityText = (meters = 0, unit) =>
  unit === "F" ? `${(meters / 1609.34).toFixed(1)} mi` : `${(meters / 1000).toFixed(1)} km`;

const shift = (ts, tz) => new Date((ts + tz) * 1000);
export const formatTime = (ts, tz) =>
  shift(ts, tz).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
export const formatDate = (ts, tz) =>
  shift(ts, tz).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" });

export const weekday = (ts, tz) =>
  shift(ts, tz).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });

const hourOf = (item, tz) => new Date((item.dt + tz) * 1000).getUTCHours();

export function groupForecast(list, tz) {
  const byDay = {};
  list.forEach((item) => {
    const day = new Date((item.dt + tz) * 1000).toISOString().slice(0, 10);
    (byDay[day] ||= []).push(item);
  });

    return Object.values(byDay)
    .slice(0, 5)
    .map((items) => {
      const midday = items.reduce((best, cur) =>
        Math.abs(hourOf(cur, tz) - 12) < Math.abs(hourOf(best, tz) - 12) ? cur : best
      );
      return {
        dt: midday.dt,
        icon: midday.weather[0].icon.replace("n", "d"),
        description: midday.weather[0].description,
        min: Math.min(...items.map((i) => i.main.temp_min)),
        max: Math.max(...items.map((i) => i.main.temp_max)),
      };
    });
}
