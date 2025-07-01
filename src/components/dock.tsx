"use client";

import { Phone } from "lucide-react";
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

// The messages SVG component
const MessagesIconSvg = () => (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="bubble-grad-messages-dock" cx="0.3" cy="0.2" r="0.8">
                <stop stopColor="white" stopOpacity="1"/>
                <stop offset="1" stopColor="#E8E8E8" stopOpacity="1"/>
            </radialGradient>
            <filter id="bubble-shadow-messages-dock" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
            </filter>
        </defs>
        
        <rect width="100" height="100" rx="22.5" fill="#0A84FF" />
        
        <g transform="scale(0.85) translate(9, 7)">
            <g filter="url(#bubble-shadow-messages-dock)">
                 <path 
                    d="M50 18C27.9086 18 10 34.9086 10 52C10 60.9234 14.0753 68.9174 20.8404 74.3842C18.2384 81.0583 14.8525 88.0805 25.1327 85.123C32.0151 88.1973 39.8598 90 48 90C70.0914 90 88 73.0914 88 52C88 30.9086 70.0914 18 50 18Z"
                    fill="url(#bubble-grad-messages-dock)"
                 />
            </g>
        </g>
    </svg>
);

const dockItems = [
  { icon: Phone, color: "bg-green-500", href: "/phone" },
  { icon: CameraIconSvg, isComponent: true, href: "#"},
  { icon: MessagesIconSvg, isComponent: true, href: "/messages" },
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
