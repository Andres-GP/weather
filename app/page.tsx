"use client";

import { useState, useEffect } from "react";
import { Hero } from "../components/hero";
import { CitySearch } from "../components/city-search";
import { CurrentWeather } from "../components/current-weather";
import { FiveDayForecast } from "../components/five-day-forecast";
import { Button } from "../components/ui/button";
import { Loader2, MapPin, AlertCircle } from "lucide-react";
import { useGeolocation } from "../hooks/use-geolocation";
import { getCurrentWeather, getForecast } from "../lib/weather-api";
import type {
  CurrentWeather as CurrentWeatherType,
  ForecastResponse,
} from "../lib/types/weather";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function Home() {
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation();
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    if (latitude && longitude && !selectedLocation) {
      fetchWeatherData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const fetchWeatherData = async (
    lat: number,
    lon: number,
    locationName?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      if (locationName) {
        setSelectedLocation(locationName);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (lat: number, lon: number, cityName: string) => {
    fetchWeatherData(lat, lon, cityName);
  };

  const handleUseCurrentLocation = () => {
    if (latitude && longitude) {
      setSelectedLocation("");
      fetchWeatherData(latitude, longitude);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Search Section */}
        <div className="flex flex-col items-center gap-4">
          <CitySearch onCitySelect={handleCitySelect} />
          {latitude && longitude && (
            <Button
              onClick={handleUseCurrentLocation}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <MapPin className="h-4 w-4" />
              Use Current Location
            </Button>
          )}
        </div>

        {/* Loading State */}
        {(loading || geoLoading) && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">
              Loading weather data...
            </p>
          </div>
        )}

        {/* Error State */}
        {(error || geoError) && !loading && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || geoError}</AlertDescription>
          </Alert>
        )}

        {/* Weather Data */}
        {!loading && !geoLoading && currentWeather && forecast && (
          <div className="space-y-12">
            <CurrentWeather weather={currentWeather} />
            <FiveDayForecast forecast={forecast} />
          </div>
        )}

        {/* No Location State */}
        {!loading && !geoLoading && !currentWeather && !error && !geoError && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Search for a city to see weather information
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Weather data provided by OpenWeatherMap API</p>
          <p className="mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
