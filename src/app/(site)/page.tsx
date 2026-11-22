import type { Metadata } from "next";
import { AcademyTeaser } from "@/components/home/AcademyTeaser";
import { AudienceEntry } from "@/components/home/AudienceEntry";
import { Differentiators } from "@/components/home/Differentiators";
import { Hero } from "@/components/home/Hero";
import { HomeCta } from "@/components/home/HomeCta";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { Services } from "@/components/home/Services";
import { BRAND } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `${BRAND.name} — ${BRAND.sloganEn}`,
    description:
      "기업 AI 업무자동화, AI 네이티브 시스템 개발, 바이브 코딩·Cursor·Claude Code 교육을 제공하는 DOLBI입니다.",
    path: "/",
  }),
  title: {
    absolute: `${BRAND.name} — ${BRAND.sloganEn}`,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AudienceEntry />
      <Services />
      <ProjectsTeaser />
      <AcademyTeaser />
      <Differentiators />
      <HomeCta />
    </>
  );
}
