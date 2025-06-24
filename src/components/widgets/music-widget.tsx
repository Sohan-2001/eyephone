"use client";

import Image from "next/image";
import { Play, Forward, Backward } from "lucide-react";
import type { WidgetComponentProps } from "@/types";

export function MusicWidget({ instanceId }: WidgetComponentProps) {
  return (
    <div className="w-full h-full flex items-center p-3 bg-red-500/10 backdrop-blur-xl">
      <div className="flex items-center gap-3 w-full">
        <Image
          src="https://placehold.co/100x100.png"
          alt="Album art"
          data-ai-hint="album cover"
          width={64}
          height={64}
          className="rounded-md w-16 h-16"
        />
        <div className="flex-1 overflow-hidden">
          <p className="font-semibold text-foreground truncate">Lo-Fi Beats</p>
          <p className="text-sm text-muted-foreground truncate">Chillhop Music</p>
        </div>
      </div>
    </div>
  );
}
