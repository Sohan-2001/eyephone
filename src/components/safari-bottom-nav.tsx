import { Search, Mic, ChevronLeft, ChevronRight, Share, Book, SquareStack } from 'lucide-react';

export default function SafariBottomNav() {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-50/80 backdrop-blur-xl border-t border-gray-200/80 px-4 pb-4 flex flex-col justify-end z-20">
            <div className="flex items-center justify-around text-blue-500 mb-3">
                <button disabled><ChevronLeft size={28} className="text-gray-300" /></button>
                <button disabled><ChevronRight size={28} className="text-gray-300" /></button>
                <button><Share size={24} /></button>
                <button><Book size={24} /></button>
                <button><SquareStack size={24} /></button>
            </div>
            <div className="relative w-full">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search or enter website"
                    className="w-full bg-white/60 rounded-lg h-9 pl-9 pr-9 text-sm text-center placeholder-gray-500 focus:outline-none"
                />
                <Mic size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
        </div>
    );
}
