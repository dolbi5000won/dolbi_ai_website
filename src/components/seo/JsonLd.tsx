import { BRAND } from "@/lib/constants";
import { absoluteUrl, SEO_KEYWORDS } from "@/lib/seo";

export function OrganizationJsonLd() {
  const url = absoluteUrl("/");
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    legalName: BRAND.company,
    slogan: BRAND.sloganEn,
    description: BRAND.sloganKo,
    ...(url ? { url } : {}),
    knowsAbout: [...SEO_KEYWORDS],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const url = absoluteUrl("/");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    description: BRAND.sloganKo,
    inLanguage: "ko-KR",
    ...(url ? { url } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
