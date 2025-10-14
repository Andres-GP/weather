import { describe, it, expect } from "@jest/globals"
import {
  kelvinToCelsius,
  celsiusToFahrenheit,
  metersToKilometers,
  mpsToKmh,
  getWindDirection,
  formatDate,
  getDailyForecasts,
} from "@/lib/utils/weather-utils"

describe("Weather Utils", () => {
  describe("kelvinToCelsius", () => {
    it("should convert Kelvin to Celsius correctly", () => {
      expect(kelvinToCelsius(273.15)).toBe(0)
      expect(kelvinToCelsius(373.15)).toBe(100)
      expect(kelvinToCelsius(293.15)).toBe(20)
    })
  })

  describe("celsiusToFahrenheit", () => {
    it("should convert Celsius to Fahrenheit correctly", () => {
      expect(celsiusToFahrenheit(0)).toBe(32)
      expect(celsiusToFahrenheit(100)).toBe(212)
      expect(celsiusToFahrenheit(20)).toBe(68)
    })
  })

  describe("metersToKilometers", () => {
    it("should convert meters to kilometers correctly", () => {
      expect(metersToKilometers(1000)).toBe(1)
      expect(metersToKilometers(5000)).toBe(5)
      expect(metersToKilometers(500)).toBe(1)
    })
  })

  describe("mpsToKmh", () => {
    it("should convert meters per second to kilometers per hour", () => {
      expect(mpsToKmh(10)).toBe(36)
      expect(mpsToKmh(5)).toBe(18)
      expect(mpsToKmh(0)).toBe(0)
    })
  })

  describe("getWindDirection", () => {
    it("should return correct wind direction", () => {
      expect(getWindDirection(0)).toBe("N")
      expect(getWindDirection(45)).toBe("NE")
      expect(getWindDirection(90)).toBe("E")
      expect(getWindDirection(180)).toBe("S")
      expect(getWindDirection(270)).toBe("W")
    })
  })

  describe("formatDate", () => {
    it("should format timestamp to readable date", () => {
      const timestamp = 1704067200 // Jan 1, 2024
      const formatted = formatDate(timestamp)
      expect(formatted).toContain("Jan")
      expect(formatted).toContain("1")
    })
  })

  describe("getDailyForecasts", () => {
    it("should return up to 5 daily forecasts", () => {
      const mockForecastList = Array.from({ length: 40 }, (_, i) => ({
        dt: 1704067200 + i * 10800, // 3-hour intervals
        main: { temp: 20 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      }))

      const dailyForecasts = getDailyForecasts(mockForecastList)
      expect(dailyForecasts.length).toBeLessThanOrEqual(5)
    })

    it("should return unique days", () => {
      const mockForecastList = [
        { dt: 1704067200, main: { temp: 20 } },
        { dt: 1704067200 + 3600, main: { temp: 21 } }, // Same day
        { dt: 1704067200 + 86400, main: { temp: 22 } }, // Next day
      ]

      const dailyForecasts = getDailyForecasts(mockForecastList)
      expect(dailyForecasts.length).toBe(2)
    })
  })
})
