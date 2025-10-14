"use client";

import { Card } from "../components/ui/card";
import { WeatherMetricCard } from "./weather-metric-card";
import { Wind, Droplets, Eye, Gauge } from "lucide-react";
import type { CurrentWeather as CurrentWeatherType } from "../lib/types/weather";
import { getWeatherIconUrl } from "../lib/weather-api";
import {
  mpsToKmh,
  getWindDirection,
  metersToKilometers,
} from "../lib/utils/weather-utils";
import Image from "next/image";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const windSpeed = mpsToKmh(weather.wind.speed);
  const windDir = getWindDirection(weather.wind.deg);
  const visibility = metersToKilometers(weather.visibility);

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <Image
                src={
                  getWeatherIconUrl(weather.weather[0].icon) ||
                  "/placeholder.svg"
                }
                alt={weather.weather[0].description}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-6xl font-bold text-foreground">{temp}°C</h2>
              <p className="text-lg text-muted-foreground mt-2">
                Feels like {feelsLike}°C
              </p>
              <p className="text-xl text-foreground capitalize mt-1">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-3xl font-semibold text-foreground">
              {weather.name}
            </h3>
            <p className="text-lg text-muted-foreground">
              {weather.sys.country}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </Card>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WeatherMetricCard
          icon={Wind}
          label="Wind Status"
          value={windSpeed.toString()}
          unit="km/h"
          description={`Direction: ${windDir} (${weather.wind.deg}°)`}
        />
        <WeatherMetricCard
          icon={Droplets}
          label="Humidity"
          value={weather.main.humidity.toString()}
          unit="%"
          description={
            weather.main.humidity > 70 ? "High humidity" : "Normal humidity"
          }
        />
        <WeatherMetricCard
          icon={Eye}
          label="Visibility"
          value={visibility.toString()}
          unit="km"
          description={
            visibility > 10 ? "Excellent visibility" : "Moderate visibility"
          }
        />
        <WeatherMetricCard
          icon={Gauge}
          label="Air Pressure"
          value={weather.main.pressure.toString()}
          unit="hPa"
          description={
            weather.main.pressure > 1013 ? "High pressure" : "Low pressure"
          }
        />
      </div>
    </div>
  );
}
