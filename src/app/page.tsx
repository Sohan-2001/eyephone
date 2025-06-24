
'use client';

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import WidgetBoard from "@/components/widget-board";
import { Wifi, Signal, Battery, Maximize, Minimize } from "lucide-react";

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!phoneRef.current) return;

    if (!document.fullscreenElement) {
      phoneRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };


  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-black p-4 font-body">
      <div 
        ref={phoneRef}
        className="w-full max-w-[380px] h-[820px] bg-transparent rounded-[48px] border-[10px] border-black shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 px-6 flex justify-between items-center text-white z-10 text-sm font-semibold">
          <span className="w-12 text-center">
            {time ? format(time, 'h:mm') : '...'}
          </span>
          <div className="flex-1"></div>
          <div className="flex items-center gap-1.5">
            <Signal size={16} />
            <Wifi size={16} />
            <Battery size={20} />
          </div>
        </div>

        <WidgetBoard />
      </div>
      <button 
        onClick={toggleFullScreen} 
        className="fixed bottom-5 right-5 z-[100] bg-white/30 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors"
      >
        {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>
    </main>
  );
}
