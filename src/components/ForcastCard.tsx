import { Image } from "@heroui/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { getDayName } from "../util/util";
import type { ForecastDayPorps } from "../App";

const ForcastCard = ({ data: dayForecast }: { data: ForecastDayPorps }) => {
  return (
    <div
      key={dayForecast.date}
      className="shadow p-4 rounded-2xl text-center bg-primary-50"
    >
      <h1 className="font-semibold text-lg">
        {getDayName(dayForecast.date)}, {dayForecast.date}
      </h1>

      <div className="flex justify-center my-2">
        <Image
          src={dayForecast.day.condition.icon}
          alt={dayForecast.day.condition.text}
          width={48}
          height={48}
        />
      </div>

      <div className="flex justify-between mt-2 text-sm">
        <div className="flex items-center me-4">
          <FaArrowUp className="h-4 w-4 mr-1 text-danger" />
          {dayForecast.day.maxtemp_c}°C
        </div>
        <div className="flex items-center">
          <FaArrowDown className="h-4 w-4 mr-1 text-primary" />
          {dayForecast.day.mintemp_c}°C
        </div>
      </div>
    </div>
  );
};

export default ForcastCard;
