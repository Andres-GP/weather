import { describe, it, expect, jest } from "@jest/globals"
import { render, screen, waitFor } from "@testing-library/react"
import Home from "@/app/page"

// Mock the geolocation hook
jest.mock("@/hooks/use-geolocation", () => ({
  useGeolocation: jest.fn().mockReturnValue({
    latitude: 40.7128,
    longitude: -74.006,
    error: null,
    loading: false,
  }),
}))

// Mock the weather API
jest.mock("@/lib/weather-api", () => ({
  getCurrentWeather: jest.fn().mockResolvedValue({
    coord: { lat: 40.7128, lon: -74.006 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    main: {
      temp: 20,
      feels_like: 18,
      temp_min: 18,
      temp_max: 22,
      pressure: 1013,
      humidity: 65,
    },
    visibility: 10000,
    wind: { speed: 5, deg: 180 },
    clouds: { all: 0 },
    dt: 1704067200,
    sys: { country: "US", sunrise: 1704024000, sunset: 1704060000 },
    timezone: -18000,
    id: 5128581,
    name: "New York",
    cod: 200,
  }),
  getForecast: jest.fn().mockResolvedValue({
    cod: "200",
    message: 0,
    cnt: 40,
    list: Array.from({ length: 40 }, (_, i) => ({
      dt: 1704067200 + i * 10800,
      main: {
        temp: 20 + i,
        feels_like: 18,
        temp_min: 18,
        temp_max: 22,
        pressure: 1013,
        humidity: 65,
        sea_level: 1013,
        grnd_level: 1010,
      },
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      clouds: { all: 0 },
      wind: { speed: 5, deg: 180 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: `2024-01-01 ${String(i * 3).padStart(2, "0")}:00:00`,
    })),
    city: {
      id: 5128581,
      name: "New York",
      coord: { lat: 40.7128, lon: -74.006 },
      country: "US",
      population: 8000000,
      timezone: -18000,
      sunrise: 1704024000,
      sunset: 1704060000,
    },
  }),
  searchCities: jest.fn().mockResolvedValue([]),
  getWeatherIconUrl: jest.fn((icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`),
}))

describe("Weather App Integration", () => {
  it("should render hero section", () => {
    render(<Home />)

    expect(screen.getByText("Weather Forecast App")).toBeInTheDocument()
    expect(screen.getByText(/Get real-time weather information/)).toBeInTheDocument()
  })

  it("should load weather data on mount", async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument()
      expect(screen.getByText("20°C")).toBeInTheDocument()
    })
  })

  it("should display 5-day forecast", async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText("5-Day Forecast")).toBeInTheDocument()
    })
  })

  it("should show all weather metrics", async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText("Wind Status")).toBeInTheDocument()
      expect(screen.getByText("Humidity")).toBeInTheDocument()
      expect(screen.getByText("Visibility")).toBeInTheDocument()
      expect(screen.getByText("Air Pressure")).toBeInTheDocument()
    })
  })
})
