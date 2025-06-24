"use client";

import { Plane, Wifi, Cast } from "lucide-react";

const ControlButton = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="w-14 h-14 bg-black/30 rounded-full flex items-center justify-center">
    <Icon size={24} className="text-white" />
  </div>
);

export function ConnectivityWidget() {
  return (
    <div className="w-full h-full flex items-center justify-around bg-black/20 dark:bg-gray-800/20 backdrop-blur-2xl rounded-3xl p-4">
      <ControlButton icon={Plane} />
      <ControlButton icon={Wifi} />
      <ControlButton icon={Cast} />
    </div>
  );
}
