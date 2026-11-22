export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: readonly string[];
  content: readonly string[];
  /** Only include verified metrics when available. */
  outcomes?: readonly string[];
};

/**
 * Published projects only. Keep empty until verified cases are ready.
 * Do not invent client names or unverified results.
 */
export const PROJECTS: readonly Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export const PROJECT_PAGE = {
  eyebrow: "PROJECT",
  title: "프로젝트 포트폴리오",
  description:
    "문제점, 해결 방법, 적용 기술, 구현 결과를 중심으로 검증된 사례만 공개합니다.",
  emptyTitle: "게시된 프로젝트가 아직 없습니다",
  emptyDescription:
    "확인되지 않은 고객사·실적은 기재하지 않습니다. 검증된 사례가 준비되면 목록과 상세 페이지(/project/[slug])를 게시합니다.",
} as const;

/** Detail page template fields for when verified projects are added. */
export const PROJECT_DETAIL_SECTIONS = [
  "문제점",
  "해결 방법",
  "적용 기술",
  "구현 내용",
  "실제 성과(검증 시에만)",
] as const;
