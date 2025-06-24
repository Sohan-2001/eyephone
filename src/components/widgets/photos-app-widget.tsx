"use client";

const PhotoPinwheelIcon = () => (
  <div className="w-16 h-16 relative">
    <div className="absolute inset-0 bg-white rounded-2xl" />
    <svg viewBox="0 0 100 100" className="w-full h-full p-1">
      {[
        "#FF3B30", // Red
        "#FF9500", // Orange
        "#FFCC00", // Yellow
        "#4CD964", // Green
        "#5AC8FA", // Light Blue
        "#007AFF", // Blue
        "#AF52DE", // Purple
        "#FF2D55", // Pink
      ].map((color, i) => (
        <g key={color} transform={`rotate(${i * 45} 50 50)`}>
          <path
            d="M 50 50 L 50 10 A 40 40 0 0 1 85.35 35.35 L 50 50 Z"
            fill={color}
          />
        </g>
      ))}
    </svg>
  </div>
);

export function PhotosAppWidget() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-black/20 dark:bg-gray-800/20 backdrop-blur-2xl rounded-3xl p-4 text-white">
            <PhotoPinwheelIcon />
            <span className="font-semibold text-lg mt-2">Photos</span>
        </div>
    );
};
