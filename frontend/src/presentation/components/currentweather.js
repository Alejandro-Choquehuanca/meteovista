function renderCurrentWeather(weatherForecast, translate) {
  const container = document.createElement("div");
  container.className = "current-weather-card";

  const title = document.createElement("h3");
  title.textContent = weatherForecast.location.getFullName();

  const temperature = document.createElement("p");
  temperature.className = "current-temperature";
  temperature.textContent = `${Math.round(weatherForecast.currentWeather.temperature)}°C`;

  const summary = document.createElement("p");
  summary.textContent = `${translate("weather.current")}: ${Math.round(
    weatherForecast.currentWeather.temperature
  )}°C`;

  const details = document.createElement("p");
  details.textContent = `${translate("weather.humidity")}: ${weatherForecast.currentWeather.humidity}% · ${translate("weather.wind")}: ${Math.round(
    weatherForecast.currentWeather.windSpeed
  )} km/h`;

  container.append(title, temperature, summary, details);
  return container;
}

export { renderCurrentWeather };
export default renderCurrentWeather;
