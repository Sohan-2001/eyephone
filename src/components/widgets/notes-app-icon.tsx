"use client";

const NotesIconSvg = () => (
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="notes-yellow-grad" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop stopColor="#FDE188"/>
                <stop offset="1" stopColor="#FCCA3E"/>
            </linearGradient>
            <clipPath id="notes-clip-path">
                <rect width="100" height="100" rx="22.5"/>
            </clipPath>
            <filter id="notes-header-shadow" x="-5%" y="-5%" width="110%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.1"/>
            </filter>
        </defs>
        
        <g clipPath="url(#notes-clip-path)">
            {/* Paper background */}
            <rect width="100" height="100" fill="#F9F9F9"/>
            
            {/* Ruled Lines */}
            <rect y="64" width="100" height="1.5" fill="#EAEAEA" />
            <rect y="84" width="100" height="1.5" fill="#EAEAEA" />

            {/* Header */}
            <g filter="url(#notes-header-shadow)">
                <path d="M0 0 H100 V38 H0 Z" fill="url(#notes-yellow-grad)"/>
            </g>
            
            {/* Perforation */}
            <g fill="#D6D6D6">
                {Array.from({ length: 14 }).map((_, i) => (
                    <circle key={`note-dot-${i}`} cx={10 + i * 6.15} cy="45" r="1.5"/>
                ))}
            </g>
        </g>
    </svg>
);


export function NotesAppIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
         <NotesIconSvg />
      </div>
      <span className="text-xs text-center text-foreground font-medium mt-1">
        Notes
      </span>
    </div>
  );
}
