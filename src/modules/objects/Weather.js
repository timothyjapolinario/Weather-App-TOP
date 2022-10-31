const weatherInterface = () => ({
  type: "weatherInterface",
});

const Weather = (
  weather,
  description,
  imageIcon,
  location,
  temperature,
  wind,
  time
) => {
  const state = {
    weather,
    description,
    imageIcon,
    location,
    temperature,
    wind,
    time,
  };
  state.temperature = Math.round(temperature - 273.15) + "°C";
  state.wind = wind + "m/s";
  return Object.assign(Object.create(weatherInterface()), state);
};

export default Weather;
