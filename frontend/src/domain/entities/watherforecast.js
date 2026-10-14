/*
WeatherForecast representa el pronóstico meteorológico completo
de una ubicación.
*/

class WeatherForecast {
/*
    Crea un nuevo pronóstico.

    Parámetros:
    - location: objeto Location con ciudad, país y coordenadas.
    - currentWeather: objeto con los datos del clima actual.
    - dailyForecast: lista con los pronósticos de cada día.
  */
constructor(location, currentWeather, dailyForecast) {
    this.location = location;
    this.currentWeather = currentWeather;
    this.dailyForecast = dailyForecast;
}

/*
    Devuelve la cantidad de días disponibles en el pronóstico.
  */
getDaysCount() {
    return this.dailyForecast.length;
}

/*
    Comprueba que el pronóstico tenga los datos mínimos necesarios.

    Devuelve true si los datos son válidos y false si falta información.
  */
isValid() {
    const hasValidLocation = this.location && this.location.isValid();
    const hasCurrentWeather = this.currentWeather !== null;
    const hasDailyForecast = Array.isArray(this.dailyForecast);

    return hasValidLocation && hasCurrentWeather && hasDailyForecast;
}
}

export default WeatherForecast;