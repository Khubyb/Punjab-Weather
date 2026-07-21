# Weather-Website
# 🌾 Punjab Weather

A premium, front-end-only weather app for every city in Punjab, Pakistan — built with React, Vite, and vanilla CSS. No backend, no server, no database: everything runs in the browser and talks directly to free public APIs.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![No Backend](https://img.shields.io/badge/Backend-None-success)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- **Live current conditions** — temperature, feels-like, humidity, wind, pressure, UV index, cloud cover, rain chance, sunrise/sunset
- **Hourly forecast rail** for the next 24 hours and a full **7-day forecast grid**
- **Smart city search** — instant local suggestions for every major Punjab city, with live geocoding fallback for anything not in the list
- **Interactive Leaflet + OpenStreetMap** view of every major Punjab city, with an optional live **rain radar overlay** (RainViewer)
- **Condition-driven animated background** — sun glow, drifting clouds, rain, snow, lightning flashes, and fog, all reacting to the real-time weather code
- **Dark mode by default**, with a light/dark toggle remembered via `localStorage`
- **Fully responsive** layout, keyboard-focus visible, and `prefers-reduced-motion` respected throughout

## 🛠️ Tech Stack

React 18 · Vite · Leaflet / react-leaflet · Axios — no Node/Express/Firebase/PHP/Python backend of any kind.

## 🌐 APIs Used (all free, no API key required)

| API | Purpose |
|---|---|
| [Open-Meteo Forecast API](https://open-meteo.com) | Current, hourly, and daily weather |
| [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) | City search fallback |
| [OpenStreetMap](https://www.openstreetmap.org) | Map tiles |
| [RainViewer](https://www.rainviewer.com) | Live rain radar overlay |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (defaults to `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```text
Punjab-Weather/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css              # design tokens, resets, theme variables
│   ├── style.css              # layout & component styles, animations
│   ├── components/            # Navbar, SearchBar, CurrentWeather, HourlyForecast,
│   │                          # SevenDayForecast, WeatherCards, WeatherMap, Footer,
│   │                          # Loader, ThemeToggle, LiveClock, WeatherBackground
│   ├── pages/                 # Home, MapPage
│   ├── services/               # weatherApi.js, geocodingApi.js
│   ├── hooks/                   # useWeather.js, useTheme.js
│   ├── utils/                     # formatDate.js, helpers.js
│   └── data/                       # punjabCities.js
├── index.html
├── package.json
└── vite.config.js
```

## 🗺️ City Coverage

Ships with 30+ major Punjab cities out of the box — Lahore, Faisalabad, Rawalpindi, Multan, Gujranwala, Sialkot, Bahawalpur, Sargodha, Sheikhupura, Gujrat, and more — with any city not on the list resolved live through geocoding.

## 📝 Notes

- The rain radar overlay is treated as an optional enhancement — if that API is briefly unavailable, the rest of the app keeps working.
- The city search checks the built-in Punjab city list first, then falls back to live geocoding (filtered to Pakistan) for anything not already listed.
- Dark mode is the default theme; the toggle in the navbar switches to light mode and remembers your choice.
