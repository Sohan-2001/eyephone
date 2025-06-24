"use client";

const PhotoPinwheelIcon = () => (
  <div className="w-16 h-16 relative">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[
        "#F55246", // Red
        "#FF8C00", // Orange
        "#FFCF00", // Yellow
        "#A4D42B", // Lime Green
        "#46B654", // Green
        "#33B5E3", // Cyan
        "#3478F6", // Blue
        "#D7356D", // Magenta
      ].map((color, i) => (
        <g key={color + i} transform={`rotate(${i * 45 + 22.5} 50 50)`}>
          <path
            d="M 50,50 C 35,45 35,15 50,10 C 65,15 65,45 50,50 Z"
            fill={color}
            fillOpacity="0.9"
          />
        </g>
      ))}
    </svg>
  </div>
);


export function PhotosAppWidget() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/20 p-4 text-white shadow-lg">
            <PhotoPinwheelIcon />
            <span className="font-semibold text-lg mt-2">Photos</span>
        </div>
    );
};
