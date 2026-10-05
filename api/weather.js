export default async function handler(req, res) {
  const allowed = ["q", "lat", "lon", "units"];
  const params = new URLSearchParams({ units: "metric" });
  for (const k of allowed) {
    if (req.query[k]) params.set(k, req.query[k]);
  }
  params.set("appid", process.env.OPENWEATHER_API_KEY);

  const r = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`
  );
  res.status(r.status).json(await r.json());
}