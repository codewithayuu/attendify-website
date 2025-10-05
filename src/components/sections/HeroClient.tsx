"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionPrefs } from "@/components/providers/MotionProvider";
import { FaGithub } from "react-icons/fa6";
import { useWillChangeTransient } from "@/lib/motion";
import CTAButton from "@/components/ui/CTAButton";

export default function HeroClient({ apkUrl }: { apkUrl: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { reduced, coarse, lowEnd, density } = useMotionPrefs();
  const enableParallax = density === "high" && !coarse && !lowEnd && !reduced;

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, enableParallax ? -60 : 0],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, enableParallax ? -35 : 0],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, enableParallax ? -20 : 0],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const titleWC = useWillChangeTransient<HTMLHeadingElement>("transform");
  const subWC = useWillChangeTransient<HTMLParagraphElement>("transform");

  return (
    <section
      ref={ref}
      className="relative isolate px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-36"
      style={{ perspective: "900px" }}
    >
      <div className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_20%,#000_40%,transparent_70%)]">
        {/* Layer 1: broad gradient wash */}
        <motion.div
          style={{ y: y3 }}
          className="absolute inset-x-0 -top-40 h-[480px] bg-gradient-to-tr from-[var(--accent-from)]/30 via-transparent to-[var(--accent-to)]/30 blur-3xl will-change-transform"
        />
        {/* Layer 2: soft orb left */}
        <motion.div
          style={{ y: y2 }}
          className="absolute -left-10 top-20 size-64 rounded-full bg-[var(--color-accent-to)]/10 blur-2xl will-change-transform"
        />
        {/* Layer 3: soft orb right */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -right-10 top-10 size-72 rounded-full bg-[var(--color-accent-from)]/10 blur-2xl will-change-transform"
        />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 flex justify-center">
          <a
            href="https://github.com/codewithayuu/attendify"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)]/70 bg-black/20 px-3 py-1 text-xs text-[var(--color-muted)] hover:bg-black/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden /> Open-source on GitHub
          </a>
        </div>
        <motion.h1
          ref={titleWC.ref}
          onUpdate={titleWC.onStart}
          onAnimationComplete={titleWC.onComplete}
          style={{ y: y1, opacity, transformStyle: "preserve-3d" }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight will-change-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Hit 75% with confidence
        </motion.h1>
        <motion.p
          ref={subWC.ref}
          onUpdate={subWC.onStart}
          onAnimationComplete={subWC.onComplete}
          style={{ y: y2, opacity, transformStyle: "preserve-3d" }}
          className="mt-4 text-base sm:text-lg text-[var(--color-muted)] will-change-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Track attendance and see exactly how many classes you need to reach
          the 75% mark. Export is coming soon.
        </motion.p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 relative">
          <CTAButton href={apkUrl} rel="nofollow noopener noreferrer" download>
            Download APK
          </CTAButton>
          <CTAButton
            href="https://github.com/codewithayuu/attendify"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <FaGithub aria-hidden /> View on GitHub
          </CTAButton>
        </div>
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Direct APK from GitHub Releases.
        </p>
      </div>
    </section>
  );
}
