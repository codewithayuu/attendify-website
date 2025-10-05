export const metadata = {
  title: "Privacy — Attendify",
};

export default function PrivacyPage() {
  return (
    <main className="px-4 sm:px-6 md:px-8 py-16 text-[15px]/7">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Attendify respects your privacy. This marketing site does not collect
          personal data by default. Any optional analytics is privacy-friendly
          and respects Do Not Track.
        </p>
        <h2 className="mt-6 text-xl font-semibold">App data</h2>
        <p className="mt-2 text-[var(--color-muted)]">
          The Android app is open-source. Data you manage in the app stays on
          your device unless you export it. Review the repository for details.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-[var(--color-muted)]">
          For questions, reach out at{" "}
          <a href="mailto:codewithayuu@gmail.com">codewithayuu@gmail.com</a>.
        </p>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
