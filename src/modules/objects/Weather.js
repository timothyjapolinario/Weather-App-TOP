const weatherInterface = () => ({
  type: "weatherInterface",
});

const Weather = (weather, description, location, temperature, wind) => {
  const state = {
    weather,
    description,
    location,
    temperature,
    wind,
  };
  return Object.assign(Object.create(weatherInterface()), state);
};

export default Weather;
