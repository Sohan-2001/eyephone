"use client";

export function CameraAppIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="silverGradient-camera"
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="1"
            >
              <stop stopColor="#F7F7F7" />
              <stop offset="1" stopColor="#D6D6D6" />
            </linearGradient>
            <radialGradient
              id="lensGradient-camera"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(28 28) rotate(45) scale(22)"
            >
              <stop stopColor="#A8C5D4" />
              <stop offset="0.7" stopColor="#2E475B" />
              <stop offset="1" stopColor="#101820" />
            </radialGradient>
          </defs>
          <rect
            width="56"
            height="56"
            rx="12.4"
            fill="url(#silverGradient-camera)"
          />
          <circle cx="28" cy="28" r="21" fill="#2C2C2E" />
          <circle cx="28" cy="28" r="19" fill="#1C1C1E" />
          <circle cx="28" cy="28" r="16" fill="url(#lensGradient-camera)" />
          <path
            d="M 22 21 A 12 12 0 0 1 34 21 L 32 23 A 9 9 0 0 0 24 23 Z"
            fill="white"
            fillOpacity={0.6}
          />
          <circle cx="24" cy="33" r="3" fill="white" fillOpacity={0.3} />
        </svg>
      </div>
      <span className="text-xs text-center text-foreground font-medium mt-1">
        Camera
      </span>
    </div>
  );
}
