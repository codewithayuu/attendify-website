export type ReleaseAsset = {
  browser_download_url: string;
  name: string;
  content_type?: string;
};

export async function getLatestApkUrl(): Promise<string> {
  const res = await fetch(
    "https://api.github.com/repos/codewithayuu/attendify/releases/latest",
    {
      next: { revalidate: 60 },
      headers: { "User-Agent": "Attendify-Website" },
    },
  );

  if (!res.ok) {
    // Fallback to releases page if API fails
    return "https://github.com/codewithayuu/attendify/releases";
  }

  const json = await res.json();
  const assets: ReleaseAsset[] = json.assets ?? [];
  const apk = assets.find((a) => a.name?.toLowerCase().endsWith(".apk"));
  return (
    apk?.browser_download_url ||
    "https://github.com/codewithayuu/attendify/releases"
  );
}
