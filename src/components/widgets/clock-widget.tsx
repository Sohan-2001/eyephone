"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { WidgetComponentProps } from "@/types";

export function ClockWidget({ instanceId }: WidgetComponentProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-gray-800 to-black p-4">
      <div className="text-6xl font-bold tracking-tighter">
        {format(time, "h:mm")}
      </div>
      <div className="text-lg font-medium text-gray-300">
        {format(time, "EEEE, MMMM d")}
      </div>
    </div>
  );
}
