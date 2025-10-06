"use client";

import { MotionConfig } from "framer-motion";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type MotionPrefs = {
  reduced: boolean;
  coarse: boolean;
  lowEnd: boolean;
  density: "low" | "high";
};

const MotionPrefsContext = createContext<MotionPrefs>({
  reduced: false,
  coarse: false,
  lowEnd: false,
  density: "high",
});

export function useMotionPrefs() {
  return useContext(MotionPrefsContext);
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs] = useState<MotionPrefs>({
    reduced: false,
    coarse: false,
    lowEnd: false,
    density: "high",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd = nav.deviceMemory
      ? nav.deviceMemory <= 4
      : (navigator.hardwareConcurrency ?? 8) <= 4;
    const density: "low" | "high" =
      reduced || lowEnd || coarse ? "low" : "high";
    setPrefs({ reduced, coarse, lowEnd, density });
  }, []);

  // Tune springs; fallback to gentle tweens when reduced motion
  const transition = useMemo(() => {
    if (prefs.reduced) {
      return {
        type: "tween" as const,
        duration: 0.18,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      };
    }
    return { type: "spring" as const, damping: 30, stiffness: 200, mass: 0.8 };
  }, [prefs.reduced]);

  // Don't render MotionConfig during SSR to avoid useContext errors
  if (!mounted) {
    return (
      <MotionPrefsContext.Provider value={prefs}>
        {children}
      </MotionPrefsContext.Provider>
    );
  }

  return (
    <MotionPrefsContext.Provider value={prefs}>
      <MotionConfig
        reducedMotion={prefs.reduced ? "always" : "never"}
        transition={transition}
      >
        {children}
      </MotionConfig>
    </MotionPrefsContext.Provider>
  );
}
