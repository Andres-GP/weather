import { describe, it, expect, jest } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CitySearch } from "@/components/city-search";

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
}));

describe("CitySearch", () => {
  it("should render search input", () => {
    const mockOnSelect = jest.fn();
    render(<CitySearch onCitySelect={mockOnSelect} />);

    expect(
      screen.getByPlaceholderText("Search for a city...")
    ).toBeInTheDocument();
  });
});
