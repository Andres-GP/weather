import { Card } from "../components/ui/card";
import type { ForecastItem } from "../lib/types/weather";
import { getWeatherIconUrl } from "../lib/weather-api";
import { formatDate } from "../lib/utils/weather-utils";
import Image from "next/image";

interface ForecastCardProps {
  forecast: ForecastItem;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const temp = Math.round(forecast.main.temp);
  const tempMin = Math.round(forecast.main.temp_min);
  const tempMax = Math.round(forecast.main.temp_max);

  return (
    <Card className="p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-foreground">
        {formatDate(forecast.dt)}
      </h3>
      <div className="relative w-20 h-20">
        <Image
          src={
            getWeatherIconUrl(forecast.weather[0].icon) || "/placeholder.svg"
          }
          alt={forecast.weather[0].description}
          fill
          className="object-contain"
        />
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-foreground">{temp}°C</p>
        <p className="text-sm text-muted-foreground mt-1">
          {tempMax}° / {tempMin}°
        </p>
      </div>
      <p className="text-sm text-muted-foreground capitalize text-center">
        {forecast.weather[0].description}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>💧 {forecast.main.humidity}%</span>
        <span>💨 {Math.round(forecast.wind.speed * 3.6)} km/h</span>
      </div>
    </Card>
  );
}
