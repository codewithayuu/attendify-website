export default function HowItWorks() {
  const steps = [
    { title: "Add classes", desc: "Set up your subjects and start tracking in seconds." },
    { title: "Track to 75%", desc: "See how many classes to attend to hit the 75% mark." },
    { title: "Export (soon)", desc: "CSV/Excel export is coming soon." },
  ];

  return (
    <section className="section-heavy px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold">
          How it works
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 p-5"
            >
              <div className="text-sm text-[var(--color-muted)]">
                Step {i + 1}
              </div>
              <div className="mt-1 text-lg font-medium">{s.title}</div>
              <div className="mt-1 text-sm text-[var(--color-muted)]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
