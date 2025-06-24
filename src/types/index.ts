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
}

export interface WidgetInstance extends WidgetConfig {
  instanceId: string;
}
