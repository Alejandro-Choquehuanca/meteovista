import { renderCurrentWeather } from "../components/currentweather.js";
import { renderForecastCard } from "../components/forecastcard.js";

function renderWeatherView({ currentWeatherSection, forecastList, weatherForecast, translate }) {
  if (!currentWeatherSection || !forecastList) {
    return;
  }

  currentWeatherSection.innerHTML = "";
  forecastList.innerHTML = "";

  if (!weatherForecast || !weatherForecast.isValid()) {
    currentWeatherSection.textContent = translate("weather.initialMessage");
    return;
  }

  const currentWeather = renderCurrentWeather(weatherForecast, translate);
  currentWeatherSection.appendChild(currentWeather);

  weatherForecast.dailyForecast.forEach((forecastDay) => {
    forecastList.appendChild(renderForecastCard(forecastDay, translate));
  });
}

export { renderWeatherView };
export default renderWeatherView;
