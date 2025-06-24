"use client";

const SiriIcon = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="absolute w-full h-full">
            <defs>
                <radialGradient id="siri-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6EABFF" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#C46EFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F86E92" stopOpacity="0.2" />
                </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="100" fill="url(#siri-glow)" className="animate-pulse" />
        </svg>
        <svg viewBox="0 0 200 200" className="absolute w-full h-full animate-spin" style={{ animationDuration: '4s' }}>
            <path
                d="M 50,100 A 50,50 0 0,1 150,100"
                stroke="#63EFFF"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
        <svg viewBox="0 0 200 200" className="absolute w-full h-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
            <path
                d="M 50,100 A 60,60 0 0,0 150,100"
                stroke="#FF69B4"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    </div>
);

export function SiriWidget() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/20 p-4 text-white shadow-lg">
      <SiriIcon />
      <span className="font-semibold text-lg mt-2">Siri</span>
    </div>
  );
}
