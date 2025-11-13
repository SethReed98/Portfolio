# WeatherNow Dashboard

A modern, responsive weather dashboard that displays current weather conditions and a 5-day forecast. Built to demonstrate API integration skills and modern web design.

## Features

- **Current Weather Display** - Temperature, conditions, humidity, wind speed, and pressure
- **5-Day Forecast** - Extended weather predictions
- **City Search** - Look up weather for any city
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Demo Mode** - Works out-of-the-box with sample data for popular cities
- **Modern UI** - Clean, gradient design with smooth animations

## Demo Cities

The application currently runs in demo mode with data for:
- London
- Tokyo
- New York
- Paris
- Sydney

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling, gradients, grid layout, animations
- **JavaScript (ES6+)** - Async/await, fetch API (demo mode uses local data)
- **Object-Oriented Design** - Clean, maintainable code structure

## API Integration (Optional Enhancement)

This project is designed to integrate with the OpenWeatherMap API. To use real weather data:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Update the `app.js` file to use the fetch API:

```javascript
async fetchWeather(city) {
    const API_KEY = 'your_api_key_here';
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return await response.json();
}
```

## Features Demonstrated

- **Async Operations** - Simulated API calls with loading states
- **Error Handling** - User-friendly error messages
- **State Management** - Clean view state transitions
- **Responsive Layout** - Mobile-first CSS Grid
- **Modern JavaScript** - ES6+ classes, async/await, arrow functions
- **User Experience** - Loading indicators, smooth transitions

## Running the App

Simply open `index.html` in any modern web browser. No build process required!

## Code Highlights

- Object-oriented architecture with `WeatherDashboard` class
- Promise-based async operations
- Dynamic DOM manipulation
- CSS Grid for responsive layout
- CSS custom properties for theming
- Smooth state transitions

## Future Enhancements

- Live API integration with OpenWeatherMap
- Geolocation support for automatic location detection
- Hourly forecast
- Weather maps and radar
- Historical weather data
- Save favorite locations
- Unit conversion (Celsius/Fahrenheit)
- Dark mode toggle

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Screenshots

[Add screenshots here]

## Live Demo

[Try the app](#) <!-- Update with your deployed URL -->
