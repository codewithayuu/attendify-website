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
    // @ts-ignore - Longtask type not in lib.dom.d.ts by default in some TS targets
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn("[longtask]", {
          duration: Math.round(entry.duration),
          name: entry.name,
        });
      }
    });
    try {
      // @ts-ignore
      po.observe({ type: "longtask", buffered: true });
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
