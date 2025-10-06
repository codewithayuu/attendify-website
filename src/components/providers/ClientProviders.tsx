"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

const MotionProvider = dynamic(() => import("@/components/providers/MotionProvider"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/providers/SmoothScroll"), { ssr: false });
const RuntimeBudget = dynamic(() => import("@/components/runtime/RuntimeBudget"), { ssr: false });
const PerfGate = dynamic(() => import("@/components/runtime/PerfGate"), { ssr: false });

export default function ClientProviders({ children }: { children: ReactNode }) {
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
