/*
translate.js centraliza la traducción de MeteoVista.

Lee los archivos es.json y en.json, traduce los elementos del HTML
que tengan el atributo data-i18n y guarda el idioma seleccionado.
*/

// Guarda las traducciones del idioma que esté activo.
let currentTranslations = {};

// Español será el idioma predeterminado de la aplicación.
let currentLanguage = "es";

/*
Carga el archivo JSON del idioma recibido.

Parámetro:
- language: código del idioma, por ejemplo "es" o "en".

Devuelve:
- Un objeto con todas las traducciones del archivo JSON.
*/
async function loadTranslations(language) {
const response = await fetch(
    `./src/presentation/shared/i18n/${language}.json`
  );

  // Si no fue posible cargar el archivo, detenemos la ejecución.
if (!response.ok) {
    throw new Error(`No se pudo cargar el idioma: ${language}`);
}

return response.json();
}

/*
Busca una traducción mediante su clave.

Parámetros:
- key: clave definida en los archivos JSON.
- replacements: datos que reemplazarán textos como {city} o {country}.

Ejemplo:
translate("status.searching", { city: "Lima", country: "Perú" });
*/
function translate(key, replacements = {}) {
  // Si no existe una clave, devolvemos la misma clave para detectar el error.
let translatedText = currentTranslations[key] || key;

  // Reemplaza cada dato dinámico dentro del texto traducido.
for (const replacementKey in replacements) {
    const value = replacements[replacementKey];
    const placeholder = `{${replacementKey}}`;

    translatedText = translatedText.replace(placeholder, value);
}

return translatedText;
}

/*
Traduce todos los elementos que tengan el atributo data-i18n.

Ejemplo en HTML:
<h1 data-i18n="app.title">MeteoVista</h1>
*/
function translatePage() {
const elementsToTranslate = document.querySelectorAll("[data-i18n]");

elementsToTranslate.forEach((element) => {
    const translationKey = element.dataset.i18n;

    element.textContent = translate(translationKey);
});

  const placeholdersToTranslate = document.querySelectorAll(
    "[data-i18n-placeholder]"
  );

  placeholdersToTranslate.forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });
}

/*
Cambia el idioma visible de la aplicación.

Parámetro:
- language: "es" para español o "en" para inglés.
*/
async function changeLanguage(language) {
currentTranslations = await loadTranslations(language);
currentLanguage = language;

  // Actualiza los textos de la pantalla.
translatePage();

  // Cambia el idioma principal del documento HTML.
document.documentElement.lang = language;

  // Guarda la elección para futuras visitas.
localStorage.setItem("meteovista-language", language);
}

/*
Obtiene el idioma guardado por el usuario.

Si nunca eligió uno, se utiliza español.
*/
function getSavedLanguage() {
return localStorage.getItem("meteovista-language") || "es";
}

// Exportamos estas funciones para usarlas desde main.js.
export {
changeLanguage,
getSavedLanguage,
translate
};
