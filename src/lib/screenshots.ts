import fs from "node:fs/promises";
import path from "node:path";

export type Slide = { src: string; alt: string };

const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

export async function getScreenshots(): Promise<Slide[]> {
  const primary = path.join(process.cwd(), "src", "screenshots");
  const fallback = path.join(process.cwd(), "src", "screenshot");
  let base = primary;
  let entries: string[] = [];
  try {
    entries = await fs.readdir(primary);
  } catch {
    try {
      base = fallback;
      entries = await fs.readdir(fallback);
    } catch {
      return [];
    }
  }

  const files = entries
    .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    );

  return files.map((file) => ({
    src: `/screenshots/${encodeURIComponent(file)}`,
    alt: file.replace(/\.[^.]+$/, ""),
  }));
}
