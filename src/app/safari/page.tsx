
'use client';

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wifi, Signal, Battery, ArrowLeft, Maximize, Minimize } from "lucide-react";
import Link from "next/link";
import SafariFavorites from "@/components/safari-favorites";
import SafariPrivacyReport from "@/components/safari-privacy-report";
import SafariReadingList from "@/components/safari-reading-list";
import SafariBottomNav from "@/components/safari-bottom-nav";
import { cn } from "@/lib/utils";

export default function SafariPage() {
  const [time, setTime] = useState<Date | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-900 to-pink-900 p-4 font-body">
      <div className={cn(
        "w-full max-w-[370px] h-[820px] bg-[#F1DED5] rounded-[48px] border-[10px] border-black shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300",
        isFullScreen && "fixed inset-0 max-w-none w-full h-full rounded-none border-none z-50"
      )}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30"></div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 px-6 flex justify-between items-center text-black z-20 text-sm font-semibold">
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

        {/* Browser Content */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-[#F1DED5]">
            <div className="p-4 space-y-8 pb-28">
                <SafariFavorites />
                <SafariPrivacyReport />
                <SafariReadingList />
            </div>
        </div>

        <SafariBottomNav />
        
        {/* A back button to return to the home screen for usability */}
        <Link href="/" className="absolute top-12 left-4 z-20 p-2 group">
            <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <ArrowLeft size={16} className="text-black/80"/>
            </div>
        </Link>
      </div>
      <button 
        onClick={() => setIsFullScreen(!isFullScreen)} 
        className="fixed bottom-5 right-5 z-[100] bg-white/30 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors"
      >
        {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>
    </main>
  );
}
