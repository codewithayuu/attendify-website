"use client";

import { useState } from "react";

const faqs = [
  { q: "Is it free?", a: "Yes. The app is open-source." },
  { q: "Does it work offline?", a: "Yes, it is designed to be offline-friendly." },
  {
    q: "Does it track to 75%?",
    a: "Yes. It shows how many more classes you need to attend to reach the 75% target used by many colleges.",
  },
  {
    q: "Can I export data?",
    a: "Export to CSV/Excel is coming soon.",
  },
];

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${i}`;
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/40">
      <button
        aria-controls={id}
        aria-expanded={open}
        className="w-full text-left px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-to)]/70"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{q}</span>
      </button>
      <div
        id={id}
        hidden={!open}
        className="px-4 pb-4 text-sm text-[var(--color-muted)]"
      >
        {a}
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="section-heavy px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f, i) => (
            <Item key={i} q={f.q} a={f.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
