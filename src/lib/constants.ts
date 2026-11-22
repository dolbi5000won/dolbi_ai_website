export const BRAND = {
  name: "DOLBI",
  company: "JK SYSTEMS",
  sloganEn: "Make AI Work.",
  sloganKo: "AI로 일하는 방식의 새로운 기준.",
} as const;

export const COLORS = {
  navy: "#101D35",
  blue: "#2878E5",
  cyan: "#65C7F3",
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export const MAIN_NAV: NavItem[] = [
  { href: "/", label: "HOME" },
  { href: "/automation", label: "AI 업무자동화" },
  { href: "/development", label: "AI 시스템 개발" },
  { href: "/academy", label: "AI 교육" },
  { href: "/project", label: "PROJECT" },
  { href: "/insight", label: "INSIGHT" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export const FOOTER_LINKS: NavItem[] = [
  { href: "/about", label: "회사 소개" },
  { href: "/contact", label: "상담 문의" },
  { href: "/academy", label: "교육 신청" },
  { href: "/privacy", label: "개인정보처리방침" },
];
