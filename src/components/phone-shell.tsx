
'use client';

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Wifi, Signal, Battery, Maximize, Minimize } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export default function PhoneShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [time, setTime] = useState<Date | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // This effect handles the time in the status bar
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // This effect handles fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // This effect handles dark mode for specific pages
  useEffect(() => {
    const html = document.documentElement;
    const isDarkPage = pathname === '/phone' || pathname === '/camera';
    if (isDarkPage) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // Cleanup on unmount or path change
    return () => {
      html.classList.remove('dark');
    };
  }, [pathname]);

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
  
  const phoneBgClass = () => {
    switch (pathname) {
      case '/safari':
        return 'bg-[#F1DED5]';
      case '/messages':
      case '/phone':
      case '/photos':
      case '/notes':
        return 'bg-background';
      case '/camera':
        return 'bg-black';
      default:
        return 'bg-transparent';
    }
  }

  const statusTextColorClass = () => {
      if (pathname === '/camera') {
        return 'text-white';
      }
      // With the dark class being set, we can rely on themed foreground color
      return 'text-foreground';
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-transparent p-4 font-body">
      <div 
        ref={phoneRef}
        className={cn("w-full max-w-[380px] h-[820px] rounded-[48px] border-[10px] border-black shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300", phoneBgClass())}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30"></div>

        {/* Status Bar */}
        <div className={cn("absolute top-0 left-0 right-0 h-10 px-6 flex justify-between items-center z-20 text-sm font-semibold", statusTextColorClass())}>
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

        {children}
      </div>
      <button 
        onClick={toggleFullScreen} 
        className="fixed bottom-5 right-5 z-[100] bg-black/10 backdrop-blur-md text-black p-3 rounded-full hover:bg-black/20 transition-colors"
      >
        {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>
    </main>
  );
}
