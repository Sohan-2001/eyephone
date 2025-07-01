"use client";

const MusicIconSvg = () => (
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="music-app-icon-grad" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop stopColor="#FB6271"/>
                <stop offset="1" stopColor="#F94C5D"/>
            </linearGradient>
        </defs>
        <rect width="100" height="100" rx="22.5" fill="url(#music-app-icon-grad)" />
        <path
            d="M38.8,22V55.2c-3.6-2.2-7.8-3.6-12.3-3.6C16.8,51.6,9,59.4,9,69.1s7.8,17.5,17.5,17.5s17.5-7.8,17.5-17.5V32h26.2v23.2 c-3.6-2.2-7.8-3.6-12.3-3.6c-9.7,0-17.5,7.8-17.5,17.5s7.8,17.5,17.5,17.5S85.2,80,85.2,70.3s-7.8-17.5-17.5-17.5V22H38.8z"
            transform="translate(4 0) scale(1.1)"
            fill="white"
        />
    </svg>
);


export function MusicAppIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
         <MusicIconSvg />
      </div>
      <span className="text-xs text-center text-foreground font-medium mt-1">
        Music
      </span>
    </div>
  );
}
