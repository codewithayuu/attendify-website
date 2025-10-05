"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FPSMeter from "@/components/runtime/FPSMeter";

export default function PerfGate() {
  const params = useSearchParams();
  const enabled = params?.get("debug") === "perf";

  useEffect(() => {
    if (!enabled) return;
    if (typeof PerformanceObserver === "undefined") return;
    // Long task observer to detect TBT hotspots
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn("[longtask]", {
          duration: Math.round(entry.duration),
          name: entry.name,
        });
      }
    });
    try {
      // Some TS lib.dom versions don't include 'longtask'; assert the init type safely
      po.observe({ type: "longtask", buffered: true } as unknown as PerformanceObserverInit);
    } catch {}
    return () => {
      try {
        po.disconnect();
      } catch {}
    };
  }, [enabled]);

  if (!enabled) return null;
  return <FPSMeter />;
}
