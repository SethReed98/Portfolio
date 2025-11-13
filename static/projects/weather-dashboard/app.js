class WeatherDashboard {
    constructor() {
        // Demo mode data
        this.demoData = {
            'london': { city: 'London', country: 'GB', temp: 15, feels: 13, desc: 'Cloudy', humidity: 75, wind: 5.2, pressure: 1013, icon: '☁️' },
            'tokyo': { city: 'Tokyo', country: 'JP', temp: 22, feels: 21, desc: 'Partly Cloudy', humidity: 65, wind: 3.8, pressure: 1015, icon: '⛅' },
            'new york': { city: 'New York', country: 'US', temp: 18, feels: 16, desc: 'Clear', humidity: 55, wind: 4.5, pressure: 1012, icon: '☀️' },
            'paris': { city: 'Paris', country: 'FR', temp: 16, feels: 14, desc: 'Rainy', humidity: 80, wind: 6.1, pressure: 1010, icon: '🌧️' },
            'sydney': { city: 'Sydney', country: 'AU', temp: 25, feels: 24, desc: 'Sunny', humidity: 60, wind: 4.2, pressure: 1018, icon: '☀️' }
        };

        this.initElements();
        this.initEventListeners();
        this.showWelcome();
    }

    initElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.errorMessage = document.getElementById('errorMessage');
        this.retryBtn = document.getElementById('retryBtn');
        this.weatherData = document.getElementById('weatherData');
        this.welcome = document.getElementById('welcome');

        // Weather elements
        this.cityName = document.getElementById('cityName');
        this.currentDate = document.getElementById('currentDate');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.temperature = document.getElementById('temperature');
        this.weatherDesc = document.getElementById('weatherDesc');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.forecast = document.getElementById('forecast');
    }

    initEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.retryBtn.addEventListener('click', () => this.handleSearch());
    }

    async handleSearch() {
        const city = this.searchInput.value.trim();
        if (!city) return;

        this.showLoading();

        // Simulate API delay
        await this.sleep(1000);

        const weatherData = this.getDemoData(city);

        if (weatherData) {
            this.displayWeather(weatherData);
        } else {
            this.showError(`City "${city}" not found in demo mode. Try: London, Tokyo, New York, Paris, or Sydney.`);
        }
    }

    getDemoData(city) {
        const normalizedCity = city.toLowerCase().trim();
        return this.demoData[normalizedCity];
    }

    displayWeather(data) {
        // Hide other views
        this.hideAll();
        this.weatherData.style.display = 'block';

        // Update current weather
        this.cityName.textContent = `${data.city}, ${data.country}`;
        this.currentDate.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        this.weatherIcon.textContent = data.icon;
        this.temperature.textContent = `${Math.round(data.temp)}°C`;
        this.weatherDesc.textContent = data.desc;
        this.feelsLike.textContent = `${Math.round(data.feels)}°C`;
        this.humidity.textContent = `${data.humidity}%`;
        this.windSpeed.textContent = `${data.wind} m/s`;
        this.pressure.textContent = `${data.pressure} hPa`;

        // Generate forecast
        this.displayForecast(data);
    }

    displayForecast(baseData) {
        const days = ['Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const icons = ['☀️', '⛅', '☁️', '🌧️', '⛈️'];
        const descriptions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'];

        this.forecast.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const tempVariation = Math.floor(Math.random() * 6) - 3;
            const temp = baseData.temp + tempVariation;
            const iconIndex = Math.floor(Math.random() * icons.length);

            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <div class="forecast-day">${days[i]}</div>
                <div class="forecast-icon">${icons[iconIndex]}</div>
                <div class="forecast-temp">${Math.round(temp)}°C</div>
                <div class="forecast-desc">${descriptions[iconIndex]}</div>
            `;
            this.forecast.appendChild(card);
        }
    }

    showLoading() {
        this.hideAll();
        this.loading.style.display = 'block';
    }

    showError(message) {
        this.hideAll();
        this.error.style.display = 'block';
        this.errorMessage.textContent = message;
    }

    showWelcome() {
        this.hideAll();
        this.welcome.style.display = 'block';
    }

    hideAll() {
        this.loading.style.display = 'none';
        this.error.style.display = 'none';
        this.weatherData.style.display = 'none';
        this.welcome.style.display = 'none';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});
