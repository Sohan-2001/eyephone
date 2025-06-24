"use client";

import { useState } from "react";
import type { WidgetInstance, WidgetConfig } from "@/types";
import { WIDGET_REGISTRY } from "@/lib/widget-registry";
import { WidgetWrapper } from "@/components/widget-wrapper";
import { AddWidgetSheet } from "@/components/add-widget-sheet";
import { SmartSuggestionsDialog } from "@/components/smart-suggestions-dialog";
import { Button } from "@/components/ui/button";
import { Grip, Plus, Sparkles } from "lucide-react";
import { Dock } from "@/components/dock";

const INITIAL_WIDGETS: WidgetInstance[] = [
  { ...WIDGET_REGISTRY.Clock, instanceId: "initial-1" },
  { ...WIDGET_REGISTRY.Weather, instanceId: "initial-2" },
  { ...WIDGET_REGISTRY.Calendar, instanceId: "initial-3" },
  { ...WIDGET_REGISTRY.Music, instanceId: "initial-4" },
  { ...WIDGET_REGISTRY.Settings, instanceId: "initial-5" },
  { ...WIDGET_REGISTRY.Mail, instanceId: "initial-6" },
];

export default function WidgetBoard() {
  const [widgets, setWidgets] = useState<WidgetInstance[]>(INITIAL_WIDGETS);
  const [isEditing, setIsEditing] = useState(false);

  const addWidget = (widgetConfig: WidgetConfig) => {
    const newWidget: WidgetInstance = {
      ...widgetConfig,
      instanceId: `widget-${Date.now()}-${Math.random()}`,
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const removeWidget = (instanceId: string) => {
    setWidgets((prev) => prev.filter((w) => w.instanceId !== instanceId));
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative">
      {/* Action Buttons */}
      <div className="fixed top-12 right-6 z-20 flex flex-col gap-2">
         <SmartSuggestionsDialog onAddWidget={addWidget}>
            <Button size="icon" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Sparkles />
            </Button>
        </SmartSuggestionsDialog>
        <AddWidgetSheet onAddWidget={addWidget}>
          <Button size="icon" className="rounded-full">
            <Plus />
          </Button>
        </AddWidgetSheet>
        <Button size="icon" variant={isEditing ? 'default': 'secondary'} className="rounded-full" onClick={() => setIsEditing(e => !e)}>
            <Grip />
        </Button>
      </div>
      
      <div className="p-4 pt-12">
        <div className="grid grid-cols-4 auto-rows-[80px] gap-4">
          {widgets.map((widget) => (
            <WidgetWrapper
              key={widget.instanceId}
              colSpan={widget.colSpan}
              rowSpan={widget.rowSpan}
              isEditing={isEditing}
              onRemove={() => removeWidget(widget.instanceId)}
              isIcon={widget.isIcon}
            >
              <widget.component instanceId={widget.instanceId} />
            </WidgetWrapper>
          ))}
        </div>
      </div>

      <div className="h-32" />

      <Dock />
    </div>
  );
}
