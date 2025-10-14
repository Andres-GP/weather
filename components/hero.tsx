import { Cloud } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-primary/10 backdrop-blur-sm">
            <Cloud className="h-16 w-16 text-primary" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">Weather Forecast App</h1>
        <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
          Get real-time weather information and 5-day forecasts for any location worldwide. Powered by OpenWeatherMap
          API.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>Current Weather</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>5-Day Forecast</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span>Detailed Metrics</span>
          </div>
        </div>
      </div>
    </div>
  )
}
