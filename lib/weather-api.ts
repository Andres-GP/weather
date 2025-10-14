import type { CurrentWeather, ForecastResponse, CitySearchResult } from "./types/weather"

export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
  const response = await fetch(`/api/weather/current?lat=${lat}&lon=${lon}`)

  if (!response.ok) {
    throw new Error("Failed to fetch current weather")
  }

  return response.json()
}

export async function getForecast(lat: number, lon: number): Promise<ForecastResponse> {
  const response = await fetch(`/api/weather/forecast?lat=${lat}&lon=${lon}`)

  if (!response.ok) {
    throw new Error("Failed to fetch forecast")
  }

  return response.json()
}

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  if (!query || query.length < 2) {
    return []
  }

  const response = await fetch(`/api/weather/search?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error("Failed to search cities")
  }

  return response.json()
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
