"use client";

const MailIconSvg = () => (
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="mail-app-icon-grad" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop stopColor="#3A82F7"/>
                <stop offset="1" stopColor="#5AC8FA"/>
            </linearGradient>
        </defs>
        <rect width="100" height="100" rx="22.5" fill="url(#mail-app-icon-grad)" />
        <path 
            d="M18 35 L 50 55 L 82 35 M18 65 V 35 H 82 V 65 H 18 Z"
            stroke="white" 
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
        />
    </svg>
);


export function MailAppIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
         <MailIconSvg />
      </div>
      <span className="text-xs text-center text-muted-foreground font-medium mt-1">
        Mail
      </span>
    </div>
  );
}
