"use client";

import { useEffect } from "react";

export default function RuntimeBudget() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    // Rough estimate: sum transferSize of script resources, if available
    const resources = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[];
    const scriptBytes = resources
      .filter((r) => r.initiatorType === "script")
      .reduce((sum, r) => sum + (r.transferSize || 0), 0);

    const KB = scriptBytes / 1024;
    if (KB > 130) {
      // eslint-disable-next-line no-console
      console.warn(
        `[Budget] Client JS ~${KB.toFixed(1)}KB exceeds 130KB target.`,
      );
    }
  }, []);

  return null;
}
