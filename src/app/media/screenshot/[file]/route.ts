import { NextRequest } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";

const CONTENT_TYPE: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { file: string } },
) {
  try {
    const filename = decodeURIComponent(params.file);
    const base = path.join(process.cwd(), "src", "screenshot");
    const full = path.join(base, filename);
    const rel = path.relative(base, full);

    if (rel.startsWith("..") || path.isAbsolute(rel)) {
      return new Response("Not found", { status: 404 });
    }

    const data = await fs.readFile(full);
    const ext = path.extname(filename).toLowerCase();
    const type = CONTENT_TYPE[ext] || "application/octet-stream";

    return new Response(data, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
