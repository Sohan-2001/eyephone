import WidgetBoard from "@/components/widget-board";
import { Wifi, Signal, Battery } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-300 via-purple-400 to-indigo-600 p-4 font-body">
      <div className="w-full max-w-[380px] h-[820px] bg-transparent rounded-[48px] border-[10px] border-black shadow-2xl overflow-hidden relative flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 px-6 flex justify-between items-center text-white z-10 text-sm font-semibold">
          <span className="w-12 text-center">9:41</span>
          <div className="flex-1"></div>
          <div className="flex items-center gap-1.5">
            <Signal size={16} />
            <Wifi size={16} />
            <Battery size={20} />
          </div>
        </div>

        <WidgetBoard />
      </div>
    </main>
  );
}
