import { NextRequest } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import type { Stats } from "node:fs";

const CONTENT_TYPE: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

export async function GET(req: NextRequest, { params }: { params: { file: string } }) {
  try {
    const { file } = params;
    const filename = decodeURIComponent(file);
    // Serve from public to match /screenshots/* URLs reliably in prod
    const bases = [
      path.join(process.cwd(), "public", "screenshots"),
      path.join(process.cwd(), "public", "screenshot"),
    ];

    let full: string | null = null;
    let stat: Stats | null = null;
    for (const base of bases) {
      const candidate = path.join(base, filename);
      const rel = path.relative(base, candidate);
      if (rel.startsWith("..") || path.isAbsolute(rel)) continue; // traversal guard
      try {
        stat = await fs.stat(candidate);
        full = candidate;
        break;
      } catch {}
    }

    if (!full || !stat) return new Response("Not found", { status: 404 });

    const data = await fs.readFile(full);
    const ext = path.extname(filename).toLowerCase();
    const type = CONTENT_TYPE[ext] || "application/octet-stream";
    const etag = `W/"${stat.size}-${stat.mtimeMs}"`;
    const lastModified = stat.mtime.toUTCString();

    const ifNoneMatch = req.headers.get("if-none-match");
    const ifModifiedSince = req.headers.get("if-modified-since");
    if (
      ifNoneMatch === etag ||
      (ifModifiedSince && new Date(ifModifiedSince) >= stat.mtime)
    ) {
      return new Response(null, {
        status: 304,
        headers: {
          ETag: etag,
          "Last-Modified": lastModified,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new Response(data, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
        ETag: etag,
        "Last-Modified": lastModified,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
