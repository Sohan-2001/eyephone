
"use client";

import { Dock } from "@/components/dock";
import { ConnectivityWidget } from "@/components/widgets/connectivity-widget";
import { PhotosAppWidget } from "@/components/widgets/photos-app-widget";
import { SiriWidget } from "@/components/widgets/siri-widget";

export default function WidgetBoard() {
  return (
    <div
      className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative"
      style={{
        backgroundColor: '#000',
        backgroundImage: 'radial-gradient(ellipse 75% 100% at 50% 0%, hsl(245, 100%, 25%), transparent 50%), radial-gradient(ellipse 75% 100% at 50% 100%, hsl(260, 40%, 20%), transparent 50%)',
      }}
    >
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
