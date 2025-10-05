"use client";

import { useEffect, useRef, useState } from "react";

export default function FPSMeter() {
  const frameRef = useRef<number>(0);
  const lastRef = useRef<number>(performance.now());
  const framesRef = useRef<number>(0);
  const [fps, setFps] = useState<number>(0);

  useEffect(() => {
    const loop = (t: number) => {
      framesRef.current += 1;
      const delta = t - lastRef.current;
      if (delta >= 1000) {
        setFps(Math.round((framesRef.current * 1000) / delta));
        framesRef.current = 0;
        lastRef.current = t;
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 8,
        bottom: 8,
        zIndex: 50_000,
        fontSize: 12,
        padding: "4px 6px",
        borderRadius: 6,
        background: "rgba(0,0,0,0.6)",
        color: "#e6e6e6",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        pointerEvents: "none",
      }}
    >
      {fps} fps
    </div>
  );
}
