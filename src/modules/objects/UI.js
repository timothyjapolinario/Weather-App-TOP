import { getWeather } from "../util/DataFetcher";
const searchBar = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");
const weatherType = document.querySelector(".weather-name");
const weatherLocation = document.querySelector(".weather-location");
const weatherTemperature = document.querySelector(".weather-temperature");
const weatherWind = document.querySelector(".weather-wind");
const weatherTime = document.querySelector(".weather-time");
const body = document.querySelector("body");
const initEvents = function initializeAllEvents() {
  searchButton.addEventListener("click", fetchWeather);
};

const fetchWeather = async function fetchWeatherInformation() {
  const location = searchBar.value;
  let weather = null;
  if (location != "") {
    try {
      weather = await getWeather(location);
    } catch (error) {
      console.log("Error Fetching Weather Data.");
      return;
    }
    updateUI(weather);
  }
};
const updateUI = function updateUI(weather) {
  console.log(weather);
  weatherType.innerText = weather.description;
  weatherLocation.innerText = weather.location;
  weatherTemperature.innerText = weather.temperature;
  weatherWind.innerText = weather.wind;
  weatherTime.innerText = weather.time;

  updateBackground(parseInt(weather.time.slice(0, 2)));
};

const updateBackground = function updateBackground(hour) {
  console.log(hour);
  if (hour >= 19 || hour < 6) {
    body.style.backgroundImage = 'url("./images/background/night-bg.jpg")';
    return;
  }
  if (hour >= 6 && hour < 11) {
    body.style.backgroundImage = 'url("./images/background/morning-bg.jpg")';
    return;
  }
  if (hour >= 11 && hour < 16) {
    body.style.backgroundImage = 'url("./images/background/noon-bg.jpg")';
    return;
  }
  if (hour >= 16 && hour < 19) {
    body.style.backgroundImage = 'url("./images/background/afternoon-bg.jpg")';
    return;
  }
};

export { initEvents };
