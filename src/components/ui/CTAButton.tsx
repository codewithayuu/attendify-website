"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionPrefs } from "@/components/providers/MotionProvider";
import { useMagnetic } from "@/lib/motion";
import clsx from "clsx";

export type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
  download?: boolean;
  className?: string;
};

export default function CTAButton(props: CTAButtonProps) {
  const {
    href,
    children,
    variant = "primary",
    target,
    rel,
    download,
    className,
  } = props;
  const { reduced, coarse, density, lowEnd } = useMotionPrefs();
  const isDesktopMagnet = density === "high" && !coarse && !reduced;
  const mag = useMagnetic<HTMLAnchorElement>();

  // Simple, GPU-friendly ripple for mobile/coarse pointers
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const idRef = useRef(0);
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!coarse || reduced || lowEnd) return;
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++idRef.current;
    setRipples((r) => [...r, { id, x, y }]);
    // Cleanup after animation
    setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 300);
  };

  const base =
    "relative overflow-hidden inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-to)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 min-h-[44px] select-none";
  const styles = useMemo(() => {
    if (variant === "secondary")
      return "border border-[var(--color-border)] text-[var(--color-foreground)]/90 hover:bg-white/5 active:opacity-90";
    return "text-white bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] shadow-[0_0_0_1px_var(--color-border)_inset] hover:saturate-125 active:opacity-95";
  }, [variant]);

  const magnetProps = isDesktopMagnet
    ? {
        ref: (node: HTMLAnchorElement | null) => {
          btnRef.current = node;
          mag.ref.current = node;
        },
        onMouseMove: mag.onMouseMove,
        onMouseLeave: mag.onMouseLeave,
      }
    : { ref: btnRef };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      download={download}
      className={clsx(
        base,
        styles,
        className,
        coarse && !reduced && "active:scale-[0.98]",
      )}
      onPointerDown={onPointerDown}
      style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
      {...magnetProps}
    >
      {children}
      {/* Ripple container */}
      {coarse && !reduced && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          {ripples.map((r) => (
            <Ripple key={r.id} x={r.x} y={r.y} />
          ))}
        </span>
      )}
    </a>
  );
}

function Ripple({ x, y }: { x: number; y: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // start state
    el.style.transform = "translate(-50%, -50%) scale(0.2)";
    el.style.opacity = "0.25";
    requestAnimationFrame(() => {
      // end state
      el.style.transform = "translate(-50%, -50%) scale(1)";
      el.style.opacity = "0";
    });
  }, []);
  const size = 160; // small ripple for buttons
  return (
    <span
      ref={ref}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.9)",
        transition:
          "transform 180ms cubic-bezier(0.22,1,0.36,1), opacity 180ms linear",
        willChange: "transform, opacity",
        pointerEvents: "none",
      }}
    />
  );
}
