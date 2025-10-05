import type { Metadata } from "next";
import type { NextWebVitalsMetric } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import DefaultSEO from "@/components/seo/DefaultSEO";
import RuntimeBudget from "@/components/runtime/RuntimeBudget";
import Plausible from "@/components/analytics/Plausible";
import PerfGate from "@/components/runtime/PerfGate";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attendify — Smart attendance, simplified",
  description:
    "The clean, fast way to track attendance. Lightweight, offline-first mindset, and built for speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased starfield`}
      >
        <DefaultSEO />
        <Plausible />
        <PerfGate />
        <Analytics />
        <SpeedInsights />
        <MotionProvider>
          <SmoothScroll>
            <RuntimeBudget />
            {children}
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}

// Web Vitals export: logs to console and forwards to Plausible (if available)
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (typeof window === "undefined") return;
  console.log("[web-vitals]", metric);
  type PlausibleFn = (
    event: string,
    options?: { props?: Record<string, string | number> }
  ) => void;
  const plausible = (
    window as unknown as { plausible?: PlausibleFn }
  ).plausible;
  try {
    plausible?.("Web Vitals", {
      props: {
        id: metric.id,
        name: metric.name,
        value: Math.round(metric.value),
        label: metric.label,
      },
    });
  } catch {}
}
