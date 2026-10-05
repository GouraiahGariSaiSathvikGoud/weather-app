# Weatherly

A responsive React weather app that displays real-time conditions and a 5-day forecast using the OpenWeatherMap API.

## Features
- Search by city name or current GPS location
- Live conditions: temperature, feels like, humidity, wind, pressure, visibility, sunrise and sunset
- 5-day forecast
- °C / °F toggle
- Background that changes with weather and time of day
- Recent searches saved in localStorage
- Skeleton loading states and friendly error handling
- Fully responsive layout

## Tech Stack
React 19 (hooks: useState, useEffect, useCallback, custom hook), Vite, Tailwind CSS, Lucide icons, OpenWeatherMap API

## Setup
1. Clone the repo and run `npm install`
2. Create a `.env` file in the project root:
   `VITE_WEATHER_API_KEY=your_openweathermap_key`
3. Run `npm run dev`