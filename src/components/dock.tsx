"use client";

import { Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

// The camera SVG component
const CameraIconSvg = () => (
    <svg width="64" height="64" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="silverGradient-camera-dock" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop stopColor="#F7F7F7" /><stop offset="1" stopColor="#D6D6D6" />
            </linearGradient>
            <radialGradient id="lensGradient-camera-dock" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28 28) rotate(45) scale(22)">
                <stop stopColor="#A8C5D4" /><stop offset="0.7" stopColor="#2E475B" /><stop offset="1" stopColor="#101820" />
            </radialGradient>
        </defs>
        <rect width="56" height="56" rx="12.4" fill="url(#silverGradient-camera-dock)" />
        <circle cx="28" cy="28" r="21" fill="#2C2C2E" />
        <circle cx="28" cy="28" r="19" fill="#1C1C1E" />
        <circle cx="28" cy="28" r="16" fill="url(#lensGradient-camera-dock)" />
        <path d="M 22 21 A 12 12 0 0 1 34 21 L 32 23 A 9 9 0 0 0 24 23 Z" fill="white" fillOpacity={0.6} />
        <circle cx="24" cy="33" r="3" fill="white" fillOpacity={0.3} />
    </svg>
)

const dockItems = [
  { icon: Phone, color: "bg-green-500", href: "/phone" },
  { icon: CameraIconSvg, isComponent: true, href: "#"},
  { icon: MessageCircle, color: "bg-green-400", href: "/messages" },
];

export function Dock() {
  return (
    <div className="absolute bottom-4 left-4 right-4 h-24 z-10">
      <div className="relative w-full h-full bg-white/20 backdrop-blur-lg rounded-3xl border border-white/20 p-4 flex items-center justify-around shadow-lg">
        {dockItems.map((item, index) => {
          let content;
          if (item.isComponent) {
            content = (
              <div
                className={cn(
                  "w-16 h-16 flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-200 group-hover:scale-110"
                )}
              >
                <item.icon />
              </div>
            );
          } else {
            content = (
                <div
                className={cn(
                    "w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-200 group-hover:scale-110",
                    item.color
                )}
                >
                <item.icon className="text-white" size={36} />
                </div>
            );
          }

          if (item.href.startsWith('/')) {
            return (
              <Link href={item.href} key={index} className="flex flex-col items-center gap-1 group">
                {content}
              </Link>
            )
          }

          return (
             <button key={index} className="flex flex-col items-center gap-1 group">
                {content}
             </button>
          )
        })}
      </div>
    </div>
  );
}
