const WeatherWidget = ({ weather }) => {
  if (!weather) return null
  return (
    <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700">
      <div className="text-white font-semibold mb-2">Weather</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300 text-sm">
        <div>Temp: {weather.temperature}°C</div>
        <div>Humidity: {weather.humidity}%</div>
        <div>Wind: {weather.windSpeed} km/h</div>
        <div>Condition: {weather.condition}</div>
      </div>
    </div>
  )
}

export default WeatherWidget