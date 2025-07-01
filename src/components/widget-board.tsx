"use client";

import { useState, TouchEvent } from "react";
import { Dock } from "@/components/dock";
import { ConnectivityWidget } from "@/components/widgets/connectivity-widget";
import { PhotosAppWidget } from "@/components/widgets/photos-app-widget";
import { SiriWidget } from "@/components/widgets/siri-widget";
import { WeatherWidget } from "@/components/widgets/weather-widget";
import AppLibrary from "@/components/app-library";
import { cn } from "@/lib/utils";

const MIN_SWIPE_DISTANCE = 50;

export default function WidgetBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const totalPages = 2; // 0: Widgets, 1: App Library

  const onTouchStart = (e: TouchEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return;

    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;

    // A more vertical swipe
    if (Math.abs(distanceY) > Math.abs(distanceX)) {
      const isUpSwipe = distanceY > MIN_SWIPE_DISTANCE;
      const isDownSwipe = distanceY < -MIN_SWIPE_DISTANCE;
      if (isUpSwipe && currentPage === 0) {
        setCurrentPage(1);
      } else if (isDownSwipe && currentPage === 1) {
        setCurrentPage(0);
      }
    }
    // A more horizontal swipe
    else {
      const isLeftSwipe = distanceX > MIN_SWIPE_DISTANCE;
      const isRightSwipe = distanceX < -MIN_SWIPE_DISTANCE;

      if (isLeftSwipe) {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      } else if (isRightSwipe) {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
    setTouchStartY(null);
    setTouchEndY(null);
  };

  return (
    <div
      className="flex-1 w-full h-full overflow-hidden relative wallpaper-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="w-[200%] h-full flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 50}%)` }}
      >
        {/* Page 1: Widgets */}
        <div className="w-1/2 h-full overflow-y-auto">
          <div className="grid grid-cols-4 grid-rows-6 gap-4 p-4 pt-12 min-h-[calc(100%-4rem)] relative z-10">
            <div className="col-span-4 row-span-1">
              <ConnectivityWidget />
            </div>

            <div className="col-span-4 row-span-2 rounded-3xl overflow-hidden shadow-md">
              <WeatherWidget instanceId="weather-1" />
            </div>

            <div className="col-span-2 row-span-2">
              <SiriWidget />
            </div>

            <div className="col-span-2 row-span-2">
              <PhotosAppWidget />
            </div>
          </div>
        </div>

        {/* Page 2: App Library */}
        <div className="w-1/2 h-full relative z-10">
          <AppLibrary />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-28 left-0 right-0 flex justify-center items-center gap-2 z-20">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              currentPage === index ? "bg-white" : "bg-white/40"
            )}
            onClick={() => setCurrentPage(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      <Dock />
    </div>
  );
}
