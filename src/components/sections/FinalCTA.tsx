import CTAButton from "@/components/ui/CTAButton";
import { FaGithub } from "react-icons/fa6";

export default function FinalCTA() {
  return (
    <section className="section-heavy px-4 sm:px-6 md:px-8 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Ready to move faster?
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          The clean, fast way to track who’s here—built for Android.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CTAButton
            href="https://github.com/codewithayuu/attendify/releases/download/untagged-a2d00adedf7e91171b40/attendify-v1.1.0-release.2.apk"
            rel="nofollow noopener noreferrer"
            download
          >
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
      </div>
    </section>
  );
}
