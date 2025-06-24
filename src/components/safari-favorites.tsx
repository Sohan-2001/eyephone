import { User } from 'lucide-react';

const favorites = [
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 50H100" stroke="black" strokeWidth="10"/>
        <path d="M50 25C25 25 25 75 50 75" stroke="black" strokeWidth="10"/>
        <path d="M50 25C75 25 75 75 50 75" stroke="black" strokeWidth="10"/>
      </svg>
    ),
    label: 'Process / Era Ceramics',
    bgColor: 'bg-black',
  },
  {
    icon: <span className="text-4xl font-bold text-black">52</span>,
    label: 'Best Banoffee Pi...',
    bgColor: 'bg-white',
  },
  {
    icon: <span className="text-4xl font-bold text-gray-500">F</span>,
    label: 'førs — poetic objects',
    bgColor: 'bg-gray-300',
  },
  {
    icon: <span className="text-4xl font-bold text-gray-500">C</span>,
    label: 'Cult - Design First',
    bgColor: 'bg-gray-300',
  },
];

export default function SafariFavorites() {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <User size={20} className="text-gray-500" />
        Favorites
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {favorites.map((fav, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center shadow ${fav.bgColor}`}>
              {fav.icon}
            </div>
            <p className="mt-2 text-xs text-gray-600 leading-tight line-clamp-2">
              {fav.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
