import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import { InView } from "@/lib/inview";
import { getScreenshots } from "@/lib/screenshots";
import ClientProviders from "@/components/providers/ClientProviders";

const ScreenshotsClient = dynamic(() => import("@/components/sections/Screenshots"), {
  loading: () => (
    <section className="px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-8 w-48 rounded bg-white/10" />
        <div className="mt-6 h-[360px] w-full rounded-xl bg-white/5" />
      </div>
    </section>
  ),
});

const FeaturesClient = dynamic(() => import("@/components/sections/Features"), {
  loading: () => (
    <section className="px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-8 w-48 rounded bg-white/10" />
        <div className="mt-6 h-40 w-full rounded-xl bg-white/5" />
      </div>
    </section>
  ),
});

const FAQClient = dynamic(() => import("@/components/sections/FAQ"), {
  loading: () => (
    <section className="px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="h-8 w-32 rounded bg-white/10" />
        <div className="mt-6 h-24 w-full rounded-xl bg-white/5" />
      </div>
    </section>
  ),
});

export default async function Home() {
  const slides = await getScreenshots();
  return (
    <ClientProviders>
      <main>
        <Hero />
        <InView>
          <FeaturesClient />
        </InView>
        <InView>
          <ScreenshotsClient slides={slides} />
        </InView>
        <HowItWorks />
        <InView>
          <FAQClient />
        </InView>
        <FinalCTA />
        <Footer />
      </main>
    </ClientProviders>
  );
}
