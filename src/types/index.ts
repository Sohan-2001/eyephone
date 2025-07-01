
import type React from 'react';

export interface WidgetComponentProps {
  instanceId: string;
  // Any other common props for widgets
}

export type WidgetComponent = React.FC<WidgetComponentProps>;

export interface WidgetConfig {
  id: string;
  name: string;
  description: string;
  component: WidgetComponent;
  colSpan: number;
  rowSpan: number;
  isIcon?: boolean;
  href?: string;
}

export interface WidgetInstance extends WidgetConfig {
  instanceId: string;
}

// App-specific types
export type Note = {
  id: number;
  title: string;
  content: string;
  updated_at: string;
  folder_id: number | null;
};

export type Folder = {
  id: number;
  name: string;
};
