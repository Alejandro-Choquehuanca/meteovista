function buildCountryOptions(countries, selectedCountry = "") {
  const fragment = document.createDocumentFragment();

  countries.forEach(([code, label]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = label;
    if (selectedCountry === code) {
      option.selected = true;
    }
    fragment.appendChild(option);
  });

  return fragment;
}

export { buildCountryOptions };
export default buildCountryOptions;
