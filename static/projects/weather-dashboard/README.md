# Weather Dashboard

Weather app with current conditions and 5-day forecast. Originally wanted to use a real weather API but ran into rate limiting on the free tier, so it's running in demo mode for now.

## The Problem

Need to demonstrate API integration, async/await patterns, and data visualization skills in a portfolio project. Most weather apps use the same free APIs with severe rate limits (60 calls/hour), making them impractical for portfolio demos that get multiple visitors.

## My Solution

Built a weather dashboard with a switchable data source - designed to integrate with OpenWeatherMap API but running in demo mode for portfolio purposes. Implemented proper async/await error handling, loading states, and responsive data visualization. The architecture allows easy switching between demo and live API modes.

## Impact

- Clean API abstraction layer - swap demo/live data in one function
- Responsive grid layout that works seamlessly on mobile (stacks vertically)
- Proper loading states and error handling for real-world API scenarios
- Demonstrates understanding of API rate limits and practical solutions
- Touch-optimized inputs (16px font-size prevents iOS zoom)

## Features

- Current weather conditions (temperature, humidity, wind speed)
- 5-day weather forecast
- Search functionality for major cities
- Responsive mobile layout
- Weather icons and visual indicators

## Demo Mode

Currently running with hardcoded demo data for the following cities:
- London
- Tokyo
- New York
- Paris
- Sydney

## API Integration

This application is designed to integrate with the OpenWeatherMap API. To connect to the live API:

1. Sign up for an API key at [OpenWeatherMap](https://openweathermap.org/api)
2. In `app.js`, replace the `getDemoData()` call with:

```javascript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
);
const data = await response.json();
```

**Note:** The free tier has a limit of 60 calls/hour, which may not be sufficient for high-traffic portfolio demos.

## Technologies Used

- **JavaScript:** ES6+ with async/await
- **CSS Grid:** Responsive layout system
- **CSS Gradients:** Custom weather-themed styling

## Mobile stuff

Font size on the search input is 16px to avoid iOS zoom (learned that from the notes app). Touch targets are all 44px minimum.

## Running the Application

No build process required. Open `index.html` in any modern web browser.

## TODO

- Actually get a paid API key or find a better free one
- Add geolocation to auto-detect city
- Maybe hourly forecast too
- Dark mode would be consistent with the main site

The design is pretty clean though, happy with how it turned out.
