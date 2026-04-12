"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          border: "2px solid #0d0d0f",
          borderRadius: "14px",
        },
      }}
    />
  );
}
