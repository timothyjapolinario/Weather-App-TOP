import { getWeather } from "../util/DataFetcher";
const searchForm = document.querySelector(".search-box-form");
const searchBox = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");
const weatherName = document.querySelector(".weather-name");
const weatherLocation = document.querySelector(".weather-location");
const weatherTemperature = document.querySelector(".weather-temperature");
const weatherWind = document.querySelector(".weather-wind");
const weatherTime = document.querySelector(".weather-time");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.querySelector("body");

const initEvents = function initializeAllEvents() {
  fetchWeather("Manila");
  searchForm.addEventListener("submit", (e) => {
    console.log("PUTANGNA");
    const location = searchBox.value;
    e.preventDefault();

    fetchWeather(location);
  });

  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const location = searchBox.value;
    fetchWeather(location);
  });
};

const fetchWeather = async function fetchWeatherInformation(location) {
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
  const hour = parseInt(weather.time.slice(0, 2));
  weatherName.querySelector(".weather-name-text").innerText =
    capitalizeEveryWord(weather.description);
  weatherLocation.innerText = weather.location;
  weatherTemperature.innerText = weather.temperature;
  weatherWind.innerText = "Wind Speed: " + weather.wind;
  if (hour < 10) {
    weatherTime.innerText = "0" + weather.time;
  } else {
    weatherTime.innerText = weather.time;
  }
  //"./images/weather-icons/01d.png"

  weatherIcon.src = `./images/weather-icons/${weather.imageIcon}.png`;
  updateBackground(hour);
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
const capitalizeEveryWord = function capitalizeEveryWord(word) {
  const wordList = word.split(" ");
  const capitalized = wordList
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return capitalized;
};

export { initEvents };
