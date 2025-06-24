"use client";

import { Phone, Compass, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const dockItems = [
  { icon: Phone, color: "bg-green-500" },
  { icon: Compass, color: "bg-blue-500" },
  { icon: MessageCircle, color: "bg-green-400" },
];

export function Dock() {
  return (
    <div className="absolute bottom-4 left-4 right-4 h-24 z-10">
      <div className="relative w-full h-full bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-4 flex items-center justify-around shadow-lg">
        {dockItems.map((item, index) => (
          <button key={index} className="flex flex-col items-center gap-1 group">
            <div
              className={cn(
                "w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-200 group-hover:scale-110",
                item.color
              )}
            >
              <item.icon className="text-white" size={36} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
