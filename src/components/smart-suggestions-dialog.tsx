"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Plus, Sparkles } from "lucide-react";
import { suggestWidgets } from "@/ai/flows/suggest-widgets";
import { WIDGET_REGISTRY } from "@/lib/widget-registry";
import type { WidgetConfig } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface SmartSuggestionsDialogProps {
  onAddWidget: (widget: WidgetConfig) => void;
  children: React.ReactNode;
}

export function SmartSuggestionsDialog({
  onAddWidget,
  children,
}: SmartSuggestionsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<WidgetConfig[]>([]);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await suggestWidgets({
        usagePatterns:
          "User frequently checks calendar in the morning and listens to music in the evening.",
        currentContext: `It is currently ${new Date().toLocaleTimeString()}.`,
      });

      const suggestedWidgets = result.suggestedWidgets
        .map((widgetName) => WIDGET_REGISTRY[widgetName])
        .filter(Boolean); // Filter out any widgets not in our registry

      setSuggestions(suggestedWidgets);
    } catch (error) {
      console.error("Failed to get widget suggestions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch AI suggestions. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWidget = (widget: WidgetConfig) => {
    onAddWidget(widget);
    toast({
      title: "Widget Added",
      description: `${widget.name} has been added to your board.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" />
            Smart Suggestions
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader className="animate-spin" />
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Based on your habits, we think you'll like these:
              </p>
              <ul className="space-y-2">
                {suggestions.map((widget) => (
                  <li
                    key={widget.id}
                    className="flex items-center justify-between p-2 bg-secondary rounded-md"
                  >
                    <div>
                      <p className="font-semibold">{widget.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {widget.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddWidget(widget)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Click "Get Suggestions" to see what our AI recommends for you.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleGetSuggestions}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Get Suggestions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
