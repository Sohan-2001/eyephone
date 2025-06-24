
'use client';

import { ArrowLeft, Edit, Search } from "lucide-react";
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
  return (
    <>
      {/* Messages Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-background text-foreground">
        <div className="px-4 pb-28">
          <div className="flex justify-between items-center py-2">
              <h1 className="text-3xl font-bold">Messages</h1>
              <button className="text-primary">
                  <Edit size={24} />
              </button>
          </div>
          
          <div className="relative my-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-muted rounded-lg h-9 pl-8 pr-4 text-sm focus:outline-none"
              />
          </div>
          
          <div className="divide-y divide-border">
              {messages.map((msg, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 -mx-2">
                      {msg.unread && <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0"></div>}
                      <Avatar className={cn("shrink-0", !msg.unread && 'ml-[18px]')}>
                          <AvatarFallback>{msg.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-baseline">
                              <p className="font-semibold truncate">{msg.name}</p>
                              <p className="text-xs text-muted-foreground shrink-0 ml-2">{msg.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>
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
