import { DefaultSeoProps } from "next-seo";

const siteUrl = "https://attendify.app"; // TODO: update to your production domain

export const defaultSEO: DefaultSeoProps = {
  title: "Attendify — Smart attendance, simplified",
  description:
    "The clean, fast way to track attendance. Lightweight, offline-first mindset, and built for speed.",
  canonical: siteUrl,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Attendify — Smart attendance, simplified",
    description:
      "The clean, fast way to track attendance. Lightweight, offline-first mindset, and built for speed.",
    images: [
      {
        url: `${siteUrl}/og.svg`,
        width: 1200,
        height: 630,
        alt: "Attendify",
      },
    ],
    siteName: "Attendify",
  },
  twitter: {
    cardType: "summary_large_image",
  },
  additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
};
