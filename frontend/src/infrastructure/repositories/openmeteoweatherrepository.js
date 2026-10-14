import WeatherRepository from "../../domain/repositories/weatherrepository.js";
import Location from "../../domain/entities/Location.js";
import WeatherForecast from "../../domain/entities/watherforecast.js";
import WeatherCodeService from "../../domain/services/weathercodeservices.js";

class OpenMeteoWeatherRepository extends WeatherRepository {
  constructor({ geocodingApi, openMeteoApi, weatherCodeService } = {}) {
    super();
    this.geocodingApi = geocodingApi;
    this.openMeteoApi = openMeteoApi;
    this.weatherCodeService = weatherCodeService ?? new WeatherCodeService();
  }

  async searchLocations(cityName, countryCode = "") {
    const results = await this.geocodingApi.searchLocations(cityName, countryCode);

    return results
      .map(
        (result) =>
          new Location(
            result.name ?? "",
            result.country ?? "",
            Number(result.latitude),
            Number(result.longitude),
            result.country_code ?? ""
          )
      )
      .filter((location) => location.isValid());
  }

  async getWeatherForecast(locationOrLatitude, longitude = null) {
    const location =
      typeof locationOrLatitude === "object" && locationOrLatitude !== null
        ? locationOrLatitude
        : new Location(
            "Selected city",
            "Selected country",
            Number(locationOrLatitude),
            Number(longitude)
          );

    const weatherData = await this.openMeteoApi.getForecast(
      location.latitude,
      location.longitude
    );

    const current = weatherData.current ?? {};
    const daily = Array.isArray(weatherData.daily?.time)
      ? weatherData.daily.time.map((date, index) => ({
          date,
          weatherCode: weatherData.daily.weather_code?.[index] ?? 0,
          maxTemp: weatherData.daily.temperature_2m_max?.[index] ?? 0,
          minTemp: weatherData.daily.temperature_2m_min?.[index] ?? 0,
          precipitationProbability:
            weatherData.daily.precipitation_probability_max?.[index] ?? 0,
        }))
      : [];

    const currentWeather = {
      temperature: Number(current.temperature_2m ?? 0),
      humidity: Number(current.relative_humidity_2m ?? 0),
      windSpeed: Number(current.wind_speed_10m ?? 0),
      apparentTemperature: Number(current.apparent_temperature ?? 0),
      rain: Number(current.rain ?? 0),
      cloudCover: Number(current.cloud_cover ?? 0),
      weatherCode: Number(current.weather_code ?? 0),
      isDay: Number(current.is_day ?? 1),
      timestamp: current.time ?? new Date().toISOString(),
    };

    return new WeatherForecast(location, currentWeather, daily);
  }
}

export default OpenMeteoWeatherRepository;
