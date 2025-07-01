import React from "react";
import type { WidgetConfig } from "@/types";
import { ClockWidget } from "@/components/widgets/clock-widget";
import { CalendarWidget } from "@/components/widgets/calendar-widget";
import { WeatherWidget } from "@/components/widgets/weather-widget";
import { PhotosWidget } from "@/components/widgets/photos-widget";
import { MusicWidget } from "@/components/widgets/music-widget";
import { AppIcon } from "@/components/widgets/app-icon";
import { Compass } from "lucide-react";
import { CameraAppIcon } from "@/components/widgets/camera-app-icon";
import { SettingsAppIcon } from "@/components/widgets/settings-app-icon";
import { MailAppIcon } from "@/components/widgets/mail-app-icon";
import { MessagesAppIcon } from "@/components/widgets/messages-app-icon";
import { MusicAppIcon } from "@/components/widgets/music-app-icon";

export const WIDGET_REGISTRY: Record<string, WidgetConfig> = {
  Clock: {
    id: "Clock",
    name: "Clock",
    description: "Shows the current time and date.",
    component: ClockWidget,
    colSpan: 2,
    rowSpan: 2,
  },
  Calendar: {
    id: "Calendar",
    name: "Calendar",
    description: "Displays upcoming events.",
    component: CalendarWidget,
    colSpan: 2,
    rowSpan: 1,
  },
  Weather: {
    id: "Weather",
    name: "Weather",
    description: "Shows the current weather.",
    component: WeatherWidget,
    colSpan: 2,
    rowSpan: 1,
  },
  Photos: {
    id: "Photos",
    name: "Photos",
    description: "Highlights photos from your library.",
    component: PhotosWidget,
    colSpan: 2,
    rowSpan: 2,
  },
  Music: {
    id: "Music",
    name: "Music",
    description: "Control your music playback.",
    component: MusicWidget,
    colSpan: 2,
    rowSpan: 1,
  },
  MusicApp: {
    id: "MusicApp",
    name: "Music",
    description: "Listen to your music.",
    isIcon: true,
    component: MusicAppIcon,
    colSpan: 1,
    rowSpan: 1,
  },
  Settings: {
    id: "Settings",
    name: "Settings",
    description: "Access system settings.",
    isIcon: true,
    component: SettingsAppIcon,
    colSpan: 1,
    rowSpan: 1,
  },
  Mail: {
    id: "Mail",
    name: "Mail",
    description: "Check your email.",
    isIcon: true,
    component: MailAppIcon,
    colSpan: 1,
    rowSpan: 1,
  },
  Messages: {
    id: "Messages",
    name: "Messages",
    description: "Your text conversations.",
    isIcon: true,
    href: "/messages",
    component: MessagesAppIcon,
    colSpan: 1,
    rowSpan: 1,
  },
  Camera: {
    id: "Camera",
    name: "Camera",
    description: "Access the camera.",
    isIcon: true,
    component: CameraAppIcon,
    colSpan: 1,
    rowSpan: 1,
  },
  Safari: {
    id: "Safari",
    name: "Safari",
    description: "Browse the web.",
    isIcon: true,
    href: "/safari",
    component: (props) =>
      React.createElement(AppIcon, {
        ...props,
        icon: Compass,
        label: "Safari",
        color: "#3b82f6",
      }),
    colSpan: 1,
    rowSpan: 1,
  },
};
