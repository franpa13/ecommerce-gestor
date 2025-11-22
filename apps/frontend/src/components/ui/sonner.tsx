"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
          style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success-bg": "var(--background)",
          "--success-text": "hsl(142.1 76.2% 36.3%)",
          "--success-border": "hsl(142.1 76.2% 36.3%)",
          "--error-bg": "var(--background)",
          "--error-text": "hsl(0 84.2% 60.2%)",
          "--error-border": "hsl(0 84.2% 60.2%)",
          "--warning-bg": "var(--background)",
          "--warning-text": "hsl(38 92% 50%)",
          "--warning-border": "hsl(38 92% 50%)",
          "--info-bg": "var(--background)",
          "--info-text": "hsl(221.2 83.2% 53.3%)",
          "--info-border": "hsl(221.2 83.2% 53.3%)",
          "--loading-bg": "var(--background)",
          "--loading-text": "hsl(215 13.8% 34.1%)",
          "--loading-border": "hsl(215 13.8% 34.1%)",
        } as React.CSSProperties
      }
      {...props}
    />
 
  )
}

export { Toaster }