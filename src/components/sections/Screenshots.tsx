"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Slide } from "@/lib/screenshots";
import { useMotionPrefs } from "@/components/providers/MotionProvider";
import { motion } from "framer-motion";
import { springs } from "@/lib/motion";

export default function Screenshots({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
    align: "center",
    inViewThreshold: 0.5,
  });
  const [index, setIndex] = useState(0);
  const pauseRef = useRef(false);
  const { reduced, coarse, density } = useMotionPrefs();
  const enableAnim = density === "high" && !coarse && !reduced;
  const mobileSimple = coarse || reduced || density === "low";

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !slides?.length || !enableAnim) return;
    let timer: number | undefined;
    const tick = () => {
      if (!pauseRef.current) emblaApi.scrollNext();
      timer = window.setTimeout(tick, 3500);
    };
    timer = window.setTimeout(tick, 3500);
    const onVis = () => {
      pauseRef.current = document.hidden;
    };
    const onPointer: EventListener = () => {
      pauseRef.current = true;
      window.setTimeout(() => (pauseRef.current = false), 4000);
    };
    document.addEventListener("visibilitychange", onVis);
    emblaApi?.containerNode().addEventListener("pointerdown", onPointer, { passive: true });
    emblaApi?.containerNode().addEventListener("mouseenter", onPointer, { passive: true });
    emblaApi?.containerNode().addEventListener("focusin", onPointer, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
      emblaApi?.containerNode().removeEventListener("pointerdown", onPointer);
      emblaApi?.containerNode().removeEventListener("mouseenter", onPointer);
      emblaApi?.containerNode().removeEventListener("focusin", onPointer);
    };
  }, [emblaApi, slides, enableAnim]);

  const visibleSet = useMemo(() => {
    if (mobileSimple) return new Set<number>(slides.map((_, i) => i));
    const n = slides?.length ?? 0;
    const isNear = (i: number) => {
      if (!n) return false;
      const d1 = (i - index + n) % n;
      const d2 = (index - i + n) % n;
      const d = Math.min(d1, d2);
      return d <= 3; // widen buffer to current ±3
    };
    return new Set(
      Array.from({ length: n }, (_, i) => (isNear(i) ? i : -1)).filter(
        (v) => v !== -1,
      ) as number[],
    );
  }, [index, slides, mobileSimple]);

  if (!slides || slides.length === 0) {
    return (
      <section className="section-heavy px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
        <div className="mx-auto max-w-6xl text-center text-[var(--color-muted)]">
          Add screenshots in{" "}
          <code className="px-1 py-0.5 rounded bg-white/5">
            src/screenshots/
          </code>{" "}
          to populate this gallery.
        </div>
      </section>
    );
  }

  return (
    <section className="section-heavy px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold">Screenshots</h2>
        <div className="mt-6 overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-3 md:-ml-4 justify-center">
            {slides.map((s, i) => (
              <div
                key={i}
                className="shrink-0 grow-0 w-[75vw] sm:w-[52vw] lg:w-[280px] lg:max-w-[280px] pl-3 md:pl-4"
              >
                <motion.div
                  className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)]/30"
                  animate={enableAnim ? { scale: i === index ? 1 : 0.98 } : undefined}
                  transition={springs.gentle}
                >
                  <div className="relative w-full h-[36vh] sm:h-[38vh] lg:h-[440px] max-h-[480px] overflow-hidden">
                    {visibleSet.has(i) ? (
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 52vw, 280px"
                        className="object-contain"
                        priority={i === 0}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5" aria-hidden />
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} aria-label={`Go to slide ${i + 1}`} className={`size-2 rounded-full ${index === i ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
