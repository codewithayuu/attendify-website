import dynamic from "next/dynamic";

const HeroClient = dynamic(() => import("@/components/sections/HeroClient"));

export default async function Hero() {
  const apkUrl =
    "https://github.com/codewithayuu/attendify/releases/download/untagged-a2d00adedf7e91171b40/attendify-v1.1.0-release.2.apk";
  return <HeroClient apkUrl={apkUrl} />;
}
