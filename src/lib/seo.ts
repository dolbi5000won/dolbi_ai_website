import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export const SEO_KEYWORDS = [
  "기업 AI 업무자동화",
  "중소기업 AI 도입",
  "AI 업무 에이전트",
  "바이브 코딩 교육",
  "Claude Code 교육",
  "Cursor AI 교육",
  "AI 네이티브 개발",
  "DOLBI",
  "JK SYSTEMS",
] as const;

/** Returns site origin only when explicitly configured. Never invent a domain. */
export function getSiteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function absoluteUrl(path: string): string | undefined {
  const base = getSiteUrl();
  if (!base) return undefined;
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = SEO_KEYWORDS,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const metadata: Metadata = {
    title,
    description,
    keywords: [...keywords],
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: BRAND.name,
      title: `${title} | ${BRAND.name}`,
      description,
      ...(url ? { url } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND.name}`,
      description,
    },
    ...(url
      ? {
          alternates: { canonical: url },
        }
      : {}),
    ...(noIndex
      ? {
          robots: { index: false, follow: false },
        }
      : {}),
  };

  return metadata;
}

export const PUBLIC_ROUTES = [
  { path: "/", title: `${BRAND.name} — ${BRAND.sloganEn}`, changeFrequency: "weekly" as const, priority: 1 },
  { path: "/automation", title: "AI 업무자동화", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/development", title: "AI 시스템 개발", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/academy", title: "AI 교육", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/project", title: "PROJECT", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/insight", title: "INSIGHT", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/about", title: "ABOUT", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/contact", title: "CONTACT", changeFrequency: "monthly" as const, priority: 0.8 },
] as const;
