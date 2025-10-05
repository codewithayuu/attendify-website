"use client";

import { useEffect } from "react";

export default function Plausible() {
  useEffect(() => {
    const navDNT =
      typeof navigator !== "undefined"
        ? (navigator as Navigator & { doNotTrack?: string }).doNotTrack
        : undefined;
    const winDNT =
      typeof window !== "undefined"
        ? (window as Window & { doNotTrack?: string }).doNotTrack
        : undefined;
    const isDNT = (navDNT === "1" || winDNT === "1") || false;
    if (isDNT) return;

    const inject = () => {
      if (document.getElementById("plausible-script")) return;
      const s = document.createElement("script");
      s.defer = true;
      s.src = "https://plausible.io/js/script.js";
      s.id = "plausible-script";
      s.setAttribute("data-domain", "attendify.app"); // TODO: set your domain
      document.head.appendChild(s);
    };

    type RequestIdleCallbackFn = (
      cb: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
      opts?: { timeout?: number },
    ) => number;
    const w = window as Window & { requestIdleCallback?: RequestIdleCallbackFn };
    if ("requestIdleCallback" in window && typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(inject);
    } else {
      setTimeout(inject, 1500);
    }
  }, []);

  return null;
}
