import { Toaster as SonnerComponent } from "sonner";

import type { ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  
  const theme = (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  ) as ToasterProps["theme"]; 

  return (
    <SonnerComponent 
      theme={theme} 
      className="toaster group"
   
      style={
        {
          "--normal-bg": "hsl(var(--popover))", 
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border))",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
