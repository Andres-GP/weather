import { describe, it, expect, jest } from "@jest/globals"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { CitySearch } from "@/components/city-search"

// Mock the weather API
jest.mock("@/lib/weather-api", () => ({
  searchCities: jest.fn().mockResolvedValue([
    {
      name: "New York",
      lat: 40.7128,
      lon: -74.006,
      country: "US",
      state: "New York",
    },
    {
      name: "London",
      lat: 51.5074,
      lon: -0.1278,
      country: "GB",
    },
  ]),
}))

describe("CitySearch", () => {
  it("should render search input", () => {
    const mockOnSelect = jest.fn()
    render(<CitySearch onCitySelect={mockOnSelect} />)

    expect(screen.getByPlaceholderText("Search for a city...")).toBeInTheDocument()
  })

  it("should show results when typing", async () => {
    const mockOnSelect = jest.fn()
    render(<CitySearch onCitySelect={mockOnSelect} />)

    const input = screen.getByPlaceholderText("Search for a city...")
    fireEvent.change(input, { target: { value: "New" } })

    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument()
      expect(screen.getByText("London")).toBeInTheDocument()
    })
  })

  it("should call onCitySelect when city is clicked", async () => {
    const mockOnSelect = jest.fn()
    render(<CitySearch onCitySelect={mockOnSelect} />)

    const input = screen.getByPlaceholderText("Search for a city...")
    fireEvent.change(input, { target: { value: "New" } })

    await waitFor(() => {
      const cityButton = screen.getByText("New York")
      fireEvent.click(cityButton)
    })

    expect(mockOnSelect).toHaveBeenCalledWith(40.7128, -74.006, "New York, New York, US")
  })
})
