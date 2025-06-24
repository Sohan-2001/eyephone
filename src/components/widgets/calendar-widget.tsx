"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { WidgetComponentProps } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export function CalendarWidget({ instanceId }: WidgetComponentProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-center">
      {now ? (
        <>
          <div className="text-sm font-semibold text-red-500 uppercase">
            {format(now, "EEEE")}
          </div>
          <div className="text-7xl font-bold text-gray-800 dark:text-gray-100">
            {format(now, "d")}
          </div>
        </>
      ) : (
        <>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-20 w-16" />
        </>
      )}
    </div>
  );
}
