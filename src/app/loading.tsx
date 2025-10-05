export default function Loading() {
  return (
    <main className="px-4 sm:px-6 md:px-8 py-20 animate-pulse">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-10 w-72 rounded bg-white/10" />
        <div className="h-4 w-96 rounded bg-white/5" />
        <div className="h-[360px] w-full rounded-xl bg-white/5" />
      </div>
    </main>
  );
}
