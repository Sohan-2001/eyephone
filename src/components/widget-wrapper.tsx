"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WidgetWrapperProps {
  children: React.ReactNode;
  className?: string;
  colSpan: number;
  rowSpan: number;
  isEditing: boolean;
  onRemove: () => void;
  isIcon?: boolean;
}

export function WidgetWrapper({
  children,
  className,
  colSpan,
  rowSpan,
  isEditing,
  onRemove,
  isIcon = false,
}: WidgetWrapperProps) {
  const style = {
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
  };

  return (
    <div
      style={style}
      className={cn(
        "relative group transition-all duration-300 ease-in-out",
        isEditing && !isIcon && "scale-[0.98] animate-pulse",
        className
      )}
    >
      <div
        className={cn(
          "h-full w-full overflow-hidden transition-all",
          isIcon
            ? ""
            : "rounded-3xl shadow-md bg-card transform-gpu"
        )}
      >
        {children}
      </div>
      {isEditing && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -left-2 w-7 h-7 rounded-full z-10 scale-90"
          onClick={onRemove}
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
}
