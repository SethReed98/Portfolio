# Weather Dashboard

Weather app with current conditions and 5-day forecast. Originally wanted to use a real weather API but ran into rate limiting on the free tier, so it's running in demo mode for now.

## How it works

Search for a city and it shows current weather plus forecast. Currently works with London, Tokyo, New York, Paris, and Sydney (hardcoded data).

Mobile version stacks everything vertically instead of the grid layout. Works pretty well on my phone.

## The API situation

Built it to work with OpenWeatherMap API but their free tier is 60 calls/hour which isn't enough for a portfolio demo site. For now it's using demo data.

If you want to hook up the real API:
```javascript
// in app.js, replace getDemoData with actual fetch
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_KEY&units=metric`);
```

## Tech

- Vanilla JS with async/await
- CSS Grid for the layout
- Some gradients that I'm pretty happy with

## Mobile stuff

Font size on the search input is 16px to avoid iOS zoom (learned that from the notes app). Touch targets are all 44px minimum.

## Open index.html

Works right in the browser, no build.

## TODO

- Actually get a paid API key or find a better free one
- Add geolocation to auto-detect city
- Maybe hourly forecast too
- Dark mode would be consistent with the main site

The design is pretty clean though, happy with how it turned out.
