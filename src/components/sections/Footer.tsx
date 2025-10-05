export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 sm:px-6 md:px-8 py-10 border-t border-[var(--color-border)]/60">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 text-sm text-[var(--color-muted)]">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="https://github.com/codewithayuu/attendify" className="hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:codewithayuu@gmail.com" className="hover:underline">Contact</a>
          <a
            href="https://forms.gle/AuhjDUD29Y71tYYr9"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bugs & Feedback
          </a>
        </div>
        <div className="text-center">© {year} • Made with ❤️ by iambatman.</div>
      </div>
    </footer>
  );
}
