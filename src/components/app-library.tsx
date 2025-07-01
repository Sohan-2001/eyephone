"use client";

import React from 'react';
import { WIDGET_REGISTRY } from "@/lib/widget-registry";
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AppLibrary() {
    const appIcons = Object.values(WIDGET_REGISTRY).filter(widget => widget.isIcon);

    return (
        <div className="p-4 h-full flex flex-col pt-12">
            <h1 className="text-2xl font-bold text-white mb-4 px-2">App Library</h1>
            <ScrollArea className="flex-1">
                <div className="grid grid-cols-4 gap-y-8 p-2">
                    {appIcons.map(app => {
                        const AppIconComponent = app.component;
                        return (
                            <div key={app.id} className="flex flex-col items-center">
                                <AppIconComponent instanceId={`app-library-${app.id}`} />
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
