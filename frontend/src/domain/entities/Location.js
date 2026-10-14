    /*
Location representa una ubicación meteorológica.

Una ubicación necesita una ciudad, un país y sus coordenadas.
Las coordenadas permiten pedir el pronóstico a Open-Meteo.
*/

class Location {
/*
    Crea una nueva ubicación.

    Parámetros:
    - city: nombre de la ciudad.
    - country: nombre del país.
    - latitude: latitud de la ciudad.
    - longitude: longitud de la ciudad.
    - countryCode: código ISO del país (opcional).
  */
constructor(city, country, latitude, longitude, countryCode = "") {
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.countryCode = countryCode;
}

/*
    Devuelve el nombre completo de la ubicación.

    Ejemplo de resultado:
    Lima, Perú
  */
getFullName() {
    return `${this.city}, ${this.country}`;
}

/*
    Comprueba que la ubicación tenga todos los datos necesarios.

    Devuelve true si es válida y false si falta algún dato.
  */
isValid() {
    const hasCity = this.city !== "";
    const hasCountry = this.country !== "";
    const hasLatitude = typeof this.latitude === "number" && !Number.isNaN(this.latitude);
    const hasLongitude = typeof this.longitude === "number" && !Number.isNaN(this.longitude);

    return hasCity && hasCountry && hasLatitude && hasLongitude;
}
}

export default Location;