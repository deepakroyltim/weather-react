import { Autocomplete, AutocompleteItem, Image } from "@heroui/react";
import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { SiAccuweather, SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export interface LocationProps {
  id?: number;
  name: string;
  region: string;
  country: string;
}

export interface WeatherDataProps {
  location: LocationProps;
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: ForecastDayPorps[];
  };
}

export interface ForecastDayPorps {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export default function App() {
  const [locations, setLocations] = useState<LocationProps[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherDataProps | null>(null);

  const handleInputChange = async (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${value}`
        );
        const data: LocationProps[] = await res.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching autocomplete:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setLocations([]);
    }
  };

  const onSelectionChangeFun = async (key: React.Key | null) => {
    if (key) {
      void getWeatherData(key); // fire-and-forget
    }
  };

  const getWeatherData = async (key: React.Key) => {
    const city = key?.toString() || "";

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3`
      );
      const data = await res.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <Autocomplete
            className="w-full"
            inputValue={query}
            onInputChange={handleInputChange}
            label="Select City"
            placeholder="Search city name"
            isLoading={isLoading}
            onSelectionChange={onSelectionChangeFun}
            defaultItems={locations.map((loc) => ({
              key: loc.name,
              label: `${loc.name}, ${loc.region}, ${loc.country}`,
            }))}
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        {/* Weather Info */}
        {weather && <WeatherCard weatherData={weather} />}

        <div className="flex justify-between items-center mt-10 px-4">
          <h1 className="font-bold flex flex-wrap gap-4 items-center text-lg">
            <span className="flex items-center gap-1 border-r-1 pe-4">
              <SiAccuweather /> Weather APP
            </span>
            <span className="flex items-center gap-1">
              <FaReact /> React JS
            </span>
            <span className="flex items-center gap-1">HeroUI</span>
            <span className="flex items-center gap-1">
              <SiTailwindcss /> Tailwind
            </span>
          </h1>

          <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Image
              src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
              alt="Weather data by WeatherAPI.com"
              width={80}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
