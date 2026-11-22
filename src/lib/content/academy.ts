export type Course = {
  slug: string;
  title: string;
  summary: string;
  targetAudience: string;
  duration: string;
  difficulty: "입문" | "중급" | "실전" | "맞춤";
  curriculum: readonly string[];
  outcomes: readonly string[];
};

export const COURSES: readonly Course[] = [
  {
    slug: "generative-ai-work",
    title: "생성형 AI 업무 활용",
    summary:
      "문서 작성, 요약, 조사, 회의 정리 등 실무에 바로 쓰는 생성형 AI 활용법을 익힙니다.",
    targetAudience: "실무자 · 팀 리더",
    duration: "1일 또는 2일",
    difficulty: "입문",
    curriculum: [
      "생성형 AI 업무 적용 원칙",
      "프롬프트와 산출물 품질 관리",
      "문서·메일·회의 활용 실습",
      "팀 내 안전한 사용 가이드",
    ],
    outcomes: [
      "반복 문서 작업 시간 단축 루틴 설계",
      "업무별 프롬프트 템플릿 확보",
      "개인정보·보안 유의사항 이해",
    ],
  },
  {
    slug: "cursor-ai-intro",
    title: "Cursor AI 입문",
    summary:
      "Cursor 환경에서 AI와 함께 코드를 읽고, 수정하고, 작은 기능을 구현하는 방법을 배웁니다.",
    targetAudience: "개발·기획 입문자",
    duration: "1일",
    difficulty: "입문",
    curriculum: [
      "Cursor 인터페이스와 워크플로",
      "코드베이스 이해와 질문하는 법",
      "리팩터링·버그 수정 실습",
      "작은 기능 구현 미니 프로젝트",
    ],
    outcomes: [
      "AI 코딩 도구 기본 운용",
      "변경 범위를 통제하는 작업 습관",
      "입문 수준 기능 구현 경험",
    ],
  },
  {
    slug: "claude-code-practice",
    title: "Claude Code 실전",
    summary:
      "Claude Code를 활용해 실무형 개발 과제를 수행하고, 에이전트형 코딩 워크플로를 익힙니다.",
    targetAudience: "개발자 · 엔지니어",
    duration: "1일 또는 2일",
    difficulty: "실전",
    curriculum: [
      "Claude Code 실무 워크플로",
      "요구사항 → 구현 → 검증 루프",
      "테스트·리뷰와 함께 쓰는 방법",
      "팀 협업 시 주의점",
    ],
    outcomes: [
      "에이전트형 개발 루틴 정립",
      "품질 검증이 포함된 작업 흐름",
      "실무 과제 적용 포인트 확보",
    ],
  },
  {
    slug: "vibe-coding-project",
    title: "바이브 코딩 프로젝트",
    summary:
      "아이디어를 빠르게 서비스 형태로 만드는 바이브 코딩 프로젝트를 끝까지 완성합니다.",
    targetAudience: "실습 중심 수강생",
    duration: "2일 또는 단기 프로젝트",
    difficulty: "중급",
    curriculum: [
      "문제 정의와 범위 설정",
      "AI 협업으로 UI·로직 구현",
      "데이터·인증 기본 연결",
      "데모 가능한 결과물 완성",
    ],
    outcomes: [
      "동작하는 프로토타입 확보",
      "바이브 코딩 프로젝트 템플릿",
      "다음 고도화 로드맵",
    ],
  },
  {
    slug: "supabase-practice",
    title: "Supabase 실습",
    summary:
      "Supabase로 인증, 데이터베이스, 정책을 구성하고 실습 앱에 연결합니다.",
    targetAudience: "풀스택 입문자",
    duration: "1일",
    difficulty: "중급",
    curriculum: [
      "Supabase 프로젝트 구성",
      "테이블·관계 설계 기초",
      "Auth와 RLS 개념 실습",
      "프론트엔드 연동 실습",
    ],
    outcomes: [
      "기본 CRUD·인증 흐름 구현",
      "RLS 설계 포인트 이해",
      "다음 단계 운영 체크리스트",
    ],
  },
  {
    slug: "enterprise-custom",
    title: "기업 맞춤형 교육",
    summary:
      "팀의 업무, 도구, 보안 정책에 맞춰 커리큘럼과 실습 과제를 설계하는 방문·온라인 교육입니다.",
    targetAudience: "기업 · 팀 단위",
    duration: "협의",
    difficulty: "맞춤",
    curriculum: [
      "사전 인터뷰 및 업무 분석",
      "맞춤 커리큘럼 설계",
      "실습·워크숍 진행",
      "사후 적용 가이드 제공",
    ],
    outcomes: [
      "팀 업무에 맞는 교육 설계",
      "현장 적용 가능한 실습",
      "도입·자동화와 연계 가능",
    ],
  },
] as const;

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}

export const ACADEMY_PAGE = {
  eyebrow: "AI Academy",
  title: "AI 교육",
  description:
    "생성형 AI 업무 활용부터 Cursor, Claude Code, 바이브 코딩, Supabase까지. 전국 온라인과 기업 방문 교육을 제공합니다.",
} as const;
