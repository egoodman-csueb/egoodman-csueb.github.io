//To Read From:
const cityInput = document.getElementById('city-input');

//Get action from:
const searchButton = document.getElementById('search-button');

//Edit values:
const resultsBox = document.getElementById('results-box');
const cityName = document.getElementById('city-name');

const time = document.getElementById('time');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');

const tempImage = document.getElementById('temp-image');
const apiKey = "693d39a9738c9be1289b108ff8308900";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";


searchButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Plase enter a city name.");
        return;
    }

    const url = `${baseURL}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;
    console.log('Requesting:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert("City not found, try again.");
            return;
        }

        const data = await response.json();
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const timestamp = data.dt;
        const cityNameFromAPI = data.name;

        const timeString = new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit" });

        cityName.textContent = cityNameFromAPI;
        temperature.textContent = temp;
        condition.textContent = description;
        time.textContent = timeString;

        resultsBox.classList.remove("hidden");
        tempImage.src = "placeholder.jpg";
        console.log("API data", data);


    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the weather data. Please try again later.');
    }
});