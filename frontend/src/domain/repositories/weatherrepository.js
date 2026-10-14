/*
WeatherRepository define las acciones necesarias para trabajar
con ubicaciones y pronósticos meteorológicos.

Las clases que consulten APIs deberán implementar estos métodos.
*/

class WeatherRepository {
/*
    Busca ubicaciones a partir del nombre de una ciudad.

    Parámetro:
    - cityName: texto escrito por el usuario.

    Este método deberá devolver una lista de ubicaciones.
  */
async searchLocations(cityName) {
    throw new Error(
    `El método searchLocations no fue implementado: ${cityName}`
    );
}

/*
    Obtiene el clima actual y el pronóstico de una ubicación.

    Parámetros:
    - latitude: latitud de la ubicación.
    - longitude: longitud de la ubicación.

    Este método deberá devolver un objeto WeatherForecast.
  */
async getWeatherForecast(latitude, longitude) {
    throw new Error(
`El método getWeatherForecast no fue implementado: ${latitude}, ${longitude}`
    );
}
}

export default WeatherRepository;