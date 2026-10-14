class SearchLocationUseCase {
  constructor(weatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async execute(cityName, countryCode = "") {
    if (!cityName || !String(cityName).trim()) {
      return [];
    }

    return this.weatherRepository.searchLocations(cityName, countryCode);
  }
}

export default SearchLocationUseCase;
