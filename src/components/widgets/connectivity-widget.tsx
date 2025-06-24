"use client";

import { Plane, Wifi, Cast } from "lucide-react";

const ControlButton = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="w-14 h-14 bg-black/30 rounded-full flex items-center justify-center">
    <Icon size={24} className="text-white" />
  </div>
);

export function ConnectivityWidget() {
  return (
    <div className="w-full h-full flex items-center justify-around bg-white/20 backdrop-blur-lg rounded-3xl border border-white/20 p-4 shadow-lg">
      <ControlButton icon={Plane} />
      <ControlButton icon={Wifi} />
      <ControlButton icon={Cast} />
    </div>
  );
}
