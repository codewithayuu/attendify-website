"use client";

import { useEffect } from "react";

export default function Plausible() {
  useEffect(() => {
    const isDNT =
      (typeof navigator !== "undefined" &&
        ((navigator as any).doNotTrack === "1" ||
          (window as any).doNotTrack === "1")) ||
      false;
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

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(inject);
    } else {
      setTimeout(inject, 1500);
    }
  }, []);

  return null;
}
