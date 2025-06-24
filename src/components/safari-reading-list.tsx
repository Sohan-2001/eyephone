import Image from 'next/image';

const ReadingListIcon = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="4"/>
        <path d="M50 15V85" stroke="black" strokeWidth="4"/>
        <path d="M50 50L85 25" stroke="black" strokeWidth="4"/>
        <path d="M50 50L85 75" stroke="black" strokeWidth="4"/>
    </svg>
)

export default function SafariReadingList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Reading List</h2>
      <div className="space-y-2">
        <div className="bg-indigo-100/70 rounded-lg p-3 flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shrink-0">
             <ReadingListIcon />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-gray-800 truncate">Another Escape | Inspired by nature</p>
            <p className="text-xs text-gray-600 truncate">Another Escape is an outdoor lifestyle,...</p>
            <p className="text-xs text-gray-500 mt-1">anotherescape.com</p>
          </div>
        </div>
        <div className="bg-indigo-100/70 rounded-lg p-3 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0 relative overflow-hidden">
            <Image 
                src="https://placehold.co/600x400.png"
                alt="Living room"
                data-ai-hint="modern architecture"
                fill
                className="object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-gray-800 line-clamp-2">A Floating Living Room Sets a Family's Lake Michigan Cottag...</p>
            <p className="text-xs text-gray-600 truncate">The elevated glass-wrapped space juts...</p>
            <p className="text-xs text-gray-500 mt-1">dwell.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
