//To Read From:
const cityInput = document.getElementById('city-input');

//Get action from:
const searchButton = document.getElementById('search-button');

//Edit values:
const resultsBox = document.getElementById('results-box');
const tempImageBox = document.getElementById('temp-image-box');
const cityName = document.getElementById('city-name');

const time = document.getElementById('time');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const feels = document.getElementById('feels');
const windSpeed = document.getElementById('wind-speed');

const tempImage = document.getElementById('temp-image');
const apiKey = "693d39a9738c9be1289b108ff8308900";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

searchButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `${baseURL}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;
    console.log('Requesting weather:', url);

    let cityNameFromAPI;

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
        cityNameFromAPI = data.name;
        const humidityResponse = data.main.humidity;
        const feelsLikeResponse = data.main.feels_like;
        const windResponse = data.wind.speed;

        const timeString = new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "2-digit"
        });

        cityName.textContent = cityNameFromAPI;
        temperature.textContent = temp + " °F";
        condition.textContent = description.charAt(0).toUpperCase() + description.slice(1);
        time.textContent = timeString;
        humidity.innerHTML = "Humidity:<br>" + humidityResponse + " %";
        feels.innerHTML = "Feels like:<br>" + feelsLikeResponse + " °F";
        windSpeed.innerHTML = "Wind Speed:<br>" + windResponse + " mph";


        resultsBox.classList.remove("hidden");
        tempImageBox.classList.remove("hidden");

        // Set a basic placeholder while we load Wikipedia
        //tempImage.src = "placeholder.jpg";

        console.log("Weather API data:", data);
    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the weather data. Please try again later.');
        return;
    }

    // Use cityNameFromAPI if we got it; fall back to input city
    const wikiTitle = cityNameFromAPI || city;
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        wikiTitle
    )}&prop=pageimages&piprop=thumbnail&pithumbsize=400&format=json&origin=*`;

    console.log('Requesting Wikipedia:', wikiUrl);

    try {
        const wikiResponse = await fetch(wikiUrl);
        const wikiData = await wikiResponse.json();
        console.log('Wiki data:', wikiData);

        let cityImageUrl = null;

        if (wikiData.query && wikiData.query.pages) {
            const pages = wikiData.query.pages;
            const pageId = Object.keys(pages)[0];
            const page = pages[pageId];

            if (page && page.thumbnail && page.thumbnail.source) {
                cityImageUrl = page.thumbnail.source;
            }
        }

        if (cityImageUrl) {
            tempImage.src = cityImageUrl;
            tempImage.style.display = "block";
        } else {
            console.log("No city image found on Wikipedia for", wikiTitle);
            tempImage.style.display = "none";
        }
    } catch (wikiError) {
        console.error("Wiki fetch error:", wikiError);
    }
});
