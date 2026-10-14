import WeatherCodeService from "../../domain/services/weathercodeservices.js";

const weatherCodeService = new WeatherCodeService();

function renderForecastCard(dayForecast, translate) {
  const card = document.createElement("article");
  card.className = "forecast-card";

  const date = document.createElement("p");
  date.className = "forecast-date";
  date.textContent = new Date(dayForecast.date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const icon = document.createElement("div");
  icon.className = "forecast-icon";
  const weatherInfo = weatherCodeService.getWeatherInfo(dayForecast.weatherCode, true);
  icon.textContent = weatherInfo.icon;

  const label = document.createElement("p");
  label.textContent = translate(weatherInfo.translationKey);

  const tempRange = document.createElement("p");
  tempRange.textContent = `${Math.round(dayForecast.minTemp)}° / ${Math.round(dayForecast.maxTemp)}°`;

  card.append(date, icon, label, tempRange);
  return card;
}

export { renderForecastCard };
export default renderForecastCard;
