const apiKey = "f9951458cf2047f50b872f8ac0ae22bd";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        showError("Please enter a city name!");
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();


        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const forecastResponse = await fetch(forecastURL);
const forecastData = await forecastResponse.json();

displayForecast(forecastData);

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity;

        document.getElementById("wind").textContent =
            data.wind.speed;

        document.getElementById("weatherIcon").textContent =
            getWeatherEmoji(data.weather[0].main);

        document.getElementById("weatherInfo").style.display = "block";

        showError("");

    } catch (error) {
        showError(error.message);
    }
}

function displayForecast(data) {

    const forecastContainer = document.getElementById("forecastContainer");

    forecastContainer.innerHTML = "";

    const dailyForecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.forEach(item => {

        const date = new Date(item.dt_txt);

        const day = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        const temperature = Math.round(item.main.temp);
        const condition = item.weather[0].main;
        const icon = getWeatherEmoji(condition);

        const forecastCard = document.createElement("div");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h3>${day}</h3>
            <p>${icon}</p>
            <p>${temperature}°C</p>
            <p>${condition}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

function getWeatherEmoji(condition) {

    const weatherIcons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️"
    };

    return weatherIcons[condition] || "🌤️";
}

function showError(message) {
    document.getElementById("errorMessage").textContent = message;
}