import { mapRawToWeatherObject } from "./WeatherMapper";
import { getTimezonesForCountry } from "countries-and-timezones";
import { getCurrentTimeFromUTC } from "./Time";

const weatherAPIKey = "505fa3efb086bd23d8571b744ea64b69";
const getWeather = async function dataFetcherFromWeatherAPI(location) {
  try {
    const weatherData = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPIKey}`,
      { mode: "cors" }
    )
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const timeZone = getTimeZone(data.sys.country, data.name);
        const time = getCurrentTimeFromUTC(timeZone);
        data.time = time;
        const weather = mapRawToWeatherObject(data);
        return weather;
      });
    return weatherData;
  } catch (error) {
    console.log("Error fetching data of weather");
  }
};
//https://timeapi.io/api/Time/current/coordinate?latitude=14.6042&longitude=120.9822
const getTimeZone = function dataFetcherFromTimeApi(countryCode, name) {
  const notOnList = {
    Africa: "ZA",
  };
  if (!countryCode) {
    countryCode = notOnList[name];
  }
  const region = getTimezonesForCountry(countryCode).filter((region) => {
    return region.name.split("/")[1] === name;
  });
  if (region[0]) {
    return region[0].utcOffsetStr;
  }
  return getTimezonesForCountry(countryCode)[0].utcOffsetStr;
};

export { getWeather, weatherAPIKey };
