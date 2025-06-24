import WidgetBoard from "@/components/widget-board";
import { Wifi, Signal, Battery } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-300 dark:bg-gray-800 p-4 font-body">
      <div className="w-full max-w-sm h-[85vh] max-h-[900px] bg-background rounded-[48px] border-[10px] border-black dark:border-gray-800 shadow-2xl overflow-hidden relative flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 px-6 flex justify-between items-center text-foreground/80 z-10 text-sm font-semibold">
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
