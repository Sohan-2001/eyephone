"use client";

import { Plane, Wifi, Cast } from "lucide-react";
import { Dock } from "@/components/dock";

const ConnectivityWidget = () => (
  <div className="bg-black/20 backdrop-blur-2xl p-1 rounded-3xl">
    <div className="bg-black/10 backdrop-blur-xl p-2 rounded-2xl flex justify-around items-center">
      <div className="bg-gray-600/50 w-14 h-14 rounded-full flex items-center justify-center">
        <Plane className="text-white" size={28}/>
      </div>
      <div className="bg-blue-500/80 w-14 h-14 rounded-full flex items-center justify-center">
        <Wifi className="text-white" size={28}/>
      </div>
      <div className="bg-gray-600/50 w-14 h-14 rounded-full flex items-center justify-center">
        <Cast className="text-white" size={28}/>
      </div>
    </div>
  </div>
);

const SiriWidget = () => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 aspect-square rounded-3xl p-4 flex flex-col justify-between items-start text-white">
        <div className="flex-1 w-full flex items-center justify-center">
            <div className="relative w-28 h-28">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-600 rounded-full">
                    <div className="w-full h-full relative">
                        <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-white/10 rounded-full blur-md"></div>
                    </div>
                </div>
            </div>
        </div>
        <p className="font-semibold text-xl">Siri</p>
    </div>
);

const PhotosIconSVG = () => (
    <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(50,50)">
            <path d="M0,-45 A45,45 0 0,1 31.8,-31.8 L0,0 Z" fill="#ff3b30"/>
            <path d="M31.8,-31.8 A45,45 0 0,1 45,0 L0,0 Z" fill="#ff9500"/>
            <path d="M45,0 A45,45 0 0,1 31.8,31.8 L0,0 Z" fill="#ffcc00"/>
            <path d="M31.8,31.8 A45,45 0 0,1 0,45 L0,0 Z" fill="#34c759"/>
            <path d="M0,45 A45,45 0 0,1 -31.8,31.8 L0,0 Z" fill="#5ac8fa"/>
            <path d="M-31.8,31.8 A45,45 0 0,1 -45,0 L0,0 Z" fill="#007aff"/>
            <path d="M-45,0 A45,45 0 0,1 -31.8,-31.8 L0,0 Z" fill="#5856d6"/>
            <path d="M-31.8,-31.8 A45,45 0 0,1 0,-45 L0,0 Z" fill="#af52de"/>
        </g>
    </svg>
);

const PhotosWidget = () => (
    <div className="bg-white aspect-square rounded-3xl p-2 flex flex-col justify-center items-center gap-1">
        <PhotosIconSVG />
        <p className="text-black font-medium text-xs">Photos</p>
    </div>
);

export default function WidgetBoard() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative">
      <div className="p-4 pt-12 space-y-4">
        <ConnectivityWidget />
        <div className="flex items-start gap-4">
            <div className="flex-1">
                <SiriWidget />
            </div>
            <div className="w-24 flex-shrink-0">
                <PhotosWidget />
            </div>
        </div>
      </div>

      <div className="h-32" />

      <Dock />
    </div>
  );
}
