function formatTemperature(value) {
  return `${Math.round(Number(value ?? 0))}°C`;
}

function formatWind(value) {
  return `${Math.round(Number(value ?? 0))} km/h`;
}

function formatHumidity(value) {
  return `${Number(value ?? 0)}%`;
}

export { formatTemperature, formatWind, formatHumidity };
export default { formatTemperature, formatWind, formatHumidity };
