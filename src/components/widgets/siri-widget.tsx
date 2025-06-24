"use client";

const SiriIcon = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
                <radialGradient id="siri-orb-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="30%" stopColor="rgba(40, 23, 77, 0.1)" />
                    <stop offset="80%" stopColor="rgba(10, 10, 20, 0.7)" />
                    <stop offset="100%" stopColor="rgba(0, 0, 10, 0.9)" />
                </radialGradient>
                <radialGradient id="siri-flare" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <filter id="siri-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
                </filter>
            </defs>

            {/* Orb background */}
            <circle cx="100" cy="100" r="98" fill="url(#siri-orb-gradient)" />
            <circle cx="100" cy="100" r="98" fill="black" opacity="0.4"/>


            {/* Animated glowing shapes */}
            <g filter="url(#siri-blur)" style={{ mixBlendMode: 'lighten' }}>
                <g className="animate-spin" style={{ animationDuration: '5s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }}>
                    <path
                        d="M 110,60 C 150,60 170,100 140,130 C 110,160 70,160 50,130 C 30,100 70,60 110,60 Z"
                        fill="#33E3FF"
                        opacity="0.7"
                    />
                </g>
                <g className="animate-spin" style={{ animationDirection: 'reverse', animationDuration: '6s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }}>
                     <path
                        d="M 90,50 C 50,50 30,90 60,120 C 90,150 130,150 150,120 C 170,90 130,50 90,50 Z"
                        fill="#E328FF"
                        opacity="0.7"
                        transform="rotate(60 100 100)"
                    />
                </g>
                 <g className="animate-spin" style={{ animationDuration: '7s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }}>
                    <path
                        d="M 100, 40 C 70, 50, 60, 90, 80, 130 C 100, 170, 160, 160, 170, 120 C 180, 80, 130, 30, 100, 40 Z"
                        fill="#944DFF"
                        opacity="0.6"
                        transform="rotate(-45 100 100)"
                    />
                </g>
            </g>
            
            {/* Central flare */}
            <circle cx="100" cy="100" r="30" fill="url(#siri-flare)" className="animate-pulse"/>
        </svg>
    </div>
);


export function SiriWidget() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-4 text-white shadow-lg">
      <SiriIcon />
      <span className="font-semibold text-lg mt-2">Siri</span>
    </div>
  );
}
