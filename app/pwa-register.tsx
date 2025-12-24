"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register service worker directly
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("✅ PWA Service Worker registered:", registration.scope);
          
          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("🔄 New PWA version available!");
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log("⚠️ Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
