
'use client';

import { ArrowLeft, Star, Clock, User, Mic, Phone } from "lucide-react";
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
    <div className={cn(
        "flex flex-col items-center gap-1",
        active ? 'text-primary' : 'text-muted-foreground'
    )}>
        <Icon size={28} />
        <span className="text-xs">{label}</span>
    </div>
)

export default function PhonePage() {
  return (
    <>
      {/* Phone Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-background text-foreground">
          <div className="p-4 space-y-4 pb-28">
              <h1 className="text-3xl font-bold">Recents</h1>
              <div className="space-y-1">
                  {recents.map((call, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/20">
                          <div className="flex items-center gap-3">
                              <Phone size={20} className={cn(call.missed ? "text-destructive rotate-[135deg]" : "text-muted-foreground -rotate-45")} />
                              <div>
                                  <p className={cn("font-semibold", call.missed ? 'text-destructive' : 'text-foreground')}>{call.name}</p>
                                  <p className="text-sm text-muted-foreground">{call.type}</p>
                              </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{call.time}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-secondary/30 backdrop-blur-xl border-t border-border/80 px-4 pb-4 flex items-center justify-around z-20">
          <BottomNavItem icon={Star} label="Favorites" />
          <BottomNavItem icon={Clock} label="Recents" active />
          <BottomNavItem icon={User} label="Contacts" />
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <div className="w-16 h-16 grid place-items-center">
                  <div className="grid grid-cols-3 gap-y-1.5 gap-x-3">
                      {Array.from({length: 9}).map((_, i) => <div key={i} className="w-2 h-2 bg-muted-foreground rounded-full"></div>)}
                  </div>
              </div>
              <span className="text-xs mt-0.5">Keypad</span>
          </div>
          <BottomNavItem icon={Mic} label="Voicemail" />
      </div>
      
      {/* A back button to return to the home screen for usability */}
      <Link href="/" className="absolute top-12 left-4 z-20 p-2 group">
          <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
              <ArrowLeft size={16} className="text-foreground/80"/>
          </div>
      </Link>
    </>
  );
}
