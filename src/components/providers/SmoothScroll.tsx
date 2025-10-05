"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useSearchParams } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const params = useSearchParams();

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const deviceMemory = (navigator as any).deviceMemory as number | undefined;
    const cores = (navigator as any).hardwareConcurrency as number | undefined;
    const lowEnd = (deviceMemory && deviceMemory <= 4) || (cores && cores <= 4);
    const toggle = params?.get("lenis");
    const forceOn = toggle === "on";
    const forceOff = toggle === "off";

    // Disable on touch devices and when reduced motion is preferred
    if (!forceOn && (forceOff || isCoarse || prefersReduced || lowEnd)) {
      return;
    }

    const lenis = new Lenis({
      // Desktop smoothing only
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 2), // gentle quad
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const onVisibility = () => {
      if (document.hidden) lenis.stop();
      else lenis.start();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [params]);

  return <>{children}</>;
}
