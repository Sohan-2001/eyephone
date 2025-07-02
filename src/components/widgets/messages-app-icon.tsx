"use client";

const MessagesIconSvg = () => (
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="bubble-grad-messages" cx="0.3" cy="0.2" r="0.8">
                <stop stopColor="white" stopOpacity="1"/>
                <stop offset="1" stopColor="#E8E8E8" stopOpacity="1"/>
            </radialGradient>
            <filter id="bubble-shadow-messages" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
            </filter>
        </defs>
        
        <rect width="100" height="100" rx="22.5" fill="#0A84FF" />
        
        <g transform="scale(0.85) translate(9, 7)">
            <g filter="url(#bubble-shadow-messages)">
                 <path 
                    d="M50 18C27.9086 18 10 34.9086 10 52C10 60.9234 14.0753 68.9174 20.8404 74.3842C18.2384 81.0583 14.8525 88.0805 25.1327 85.123C32.0151 88.1973 39.8598 90 48 90C70.0914 90 88 73.0914 88 52C88 30.9086 70.0914 18 50 18Z"
                    fill="url(#bubble-grad-messages)"
                 />
            </g>
        </g>
    </svg>
);


export function MessagesAppIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
         <MessagesIconSvg />
      </div>
      <span className="text-xs text-center text-muted-foreground font-medium mt-1">
        Messages
      </span>
    </div>
  );
}
