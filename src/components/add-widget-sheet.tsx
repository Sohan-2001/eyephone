"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WIDGET_REGISTRY } from "@/lib/widget-registry";
import type { WidgetConfig } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";

interface AddWidgetSheetProps {
  onAddWidget: (widget: WidgetConfig) => void;
  children: React.ReactNode;
}

export function AddWidgetSheet({
  onAddWidget,
  children,
}: AddWidgetSheetProps) {
  const availableWidgets = Object.values(WIDGET_REGISTRY);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="h-[80%] flex flex-col">
        <SheetHeader>
          <SheetTitle>Add Widgets</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {availableWidgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-secondary p-4 rounded-lg flex flex-col gap-2 items-start"
              >
                <div className="font-semibold text-secondary-foreground">{widget.name}</div>
                <div className="text-sm text-muted-foreground">
                  {widget.description}
                </div>
                <div className="w-full h-32 bg-background rounded-md mt-2 overflow-hidden flex items-center justify-center">
                   {/* This is a simple preview. In a real app, you might render the actual widget in a scaled-down state. */}
                   <div className="transform scale-[0.4] origin-center">
                    <div className="w-60 h-60 border rounded-2xl overflow-hidden">
                       <widget.component instanceId={`preview-${widget.id}`} />
                    </div>
                   </div>
                </div>
                <Button onClick={() => onAddWidget(widget)} className="mt-2 self-end">
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
