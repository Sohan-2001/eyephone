
"use client";

import { Dock } from "@/components/dock";
import { ConnectivityWidget } from "@/components/widgets/connectivity-widget";
import { PhotosAppWidget } from "@/components/widgets/photos-app-widget";
import { SiriWidget } from "@/components/widgets/siri-widget";

const FloatingBubbles = () => (
    <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
    </div>
);

export default function WidgetBoard() {
  return (
    <div
      className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative wallpaper-container"
    >
      <FloatingBubbles />
      <div className="grid grid-cols-4 grid-rows-6 gap-4 p-4 pt-12 h-[calc(100%-8rem)] relative z-10">
        
        <div className="col-span-4 row-span-1">
            <ConnectivityWidget />
        </div>
        
        <div className="col-span-2 row-span-2">
            <SiriWidget />
        </div>

        <div className="col-span-2 row-span-2">
            <PhotosAppWidget />
        </div>

      </div>
      <Dock />
    </div>
  );
}
