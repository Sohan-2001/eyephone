
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

// WMO Weather interpretation codes
const weatherCodes: { [key: number]: string } = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

const getConditionFromCode = (code: number) => {
    return weatherCodes[code] || "Unknown";
}


export function WeatherWidget({ instanceId }: WidgetComponentProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async (latitude: number, longitude: number) => {
        setLoading(true);
        try {
            const [weatherResponse, geoResponse] = await Promise.all([
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&hourly=precipitation_probability&timezone=auto`),
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            ]);

            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data.');
            }
            if (!geoResponse.ok) {
                throw new Error('Failed to fetch location data.');
            }

            const weatherData = await weatherResponse.json();
            const geoData = await geoResponse.json();

            // To get the current hour's precipitation probability
            const now = new Date();
            const currentHour = now.getHours();
            const currentPrecipitation = weatherData.hourly.precipitation_probability[currentHour] || 0;

            setWeather({
                city: geoData.city || "Unknown Location",
                temperature: Math.round(weatherData.current.temperature_2m),
                condition: getConditionFromCode(weatherData.current.weather_code),
                high: Math.round(weatherData.daily.temperature_2m_max[0]),
                low: Math.round(weatherData.daily.temperature_2m_min[0]),
                rainfallChance: currentPrecipitation,
            });
            setError(geoData.city ? null : "Could not determine city name.");

        } catch (err: any) {
            console.error("Weather data fetch error:", err);
            setError(err.message || 'Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDefaultWeather = async () => {
        // Default to San Francisco if geolocation fails
        setError("Using default location.");
        await fetchWeatherData(37.7749, -122.4194);
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (err) => {
          fetchDefaultWeather();
        },
        { timeout: 5000 }
      );
    } else {
      fetchDefaultWeather();
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
