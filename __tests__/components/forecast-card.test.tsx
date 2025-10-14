import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { ForecastCard } from "@/components/forecast-card"
import type { ForecastItem } from "@/lib/types/weather"

const mockForecast: ForecastItem = {
  dt: 1704067200,
  main: {
    temp: 22,
    feels_like: 20,
    temp_min: 18,
    temp_max: 25,
    pressure: 1013,
    humidity: 60,
    sea_level: 1013,
    grnd_level: 1010,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  clouds: {
    all: 0,
  },
  wind: {
    speed: 3,
    deg: 180,
  },
  visibility: 10000,
  pop: 0,
  sys: {
    pod: "d",
  },
  dt_txt: "2024-01-01 12:00:00",
}

describe("ForecastCard", () => {
  it("should render forecast data", () => {
    render(<ForecastCard forecast={mockForecast} />)

    expect(screen.getByText("22°C")).toBeInTheDocument()
    expect(screen.getByText("25° / 18°")).toBeInTheDocument()
    expect(screen.getByText("clear sky")).toBeInTheDocument()
  })

  it("should display humidity and wind speed", () => {
    render(<ForecastCard forecast={mockForecast} />)

    expect(screen.getByText(/60%/)).toBeInTheDocument()
    expect(screen.getByText(/11 km\/h/)).toBeInTheDocument()
  })
})
