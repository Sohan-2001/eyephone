"use client";

import { Phone, Compass, MessageCircle, Settings, Mail, Camera, type LucideIcon } from "lucide-react";
import { Dock } from "@/components/dock";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "./ui/skeleton";

const AppIcon = ({ icon: Icon, label, color, iconColor = "white" }: { icon: LucideIcon, label: string, color: string, iconColor?: string }) => (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div
        className="w-14 h-14 flex items-center justify-center rounded-2xl"
        style={{ backgroundColor: color }}
      >
        <Icon size={32} style={{ color: iconColor }} />
      </div>
       <span className="text-xs text-center text-white font-medium mt-1 drop-shadow-md">
        {label}
      </span>
    </div>
);


const CalendarWidget = () => {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 text-center rounded-3xl backdrop-blur-sm">
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
};

const SiriWidget = () => (
    <div className="bg-black/30 backdrop-blur-2xl aspect-square rounded-3xl p-4 w-full h-full">
        <Image src="https://placehold.co/150x150.png" data-ai-hint="siri icon" alt="Siri" width={150} height={150} className="w-full h-full" />
    </div>
);


export default function WidgetBoard() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/380x820.png')"}} data-ai-hint="ios wallpaper">
      <div className="grid grid-cols-4 grid-rows-6 gap-4 p-4 pt-12 h-[calc(100%-8rem)]">
        
        <div className="col-span-2 row-span-2">
            <CalendarWidget />
        </div>
        
        <div className="col-span-2 row-span-2">
            <SiriWidget />
        </div>

        <div className="col-span-1 row-span-1"><AppIcon icon={Settings} label="Settings" color="#8E8E93" /></div>
        <div className="col-span-1 row-span-1"><AppIcon icon={Mail} label="Mail" color="#007AFF" /></div>
        <div className="col-span-1 row-span-1"><AppIcon icon={Camera} label="Camera" color="#5856D6" /></div>
        <div className="col-span-1 row-span-1"><AppIcon icon={MessageCircle} label="Messages" color="#4CD964" /></div>

      </div>
      <Dock />
    </div>
  );
}
