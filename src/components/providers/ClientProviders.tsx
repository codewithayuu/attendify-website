"use client";

import { ReactNode, useEffect, useState } from "react";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import RuntimeBudget from "@/components/runtime/RuntimeBudget";
import PerfGate from "@/components/runtime/PerfGate";

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
      <PerfGate />
      <MotionProvider>
        <SmoothScroll>
          <RuntimeBudget />
          {children}
        </SmoothScroll>
      </MotionProvider>
    </>
  );
}
