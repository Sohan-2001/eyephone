"use client";

import { format } from "date-fns";
import type { WidgetComponentProps } from "@/types";

export function CalendarWidget({ instanceId }: WidgetComponentProps) {
  const now = new Date();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-center">
      <div className="text-sm font-semibold text-red-500 uppercase">
        {format(now, "EEEE")}
      </div>
      <div className="text-7xl font-bold text-gray-800 dark:text-gray-100">
        {format(now, "d")}
      </div>
    </div>
  );
}
