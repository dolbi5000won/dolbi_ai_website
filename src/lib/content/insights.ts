export type InsightCategory =
  | "AI 기술 정보"
  | "업무자동화 사례"
  | "AI 개발 가이드"
  | "바이브 코딩 활용법";

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  summary: string;
  content: readonly string[];
};

export const INSIGHT_CATEGORIES: readonly InsightCategory[] = [
  "AI 기술 정보",
  "업무자동화 사례",
  "AI 개발 가이드",
  "바이브 코딩 활용법",
] as const;

export const INSIGHTS: readonly Insight[] = [
  {
    slug: "ai-agent-basics",
    title: "AI 업무 에이전트, 어디서부터 설계할까",
    category: "AI 기술 정보",
    summary:
      "챗봇과 업무 에이전트의 차이를 정리하고, 절차·도구·승인 게이트 중심으로 설계하는 방법을 소개합니다.",
    content: [
      "업무 에이전트는 대화만이 목적이 아닙니다. 조회, 작성, 분류, 알림처럼 실제 업무 단계를 수행하는 것이 핵심입니다.",
      "설계의 출발점은 모델 선택이 아니라 업무 절차입니다. 입력 데이터, 필요한 도구, 사람 승인 시점, 실패 시 대응을 먼저 정의합니다.",
      "작은 범위의 파일럿으로 정확도와 예외 케이스를 확인한 뒤, 운영 모니터링과 권한 정책을 포함해 확장하는 것이 안전합니다.",
    ],
  },
  {
    slug: "automation-start-checklist",
    title: "중소기업 AI 업무자동화 시작 체크리스트",
    category: "업무자동화 사례",
    summary:
      "특정 고객사 실적이 아니라, 도입 전에 점검해야 할 업무·데이터·권한 체크리스트를 정리했습니다.",
    content: [
      "자동화 후보는 ‘자주 반복되고, 규칙이 있으며, 실패해도 되돌리기 쉬운’ 업무부터 고르는 것이 좋습니다.",
      "데이터 출처와 담당자, 최종 산출물 양식, 예외 처리 방법을 문서화하면 파일럿 범위가 명확해집니다.",
      "이 글은 일반 도입 가이드이며, 개별 기업의 수치 성과를 주장하지 않습니다. 실제 사례는 검증 후 PROJECT에 게시합니다.",
    ],
  },
  {
    slug: "ai-native-dev-principles",
    title: "AI 네이티브 개발을 위한 5가지 원칙",
    category: "AI 개발 가이드",
    summary:
      "기능을 나중에 붙이는 방식이 아니라, 검색·작성·자동화·권한이 제품 구조에 녹도록 설계하는 원칙입니다.",
    content: [
      "요구사항 단계부터 ‘사람이 할 일’과 ‘에이전트가 할 일’을 나눕니다.",
      "모든 AI 출력에는 근거, 버전, 재실행 가능성을 남길 수 있게 데이터 모델을 설계합니다.",
      "권한과 감사 로그는 부가 기능이 아니라 기본 요구사항입니다. 특히 사내 문서·고객 데이터 연동 시 필수입니다.",
      "평가 기준(정확도, 지연, 비용, 사용자 수정률)을 초기에 정해 개선 사이클을 만듭니다.",
      "교육과 운영 가이드를 제품 인수와 함께 전달해야 현업에서 지속 사용됩니다.",
    ],
  },
  {
    slug: "vibe-coding-workflow",
    title: "바이브 코딩으로 프로토타입을 만드는 실무 순서",
    category: "바이브 코딩 활용법",
    summary:
      "아이디어에서 데모 가능한 결과물까지, 범위를 통제하며 빠르게 만드는 작업 순서를 안내합니다.",
    content: [
      "먼저 사용자 한 명의 핵심 시나리오만 남기고 범위를 줄입니다. 욕심 많은 MVP는 완성되지 않습니다.",
      "화면 흐름 → 데이터 최소 구조 → 인증 → 핵심 동작 순으로 만들고, 매 단계마다 실행 가능한 상태를 유지합니다.",
      "AI에게 전체를 한 번에 맡기기보다, 작은 단위로 구현·검토·수정하는 루프가 품질을 높입니다.",
      "데모 후에는 기술 부채와 보안·권한 항목을 체크리스트로 남겨 다음 고도화 우선순위를 정합니다.",
    ],
  },
] as const;

export function getInsightBySlug(slug: string): Insight | undefined {
  return INSIGHTS.find((item) => item.slug === slug);
}

export const INSIGHT_PAGE = {
  eyebrow: "INSIGHT",
  title: "INSIGHT",
  description:
    "AI 기술 정보, 업무자동화 가이드, AI 개발, 바이브 코딩 활용법을 공유합니다.",
} as const;
