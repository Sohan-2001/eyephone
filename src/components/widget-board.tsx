"use client";

import { Dock } from "@/components/dock";
import { ConnectivityWidget } from "@/components/widgets/connectivity-widget";
import { PhotosAppWidget } from "@/components/widgets/photos-app-widget";
import { SiriWidget } from "@/components/widgets/siri-widget";

export default function WidgetBoard() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="grid grid-cols-4 grid-rows-6 gap-4 p-4 pt-12 h-[calc(100%-8rem)]">
        
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
