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

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Plase enter a city name.");
        return;
    }

    cityName.textContent = city;
    temperature.textContent = "70°F";
    condition.textContent = "Foggy";
    time.textContent = "12:00 PM";

    resultsBox.classList.remove("hidden");
    tempImage.src = "placeholder.jpg";
});