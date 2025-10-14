export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15)
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32)
}

export function metersToKilometers(meters: number): number {
  return Math.round(meters / 1000)
}

export function mpsToKmh(mps: number): number {
  return Math.round(mps * 3.6)
}

export function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function getDailyForecasts(forecastList: any[]) {
  const dailyMap = new Map()

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString()

    if (!dailyMap.has(date)) {
      dailyMap.set(date, item)
    }
  })

  return Array.from(dailyMap.values()).slice(0, 5)
}
