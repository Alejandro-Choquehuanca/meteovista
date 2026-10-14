function buildCityOptions(cities, selectedCity = "") {
  const fragment = document.createDocumentFragment();

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    if (selectedCity === city) {
      option.selected = true;
    }
    fragment.appendChild(option);
  });

  return fragment;
}

export { buildCityOptions };
export default buildCityOptions;
