"use client";

import { ForecastCard } from "./forecast-card";
import type { ForecastResponse } from "../lib/types/weather";
import { getDailyForecasts } from "../lib/utils/weather-utils";

interface FiveDayForecastProps {
  forecast: ForecastResponse;
}

export function FiveDayForecast({ forecast }: FiveDayForecastProps) {
  const dailyForecasts = getDailyForecasts(forecast.list);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((item) => (
          <ForecastCard key={item.dt} forecast={item} />
        ))}
      </div>
    </div>
  );
}
