import type { Metadata, Viewport } from "next";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { BRAND } from "@/lib/constants";
import { getSiteUrl, SEO_KEYWORDS } from "@/lib/seo";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${BRAND.name} — ${BRAND.sloganEn}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.sloganKo,
  keywords: [...SEO_KEYWORDS],
  applicationName: BRAND.name,
  authors: [{ name: BRAND.company }],
  creator: BRAND.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.sloganEn}`,
    description: BRAND.sloganKo,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.sloganEn}`,
    description: BRAND.sloganKo,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101D35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full font-sans text-foreground">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
