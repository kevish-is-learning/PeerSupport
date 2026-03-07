"use client";

import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export function Spinner({ className, size = "default" }) {
  const sizes = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <Loader2 className={cn("animate-spin text-primary", sizes[size], className)} />
  );
}

export function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Spinner size="xl" className="mx-auto mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="flex items-center justify-center p-8">
      <Spinner />
    </div>
  );
}
