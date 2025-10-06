"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Slide } from "@/lib/screenshots";
import { useMotionPrefs } from "@/components/providers/MotionProvider";
// Removed framer-motion in this section to avoid GPU flicker on some mobile browsers

export default function Screenshots({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
    align: "center",
    inViewThreshold: 0.5,
  });
  const [index, setIndex] = useState(0);
  const { reduced, coarse, density } = useMotionPrefs();

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Autoplay removed to reduce flicker during manual swipes

  // Always render images to avoid blanks during fast swipes on some mobile browsers

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
        <div className="mt-6 overflow-hidden" ref={emblaRef} style={{ touchAction: "pan-y" }}>
          <div className="flex -ml-3 md:-ml-4 justify-center">
            {slides.map((s, i) => (
              <div
                key={i}
                className="shrink-0 grow-0 w-[75vw] sm:w-[52vw] lg:w-[280px] lg:max-w-[280px] pl-3 md:pl-4"
              >
                <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)]/30">
                  <div
                    className="relative w-full h-[36vh] sm:h-[38vh] lg:h-[440px] max-h-[480px] overflow-hidden"
                    style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 52vw, 280px"
                      className="object-contain"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`size-2 rounded-full ${index === i ? "bg-white" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
