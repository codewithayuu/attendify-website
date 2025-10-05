import { useRef } from "react";
import type { Transition } from "framer-motion";

export const springs: { snappy: Transition; gentle: Transition } = {
  snappy: { type: "spring", damping: 28, stiffness: 220 },
  gentle: { type: "spring", damping: 32, stiffness: 180 },
};

export const tweens: { micro: Transition } = {
  micro: {
    type: "tween",
    duration: 0.18,
    ease: [0.22, 1, 0.36, 1],
  },
};

export function useWillChangeTransient<T extends HTMLElement = HTMLElement>(
  prop = "transform",
) {
  const ref = useRef<T | null>(null);
  const onStart = () => ref.current?.style.setProperty("will-change", prop);
  const onComplete = () => ref.current?.style.removeProperty("will-change");
  return { ref, onStart, onComplete } as const;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  { radius = 96, strength = 0.15 } = {},
) {
  const ref = useRef<T | null>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      el.style.transform = "translate3d(0,0,0)";
      return;
    }
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };
  return { ref, onMouseMove, onMouseLeave } as const;
}
