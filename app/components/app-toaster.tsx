"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#0f172a",
          color: "#f8fafc",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "14px",
          padding: "12px 16px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#d4ff3a",
            secondary: "#0f172a",
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171",
            secondary: "#0f172a",
          },
        },
      }}
    />
  );
}
