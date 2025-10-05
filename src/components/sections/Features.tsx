"use client";

import { motion } from "framer-motion";
import { useMotionPrefs } from "@/components/providers/MotionProvider";
import {
  LuBolt,
  LuSparkles,
  LuCloudOff,
  LuFileDown,
  LuShieldCheck,
  LuCode,
} from "react-icons/lu";
import { springs, useWillChangeTransient } from "@/lib/motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: LuBolt,
    title: "Add classes fast",
    desc: "Create and update classes in seconds.",
  },
  {
    icon: LuSparkles,
    title: "75% tracker",
    desc: "See how many classes to attend to reach the 75% target.",
  },
  {
    icon: LuCloudOff,
    title: "Offline friendly",
    desc: "Works even with spotty connections.",
  },
  {
    icon: LuFileDown,
    title: "Export (coming soon)",
    desc: "CSV/Excel export is on the way.",
  },
  { icon: LuShieldCheck, title: "Privacy-first", desc: "No creepy tracking." },
  { icon: LuCode, title: "Open-source", desc: "Trust the code." },
];

export default function Features() {
  const { reduced, coarse } = useMotionPrefs();
  const wc = useWillChangeTransient("transform");
  const hover =
    reduced || coarse
      ? {}
      : {
          whileHover: { y: -6, scale: 1.01, transition: springs.snappy as any },
        };

  return (
    <section className="px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-2xl sm:text-3xl font-semibold">
            Why Attendify
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--color-muted)]">
            Fast, focused features that don't get in your way.
          </p>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              onUpdate={wc.onStart}
              onAnimationComplete={wc.onComplete}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 p-4 will-change-transform"
              transition={springs.snappy}
              {...hover}
            >
              <div className="flex items-start gap-3">
                <f.icon
                  className="size-5 text-[var(--color-accent-to)]"
                  aria-hidden
                />
                <div>
                  <h3 className="text-base font-medium">{f.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
