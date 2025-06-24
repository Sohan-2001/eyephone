
"use client";

import { LocateFixed, Loader2, Droplets } from "lucide-react";
import type { WidgetComponentProps } from "@/types";
import { useEffect, useState } from "react";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  high: number;
  low: number;
  rainfallChance: number;
}

export function WeatherWidget({ instanceId }: WidgetComponentProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if running on the client and geolocation is available
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use these coordinates to call a weather API.
          // For this demo, we'll just use mock data.
          const { latitude, longitude } = position.coords;
          console.log(`User location: ${latitude}, ${longitude}`);
          
          setWeather({
            city: "Current Location",
            temperature: 72,
            condition: "Sunny",
            high: 75,
            low: 60,
            rainfallChance: 10,
          });
          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          setError("Location access denied.");
          // Fallback to default weather if location is denied
          setWeather({
            city: "San Francisco",
            temperature: 68,
            condition: "Cloudy",
            high: 72,
            low: 58,
            rainfallChance: 20,
          });
          setLoading(false);
        },
        { timeout: 10000 } // Add a timeout to avoid waiting forever
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      // Fallback for older browsers or non-secure contexts
       setWeather({
            city: "San Francisco",
            temperature: 68,
            condition: "Cloudy",
            high: 72,
            low: 58,
            rainfallChance: 20,
          });
      setLoading(false);
    }
  }, []);
  
  if (loading) {
    return (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
            <Loader2 className="animate-spin" size={32} />
            <p className="text-sm mt-2">Fetching Weather...</p>
        </div>
    )
  }

  // This fallback is for the unlikely case where loading is done but weather is still null.
  if (!weather) {
      return (
        <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 to-gray-700 text-white text-center">
            <LocateFixed size={24} className="mb-2" />
            <p className="font-bold text-lg">Weather Unavailable</p>
            <p className="text-xs">{error || "Could not load weather data."}</p>
        </div>
      )
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-2xl">{weather.city}</p>
          <p className="text-lg">{weather.condition}</p>
          {error && <p className="text-xs text-yellow-300 mt-1">{error}</p>}
        </div>
        <p className="text-6xl font-thin">{weather.temperature}°</p>
      </div>
      <div className="flex justify-between items-end text-sm font-medium">
        <div className="flex items-center gap-1.5">
            <Droplets size={16} />
            <span>{weather.rainfallChance}% chance of rain</span>
        </div>
        <p>H:{weather.high}° L:{weather.low}°</p>
      </div>
    </div>
  );
}
