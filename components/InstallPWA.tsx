"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: try to install anyway
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker ready:", registration);
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("✅ User accepted the install prompt");
    } else {
      console.log("❌ User dismissed the install prompt");
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // Check if already installed
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // Already installed
      return;
    }
  }, []);

  if (!showInstallButton) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg shadow-lg transition-all hover:scale-105 glow-effect"
      aria-label="Install App"
    >
      <Download size={20} />
      <span className="font-semibold">Install App</span>
    </button>
  );
}

