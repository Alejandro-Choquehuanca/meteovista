/*
WeatherCodeService convierte los códigos meteorológicos de Open-Meteo
en información que la interfaz puede mostrar.
*/

class WeatherCodeService {
/*
    Devuelve el ícono y la clave de traducción de un código meteorológico.

    Parámetros:
    - weatherCode: código numérico entregado por Open-Meteo.
    - isDay: indica si es de día o de noche.

    Devuelve:
    - Un objeto con icon y translationKey.
  */
getWeatherInfo(weatherCode, isDay = true) {
    const weatherCodes = {
    0: {
        icon: isDay ? "☀️" : "🌙",
        translationKey: "weatherCode.clearSky"
    },
    1: {
        icon: isDay ? "🌤️" : "🌙",
        translationKey: "weatherCode.mainlyClear"
    },
    2: {
        icon: "⛅",
        translationKey: "weatherCode.partlyCloudy"
    },
    3: {
        icon: "☁️",
        translationKey: "weatherCode.overcast"
    },
    45: {
        icon: "🌫️",
        translationKey: "weatherCode.fog"
    },
    48: {
        icon: "🌫️",
        translationKey: "weatherCode.rimeFog"
    },
    51: {
        icon: "🌦️",
        translationKey: "weatherCode.lightDrizzle"
    },
    53: {
        icon: "🌦️",
        translationKey: "weatherCode.moderateDrizzle"
    },
    55: {
        icon: "🌧️",
        translationKey: "weatherCode.denseDrizzle"
    },
    61: {
        icon: "🌦️",
        translationKey: "weatherCode.lightRain"
    },
    63: {
        icon: "🌧️",
        translationKey: "weatherCode.moderateRain"
    },
    65: {
        icon: "🌧️",
        translationKey: "weatherCode.heavyRain"
    },
    71: {
        icon: "🌨️",
        translationKey: "weatherCode.lightSnow"
    },
    73: {
        icon: "🌨️",
        translationKey: "weatherCode.moderateSnow"
    },
    75: {
        icon: "❄️",
        translationKey: "weatherCode.heavySnow"
    },
    80: {
        icon: "🌦️",
        translationKey: "weatherCode.lightRainShowers"
    },
    81: {
        icon: "🌧️",
        translationKey: "weatherCode.moderateRainShowers"
    },
    82: {
        icon: "⛈️",
        translationKey: "weatherCode.heavyRainShowers"
    },
    95: {
        icon: "⛈️",
        translationKey: "weatherCode.thunderstorm"
    },
    96: {
        icon: "⛈️",
        translationKey: "weatherCode.thunderstormHail"
    },
    99: {
        icon: "⛈️",
        translationKey: "weatherCode.heavyThunderstormHail"
    }
    };

    // Si el código no existe, se devuelve una opción general.
    return weatherCodes[weatherCode] || {
    icon: "🌡️",
    translationKey: "weatherCode.unknown"
    };
}
}

export default WeatherCodeService;