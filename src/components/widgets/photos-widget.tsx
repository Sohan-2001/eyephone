"use client";

import Image from "next/image";
import type { WidgetComponentProps } from "@/types";

export function PhotosWidget({ instanceId }: WidgetComponentProps) {
  return (
    <div className="w-full h-full bg-black relative">
      <Image
        src="https://placehold.co/300x300.png"
        alt="Featured photo"
        data-ai-hint="nature landscape"
        fill
        className="object-cover"
      />
      <div className="absolute bottom-2 left-2 bg-black/30 text-white text-xs p-1 rounded">
        For You
      </div>
    </div>
  );
}
