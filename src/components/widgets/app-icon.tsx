"use client";

import type { LucideIcon } from "lucide-react";
import type { WidgetComponentProps } from "@/types";

interface AppIconProps extends WidgetComponentProps {
  icon: LucideIcon;
  label: string;
  color: string;
  iconColor?: string;
}

export function AppIcon({
  icon: Icon,
  label,
  color,
  iconColor = "white",
}: AppIconProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full p-2">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Icon size={32} style={{ color: iconColor }} />
      </div>
      <span className="text-xs text-center text-foreground font-medium mt-1">
        {label}
      </span>
    </div>
  );
}
