class GeocodingApi {
  async searchLocations(cityName, countryCode = "") {
    const query = String(cityName ?? "").trim();

    if (!query) {
      return [];
    }

    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", query);
    url.searchParams.set("count", "10");
    url.searchParams.set("language", "en");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No fue posible buscar la ubicación.");
    }

    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results : [];

    if (!countryCode) {
      return results;
    }

    return results.filter(
      (result) =>
        String(result.country_code || "").toUpperCase() ===
        String(countryCode).toUpperCase()
    );
  }
}

export default GeocodingApi;
