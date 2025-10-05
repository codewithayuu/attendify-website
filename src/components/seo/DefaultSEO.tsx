"use client";

import { DefaultSeo, SoftwareAppJsonLd } from "next-seo";
import { defaultSEO } from "@/seo/defaultSeo";

export default function DefaultSEO() {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <SoftwareAppJsonLd
        name="Attendify"
        price="0"
        priceCurrency="USD"
        aggregateRating={{ ratingValue: "5", reviewCount: "1" }}
        operatingSystem="Android"
        applicationCategory="BusinessApp"
        offers={{ price: "0", priceCurrency: "USD" }}
      />
    </>
  );
}
