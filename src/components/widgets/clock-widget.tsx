"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { WidgetComponentProps } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export function ClockWidget({ instanceId }: WidgetComponentProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-gray-800 to-black p-4">
      {time ? (
        <>
          <div className="text-6xl font-bold tracking-tighter">
            {format(time, "h:mm")}
          </div>
          <div className="text-lg font-medium text-gray-300">
            {format(time, "EEEE, MMMM d")}
          </div>
        </>
      ) : (
        <>
          <Skeleton className="h-[60px] w-32 bg-white/20 mb-2" />
          <Skeleton className="h-[28px] w-48 bg-white/20" />
        </>
      )}
    </div>
  );
}
