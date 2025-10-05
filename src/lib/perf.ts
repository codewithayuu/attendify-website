export function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const mem = (navigator as any).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const dpr =
    typeof window !== "undefined" ? (window.devicePixelRatio ?? 1) : 1;
  return coarse || mem <= 4 || cores <= 4 || dpr < 2;
}

export function getQueryFlag(name: string): string | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
