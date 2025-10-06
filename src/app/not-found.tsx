export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function NotFound() {
  return (
    <main className="px-4 sm:px-6 md:px-8 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          The page you are looking for does not exist.
        </p>
        <a href="/" className="mt-6 inline-block rounded bg-white/10 px-4 py-2 hover:bg-white/20">
          Go back home
        </a>
      </div>
    </main>
  );
}
