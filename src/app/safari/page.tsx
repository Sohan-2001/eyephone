
'use client';

import { Suspense } from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import SafariFavorites from "@/components/safari-favorites";
import SafariPrivacyReport from "@/components/safari-privacy-report";
import SafariReadingList from "@/components/safari-reading-list";
import SafariBottomNav from "@/components/safari-bottom-nav";

function SafariBrowser() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  if (url) {
    return (
      <>
        {/* Browser iframe view */}
        <div className="flex-1 w-full h-full flex flex-col pt-10 bg-white">
          <iframe 
            src={url}
            className="w-full h-full border-0"
            title="Safari"
            // Note: Some sites might block iframe embedding.
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
        
        <SafariBottomNav url={url} />
        
        {/* A back button to return to the Safari home page */}
        <Link href="/safari" className="absolute top-12 left-4 z-20 p-2 group">
            <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <ArrowLeft size={16} className="text-black/80"/>
            </div>
        </Link>
      </>
    );
  }

  return (
    <>
      {/* Safari "New Tab" page content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 bg-[#F1DED5]">
          <div className="p-4 space-y-8 pb-28">
              <SafariFavorites />
              <SafariPrivacyReport />
              <SafariReadingList />
          </div>
      </div>

      <SafariBottomNav />
      
      {/* A back button to return to the main home screen */}
      <Link href="/" className="absolute top-12 left-4 z-20 p-2 group">
          <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <ArrowLeft size={16} className="text-black/80"/>
          </div>
      </Link>
    </>
  );
}

export default function SafariPage() {
    return (
        <Suspense fallback={<div className="flex-1 w-full flex items-center justify-center bg-gray-100">Loading...</div>}>
            <SafariBrowser />
        </Suspense>
    )
}
