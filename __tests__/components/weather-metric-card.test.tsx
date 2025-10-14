import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { WeatherMetricCard } from "@/components/weather-metric-card"
import { Wind } from "lucide-react"

describe("WeatherMetricCard", () => {
  it("should render metric card with all props", () => {
    render(<WeatherMetricCard icon={Wind} label="Wind Speed" value="15" unit="km/h" description="Light breeze" />)

    expect(screen.getByText("Wind Speed")).toBeInTheDocument()
    expect(screen.getByText("15")).toBeInTheDocument()
    expect(screen.getByText("km/h")).toBeInTheDocument()
    expect(screen.getByText("Light breeze")).toBeInTheDocument()
  })

  it("should render without description", () => {
    render(<WeatherMetricCard icon={Wind} label="Wind Speed" value="15" unit="km/h" />)

    expect(screen.getByText("Wind Speed")).toBeInTheDocument()
    expect(screen.getByText("15")).toBeInTheDocument()
    expect(screen.queryByText("Light breeze")).not.toBeInTheDocument()
  })
})
