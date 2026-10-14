import OpenMeteoApi from "../infrastructure/api/openmeteoapi.js";
import GeocodingApi from "../infrastructure/api/geocodingapi.js";
import OpenMeteoWeatherRepository from "../infrastructure/repositories/openmeteoweatherrepository.js";
import LocalStorageLanguageRepository from "../infrastructure/storage/localstoragelanguagerepository.js";
import SearchLocationUseCase from "../application/use-cases/searchlocation.js";
import GetWeatherForecastUseCase from "../application/use-cases/getweatherforecast.js";
import ChangeLanguageUseCase from "../application/use-cases/changelanguage.js";
import { buildCountryOptions } from "../presentation/components/countryselect.js";
import { buildCityOptions } from "../presentation/components/cityselect.js";
import { renderWeatherView } from "../presentation/views/weatherview.js";
import { changeLanguage as changeUiLanguage, getSavedLanguage, translate } from "../presentation/shared/i18n/translate.js";
import { createRouter } from "./router.js";

const countries = [
  ["AR", "Argentina"],
  ["BO", "Bolivia"],
  ["BR", "Brasil"],
  ["CL", "Chile"],
  ["CO", "Colombia"],
  ["EC", "Ecuador"],
  ["ES", "España"],
  ["MX", "México"],
  ["PE", "Perú"],
  ["US", "Estados Unidos"],
  ["UY", "Uruguay"],
  ["VE", "Venezuela"],
];

const citiesByCountry = {
  AR: ["Buenos Aires", "Córdoba", "Rosario"],
  BO: ["La Paz", "Santa Cruz de la Sierra", "Cochabamba"],
  BR: ["São Paulo", "Río de Janeiro", "Brasilia"],
  CL: ["Santiago", "Valparaíso", "Concepción"],
  CO: ["Bogotá", "Medellín", "Cali"],
  EC: ["Quito", "Guayaquil", "Cuenca"],
  ES: ["Madrid", "Barcelona", "Valencia"],
  MX: ["Ciudad de México", "Guadalajara", "Monterrey"],
  PE: ["Lima", "Arequipa", "Cusco"],
  US: ["New York", "Los Angeles", "Miami"],
  UY: ["Montevideo", "Punta del Este", "Salto"],
  VE: ["Caracas", "Maracaibo", "Valencia"],
};

function createWeatherApp() {
  const geocodingApi = new GeocodingApi();
  const openMeteoApi = new OpenMeteoApi();
  const weatherRepository = new OpenMeteoWeatherRepository({
    geocodingApi,
    openMeteoApi,
  });

  const searchLocationUseCase = new SearchLocationUseCase(weatherRepository);
  const getWeatherForecastUseCase = new GetWeatherForecastUseCase(weatherRepository);
  const languageRepository = new LocalStorageLanguageRepository();
  const changeLanguageUseCase = new ChangeLanguageUseCase(languageRepository, {
    changeLanguage: changeUiLanguage,
  });

  return {
    searchLocationUseCase,
    getWeatherForecastUseCase,
    changeLanguageUseCase,
  };
}

function showMessage(currentWeatherSection, message) {
  currentWeatherSection.innerHTML = "";
  const paragraph = document.createElement("p");
  paragraph.textContent = message;
  currentWeatherSection.appendChild(paragraph);
}

function fillCountries(countrySelect) {
  countrySelect.appendChild(buildCountryOptions(countries));
}

function fillCities(citySelect, countryCode) {
  citySelect.innerHTML = "";

  if (!citiesByCountry[countryCode]) {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = translate("location.cityPlaceholder");
    citySelect.appendChild(placeholder);
    citySelect.disabled = true;
    return;
  }

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = translate("location.cityPlaceholder");
  citySelect.appendChild(placeholder);

  citySelect.appendChild(buildCityOptions(citiesByCountry[countryCode]));
  citySelect.disabled = false;
}

function updateSearchButtonState(countrySelect, citySelect, searchButton) {
  const hasCountry = countrySelect.value !== "";
  const hasCity = citySelect.value !== "";
  searchButton.disabled = !hasCountry || !hasCity;
}

async function initializeWeatherApp() {
  const countrySelect = document.querySelector("#country");
  const citySelect = document.querySelector("#city");
  const languageSelect = document.querySelector("#language");
  const searchButton = document.querySelector("#search-button");
  const currentWeatherSection = document.querySelector("#current-weather");
  const forecastList = document.querySelector("#forecast-list");

  if (!countrySelect || !citySelect || !languageSelect || !searchButton || !currentWeatherSection) {
    return;
  }

  const app = createWeatherApp();
  const savedLanguage = getSavedLanguage();
  languageSelect.value = savedLanguage === "en" ? "EN" : "ES";
  await app.changeLanguageUseCase.execute(savedLanguage || "es");

  fillCountries(countrySelect);
  countrySelect.addEventListener("change", () => {
    citySelect.value = "";
    fillCities(citySelect, countrySelect.value);
    showMessage(currentWeatherSection, translate("status.selectCity"));
    updateSearchButtonState(countrySelect, citySelect, searchButton);
  });

  citySelect.addEventListener("change", () => {
    updateSearchButtonState(countrySelect, citySelect, searchButton);
  });

  languageSelect.addEventListener("change", async () => {
    const selectedLanguage = languageSelect.value === "EN" ? "en" : "es";
    await app.changeLanguageUseCase.execute(selectedLanguage);
  });

  searchButton.addEventListener("click", async () => {
    const selectedCity = citySelect.value.trim();
    const selectedCountry = countrySelect.value;

    if (!selectedCity || !selectedCountry) {
      updateSearchButtonState(countrySelect, citySelect, searchButton);
      return;
    }

    searchButton.disabled = true;
    showMessage(currentWeatherSection, translate("status.searching", {
      city: selectedCity,
      country: selectedCountry,
    }));

    try {
      const locations = await app.searchLocationUseCase.execute(selectedCity, selectedCountry);
      const selectedLocation = locations.find((location) => location.countryCode === selectedCountry) || locations[0];

      if (!selectedLocation) {
        throw new Error("location-not-found");
      }

      const weatherForecast = await app.getWeatherForecastUseCase.execute(selectedLocation);
      renderWeatherView({
        currentWeatherSection,
        forecastList,
        weatherForecast,
        translate,
      });
    } catch (error) {
      showMessage(currentWeatherSection, translate("status.locationNotFound"));
    } finally {
      updateSearchButtonState(countrySelect, citySelect, searchButton);
    }
  });

  fillCities(citySelect, "");
  updateSearchButtonState(countrySelect, citySelect, searchButton);
}

if (typeof document !== "undefined") {
  const appRouter = createRouter({ initialize: initializeWeatherApp });
  appRouter.init();
}

export { initializeWeatherApp, createWeatherApp };
