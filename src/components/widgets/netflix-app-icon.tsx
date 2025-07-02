"use client";

const NetflixIconSvg = () => (
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="22.5" fill="black" />
        <path d="M25 85V15H42V85H25Z" fill="#B1060E"/>
        <path d="M58 85V15H75V85H58Z" fill="#B1060E"/>
        <path d="M42 15L25 15L58 85H75L42 15Z" fill="#E50914"/>
    </svg>
);


export function NetflixAppIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
         <NetflixIconSvg />
      </div>
      <span className="text-xs text-center text-muted-foreground font-medium mt-1">
        Netflix
      </span>
    </div>
  );
}
