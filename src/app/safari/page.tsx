
'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SafariFavorites from "@/components/safari-favorites";
import SafariPrivacyReport from "@/components/safari-privacy-report";
import SafariReadingList from "@/components/safari-reading-list";
import SafariBottomNav from "@/components/safari-bottom-nav";

export default function SafariPage() {
  return (
    <>
      {/* Browser Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-[#F1DED5]">
          <div className="p-4 space-y-8 pb-28">
              <SafariFavorites />
              <SafariPrivacyReport />
              <SafariReadingList />
          </div>
      </div>

      <SafariBottomNav />
      
      {/* A back button to return to the home screen for usability */}
      <Link href="/" className="absolute top-12 left-4 z-20 p-2 group">
          <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <ArrowLeft size={16} className="text-black/80"/>
          </div>
      </Link>
    </>
  );
}
