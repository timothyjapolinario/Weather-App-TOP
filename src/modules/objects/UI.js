import { getWeather } from "../util/DataFetcher";
const searchBar = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");
const weatherType = document.querySelector(".weather-name");
const weatherLocation = document.querySelector(".weather-location");
const weatherTemperature = document.querySelector(".weather-temperature");
const weatherWind = document.querySelector(".weather-wind");
const weatherTime = document.querySelector(".weather-time");
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
};

export { initEvents };
