import { Image } from "@heroui/react";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureEmpty, FaWind } from "react-icons/fa6";
import type { WeatherDataProps, ForecastDayPorps } from "../App";
import ForcastCard from "./ForcastCard";

const WeatherCard = ({
  weatherData: weather,
}: {
  weatherData: WeatherDataProps;
}) => {
  return (
    <div className="text-center items-center space-y-5">
      <div className="items-center text-center space-y-5">
        <h1 className="text-2xl font-bold">
          {weather.location.name}, {weather.location.country}
        </h1>
        <div className="flex justify-center items-center">
          {/* <SunIcon className="h-12 w-12 text-yellow-400" /> */}
          <Image src={weather.current.condition.icon} />
          <span className="text-5xl font-semibold ml-3">
            {weather.current.temp_c}°C
          </span>
        </div>
        <p className="text-lg">{weather.current.condition.text}</p>
      </div>
      <div className="flex justify-center items-center space-x-4">
        {weather.forecast?.forecastday.map((dayForecast: ForecastDayPorps) => (
          <ForcastCard data={dayForecast} />
        ))}
      </div>

      {/* High/Low */}
      <div className="flex justify-between mt-6 text-sm text-gray-700 shadow-xs p-4 rounded-2xl">
        <div className="flex items-center">
          <FaTemperatureEmpty className="h-4 w-4 mr-1 text-blue-500" />
          Feels like: {weather.current.feelslike_c}°C
        </div>
        <div className="flex items-center">
          <WiHumidity className="h-5 w-5 mr-1 text-blue-500" />
          Humidity: {weather.current.humidity}%
        </div>
        <div className="flex items-center">
          <FaWind className="h-4 w-4 text-blue-500 mr-1" />
          Wind: {weather.current.wind_kph} kph
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
