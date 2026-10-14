class GetWeatherForecastUseCase {
  constructor(weatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async execute(locationOrLatitude, longitude = null) {
    if (!locationOrLatitude) {
      throw new Error("Debe indicar una ubicación válida.");
    }

    return this.weatherRepository.getWeatherForecast(locationOrLatitude, longitude);
  }
}

export default GetWeatherForecastUseCase;
