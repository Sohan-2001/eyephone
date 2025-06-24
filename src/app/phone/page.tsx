
'use client';

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wifi, Signal, Battery, ArrowLeft, Star, Clock, User, Mic, Phone, Maximize, Minimize } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const recents = [
  { name: 'Mom', type: 'Outgoing', time: 'Yesterday', missed: false },
  { name: 'John Appleseed', type: 'Home', time: 'Yesterday', missed: true },
  { name: 'Work', type: 'Mobile', time: 'Friday', missed: false },
  { name: 'Alice', type: 'FaceTime Audio', time: 'Friday', missed: false },
  { name: 'Bob', type: 'Incoming', time: 'Thursday', missed: false },
];

const BottomNavItem = ({ icon: Icon, label, active = false }: { icon: React.ElementType, label: string, active?: boolean }) => (
    <div className={`flex flex-col items-center gap-1 ${active ? 'text-blue-500' : 'text-gray-500'}`}>
        <Icon size={28} />
        <span className="text-xs">{label}</span>
    </div>
)

export default function PhonePage() {
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
        "w-full max-w-[370px] h-[820px] bg-black rounded-[48px] border-[10px] border-black shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300",
        isFullScreen && "fixed inset-0 max-w-none w-full h-full rounded-none border-none z-50"
      )}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30"></div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 px-6 flex justify-between items-center text-white z-20 text-sm font-semibold">
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

        {/* Phone Content */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-black text-white">
            <div className="p-4 space-y-4 pb-28">
                <h1 className="text-3xl font-bold">Recents</h1>
                <div className="space-y-1">
                    {recents.map((call, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <Phone size={20} className={call.missed ? "text-red-500 rotate-[135deg]" : "text-gray-500 -rotate-45"} />
                                <div>
                                    <p className={`font-semibold ${call.missed ? 'text-red-500' : 'text-white'}`}>{call.name}</p>
                                    <p className="text-sm text-gray-400">{call.type}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">{call.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/80 px-4 pb-4 flex items-center justify-around z-20">
            <BottomNavItem icon={Star} label="Favorites" />
            <BottomNavItem icon={Clock} label="Recents" active />
            <BottomNavItem icon={User} label="Contacts" />
            <div className="flex flex-col items-center gap-1 text-gray-500">
                <div className="w-16 h-16 grid place-items-center">
                    <div className="grid grid-cols-3 gap-y-1.5 gap-x-3">
                        {Array.from({length: 9}).map((_, i) => <div key={i} className="w-2 h-2 bg-gray-400 rounded-full"></div>)}
                    </div>
                </div>
                <span className="text-xs mt-0.5">Keypad</span>
            </div>
            <BottomNavItem icon={Mic} label="Voicemail" />
        </div>
        
        {/* A back button to return to the home screen for usability */}
        <Link href="/" className="absolute top-12 left-4 z-20 p-2 group">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowLeft size={16} className="text-white/80"/>
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
