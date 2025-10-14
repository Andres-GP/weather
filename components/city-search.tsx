"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Search, MapPin } from "lucide-react";
import { searchCities } from "../lib/weather-api";
import type { CitySearchResult } from "../lib/types/weather";

interface CitySearchProps {
  onCitySelect: (lat: number, lon: number, cityName: string) => void;
}

export function CitySearch({ onCitySelect }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchDebounce = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const cities = await searchCities(query);
          setResults(cities);
          setIsOpen(true);
        } catch (error) {
          console.error("Error searching cities:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [query]);

  const handleCitySelect = (city: CitySearchResult) => {
    const cityName = `${city.name}${city.state ? `, ${city.state}` : ""}, ${
      city.country
    }`;
    onCitySelect(city.lat, city.lon, cityName);
    setQuery("");
    setIsOpen(false);
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-4 h-14 text-lg"
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.map((city, index) => (
              <button
                key={`${city.lat}-${city.lon}-${index}`}
                onClick={() => handleCitySelect(city)}
                className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors text-left"
              >
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {city.name}
                    {city.state && `, ${city.state}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {city.country}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {isOpen && isLoading && (
        <Card className="absolute top-full mt-2 w-full z-50 p-4">
          <p className="text-center text-muted-foreground">Searching...</p>
        </Card>
      )}

      {isOpen && !isLoading && query.length >= 2 && results.length === 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 p-4">
          <p className="text-center text-muted-foreground">No cities found</p>
        </Card>
      )}
    </div>
  );
}
