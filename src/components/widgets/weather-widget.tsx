"use client";

import { Sun, Cloud, CloudRain } from "lucide-react";
import type { WidgetComponentProps } from "@/types";

export function WeatherWidget({ instanceId }: WidgetComponentProps) {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <div>
        <p className="font-bold text-lg">San Francisco</p>
        <p className="text-4xl font-light">72°</p>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <Sun size={24} />
          <p className="font-medium">Sunny</p>
        </div>
        <p className="text-sm">H:75° L:60°</p>
      </div>
    </div>
  );
}
