import { Card } from "../components/ui/card";
import type { LucideIcon } from "lucide-react";

interface WeatherMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  description?: string;
}

export function WeatherMetricCard({
  icon: Icon,
  label,
  value,
  unit,
  description,
}: WeatherMetricCardProps) {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-foreground">{value}</span>
        <span className="text-lg text-muted-foreground">{unit}</span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </Card>
  );
}
