/*
  OpenMeteoApi solo conoce cómo formar la petición HTTP.
  No modifica elementos HTML ni decide cómo se muestran los datos.
*/

class OpenMeteoApi {
  async getForecast(latitude, longitude) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set(
      "current",
      "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,rain,cloud_cover,weather_code,is_day"
    );
    url.searchParams.set(
      "hourly",
      "temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,wind_speed_10m,uv_index"
    );
    url.searchParams.set(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
    );
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "16");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No fue posible obtener el pronóstico.");
    }

    return response.json();
  }
}

export default OpenMeteoApi;
