"use client";

import { ReactNode, useEffect, useState } from "react";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render providers during SSR to avoid framer-motion useContext error
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <MotionProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </MotionProvider>
    </>
  );
}
