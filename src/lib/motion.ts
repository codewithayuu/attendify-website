import { useRef } from "react";

export const springs = {
  snappy: { type: "spring" as const, damping: 28, stiffness: 220 },
  gentle: { type: "spring" as const, damping: 32, stiffness: 180 },
};

export const tweens = {
  micro: {
    type: "tween" as const,
    duration: 0.18,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export function useWillChangeTransient(prop = "transform") {
  const ref = useRef<HTMLElement | null>(null);
  const onStart = () => ref.current?.style.setProperty("will-change", prop);
  const onComplete = () => ref.current?.style.removeProperty("will-change");
  return { ref, onStart, onComplete } as const;
}

export function useMagnetic({ radius = 96, strength = 0.15 } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current as HTMLElement | null;
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
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };
  return { ref, onMouseMove, onMouseLeave } as const;
}
