import fs from "node:fs/promises";
import path from "node:path";

export type Slide = { src: string; alt: string };

const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

export async function getScreenshots(): Promise<Slide[]> {
  // Prefer developer-provided images in src/; fallback to public/
  const candidates = [
    path.join(process.cwd(), "src", "screenshots"),
    path.join(process.cwd(), "src", "screenshot"),
    path.join(process.cwd(), "public", "screenshots"),
    path.join(process.cwd(), "public", "screenshot"),
  ];

  for (const dir of candidates) {
    try {
      const entries = await fs.readdir(dir);
      const files = entries
        .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
        .sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
        );
      if (files.length > 0) {
        return files.map((file) => ({
          src: `/media/screenshots/${encodeURIComponent(file)}`,
          alt: file.replace(/\.[^.]+$/, ""),
        }));
      }
    } catch {}
  }
  return [];
}
