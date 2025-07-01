"use client";

const SettingsIconSvg = () => (
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="settings-bg-grad" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop stopColor="#F0F0F0" />
                <stop offset="1" stopColor="#D8D8DC" />
            </linearGradient>
            <radialGradient id="settings-depression-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0.85" stopColor="#A9A9B0" />
                <stop offset="1" stopColor="#8E8E93" />
            </radialGradient>
            <filter id="gear-shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.2" />
            </filter>
            {/* Generate teeth for the outer gear */}
            <g id="outer-teeth">
                {Array.from({ length: 72 }).map((_, i) => (
                    <path key={`outer-tooth-${i}`} d="M 0 -36 L -1 -40 L 1 -40 Z" transform={`rotate(${i * 5})`} />
                ))}
            </g>
            {/* Generate teeth for the inner gear */}
            <g id="inner-teeth">
                {Array.from({ length: 40 }).map((_, i) => (
                    <path key={`inner-tooth-${i}`} d="M 0 -22 L -1.5 -26 L 1.5 -26 Z" transform={`rotate(${i * 9})`} />
                ))}
            </g>
        </defs>

        {/* Base */}
        <rect width="100" height="100" rx="22.5" fill="url(#settings-bg-grad)" />
        <circle cx="50" cy="50" r="46" fill="url(#settings-depression-grad)" />
        <circle cx="50" cy="50" r="45" fill="#BDBEC2" />

        {/* Gears */}
        <g filter="url(#gear-shadow-filter)">
            {/* Outer Gear */}
            <g transform="translate(50,50)" fill="#E5E5EA">
                <circle r="38" stroke="#C7C7CC" strokeWidth="0.5" />
                <use href="#outer-teeth" />
            </g>
            
            {/* Inner Gear */}
            <g transform="translate(50,50)" fill="#E5E5EA">
                <circle r="24" stroke="#C7C7CC" strokeWidth="0.5" />
                <use href="#inner-teeth" />
            </g>

            {/* Central 3-spoke part */}
            <g transform="translate(50,50)" fill="#E5E5EA">
                {/* Spokes */}
                <g>
                  <path d="M 0 -9 L 4 -9 L 2 -32 L -2 -32 Z" />
                  <path d="M 0 -9 L 4 -9 L 2 -32 L -2 -32 Z" transform="rotate(120)" />
                  <path d="M 0 -9 L 4 -9 L 2 -32 L -2 -32 Z" transform="rotate(240)" />
                </g>
                
                {/* Center circle */}
                <circle cx="0" cy="0" r="10" />
                <circle cx="0" cy="0" r="4" fill="#BDBEC2" stroke="#A9A9B0" strokeWidth="1" />
            </g>
        </g>
    </svg>
);


export function SettingsAppIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
         <SettingsIconSvg />
      </div>
      <span className="text-xs text-center text-foreground font-medium mt-1">
        Settings
      </span>
    </div>
  );
}