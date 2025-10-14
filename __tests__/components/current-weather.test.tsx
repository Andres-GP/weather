import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { CurrentWeather } from "@/components/current-weather"
import type { CurrentWeather as CurrentWeatherType } from "@/lib/types/weather"

const mockWeatherData: CurrentWeatherType = {
  coord: { lat: 40.7128, lon: -74.006 },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 20,
    feels_like: 18,
    temp_min: 18,
    temp_max: 22,
    pressure: 1013,
    humidity: 65,
  },
  visibility: 10000,
  wind: {
    speed: 5,
    deg: 180,
  },
  clouds: {
    all: 0,
  },
  dt: 1704067200,
  sys: {
    country: "US",
    sunrise: 1704024000,
    sunset: 1704060000,
  },
  timezone: -18000,
  id: 5128581,
  name: "New York",
  cod: 200,
}

describe("CurrentWeather", () => {
  it("should render current weather data", () => {
    render(<CurrentWeather weather={mockWeatherData} />)

    expect(screen.getByText("20°C")).toBeInTheDocument()
    expect(screen.getByText("Feels like 18°C")).toBeInTheDocument()
    expect(screen.getByText("clear sky")).toBeInTheDocument()
    expect(screen.getByText("New York")).toBeInTheDocument()
    expect(screen.getByText("US")).toBeInTheDocument()
  })

  it("should render all weather metrics", () => {
    render(<CurrentWeather weather={mockWeatherData} />)

    expect(screen.getByText("Wind Status")).toBeInTheDocument()
    expect(screen.getByText("Humidity")).toBeInTheDocument()
    expect(screen.getByText("Visibility")).toBeInTheDocument()
    expect(screen.getByText("Air Pressure")).toBeInTheDocument()
  })

  it("should display correct metric values", () => {
    render(<CurrentWeather weather={mockWeatherData} />)

    expect(screen.getByText("65")).toBeInTheDocument() // Humidity
    expect(screen.getByText("1013")).toBeInTheDocument() // Pressure
  })
})
