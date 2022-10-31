import Weather from "../objects/Weather";
const mapRawToWeatherObject = (raw) => {
  const weather = Weather(
    raw.weather[0].main,
    raw.weather[0].description,
    raw.weather[0].icon,
    raw.name,
    raw.main.temp,
    raw.wind.speed,
    raw.time
  );
  return weather;
};

export { mapRawToWeatherObject };
