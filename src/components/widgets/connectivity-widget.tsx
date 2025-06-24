"use client";

import { Plane, Wifi, Cast } from "lucide-react";

const ControlButton = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="w-14 h-14 bg-black/30 rounded-full flex items-center justify-center">
    <Icon size={24} className="text-white" />
  </div>
);

const WifiControl = () => (
    <div className="flex items-center gap-3 text-white">
        <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
            <Wifi size={24} className="text-white" />
        </div>
        <div>
            <p className="font-semibold">Wi-Fi</p>
            <p className="text-sm text-white/80">Sohan 5G</p>
        </div>
    </div>
)

export function ConnectivityWidget() {
  return (
    <div className="w-full h-full flex items-center justify-around bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-4 shadow-lg">
      <ControlButton icon={Plane} />
      <WifiControl />
      <ControlButton icon={Cast} />
    </div>
  );
}
