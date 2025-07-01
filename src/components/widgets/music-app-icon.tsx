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
             d="M49.6,22H38.8c-1.8,0-3.2,1.4-3.2,3.2v29c-3-2-6.8-3.2-10.8-3.2c-8.3,0-15.2,6.8-15.2,15.2s6.9,15.2,15.2,15.2s15.2-6.8,15.2-15.2V32h21.2v23c-3-2-6.8-3.2-10.8-3.2c-8.3,0-15.2,6.8-15.2,15.2s6.9,15.2,15.2,15.2S75.8,80.2,75.8,72s-6.9-15.2-15.2-15.2V25.2C59.8,23.4,58.4,22,56.6,22H49.6z"
            transform="translate(13 8)"
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
