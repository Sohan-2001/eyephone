
'use client';

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wifi, Signal, Battery, ArrowLeft, Edit, Search, Maximize, Minimize } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const messages = [
  { name: 'Jane Doe', message: 'Sounds good! See you then.', time: '9:41 AM', avatar: 'JD', unread: true },
  { name: 'Mom', message: 'Can you pick up milk?', time: 'Yesterday', avatar: 'M' },
  { name: 'Work Group', message: 'John: Project update is due EOD.', time: 'Yesterday', avatar: 'WG' },
  { name: 'Alex', message: 'You too!', time: 'Friday', avatar: 'A' },
  { name: 'Pizza Place', message: 'Your order is confirmed.', time: 'Thursday', avatar: 'PP' },
];

export default function MessagesPage() {
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
        "w-full max-w-[370px] h-[820px] bg-white rounded-[48px] border-[10px] border-black shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300",
        isFullScreen && "fixed inset-0 w-full h-full max-w-none rounded-none border-none z-50"
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

        {/* Messages Content */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-white text-black">
          <div className="px-4 pb-28">
            <div className="flex justify-between items-center py-2">
                <h1 className="text-3xl font-bold">Messages</h1>
                <button className="text-blue-500">
                    <Edit size={24} />
                </button>
            </div>
            
            <div className="relative my-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-gray-100 rounded-lg h-9 pl-8 pr-4 text-sm focus:outline-none"
                />
            </div>
            
            <div className="divide-y divide-gray-200">
                {messages.map((msg, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 -mx-2">
                        {msg.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0"></div>}
                        <Avatar className={`shrink-0 ${!msg.unread ? 'ml-[18px]' : ''}`}>
                            <AvatarFallback>{msg.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-baseline">
                                <p className="font-semibold truncate">{msg.name}</p>
                                <p className="text-xs text-gray-400 shrink-0 ml-2">{msg.time}</p>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
        
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
