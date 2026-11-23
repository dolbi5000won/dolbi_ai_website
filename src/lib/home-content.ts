export const AUDIENCE_ENTRIES = [
  {
    href: "/contact",
    label: "기업 고객",
    title: "업무에 AI를 도입하고 싶다면",
    description:
      "반복 업무 자동화부터 사내 시스템·교육까지, 기업 맞춤으로 상담합니다.",
    cta: "기업 상담 신청",
  },
  {
    href: "/academy",
    label: "개인 고객",
    title: "AI로 일하는 역량을 키우고 싶다면",
    description:
      "생성형 AI, Cursor, Claude Code, 바이브 코딩까지 실습 중심 교육을 제공합니다.",
    cta: "교육 프로그램 보기",
  },
] as const;

export const CORE_SERVICES = [
  {
    href: "/automation",
    number: "01",
    title: "AI 업무자동화",
    description:
      "ERP 보고서, 엑셀·문서, 이메일 자동화와 AI 업무 에이전트로 반복 업무를 줄입니다.",
    points: ["보고서·문서 자동화", "이메일·에이전트", "사내 지식검색"],
  },
  {
    href: "/development",
    number: "02",
    title: "AI 시스템 개발",
    description:
      "업무관리, 그룹웨어, 문서관리 등 AI 네이티브 사내 시스템을 설계·구축합니다.",
    points: ["AI 네이티브 개발", "업무·문서 시스템", "사내 웹앱"],
  },
  {
    href: "/academy",
    number: "03",
    title: "AI 교육",
    description:
      "생성형 AI 활용부터 Cursor·Claude Code·바이브 코딩까지, 기업·개인 교육을 운영합니다.",
    points: ["업무 활용 교육", "바이브 코딩", "기업 맞춤 과정"],
  },
] as const;

export const PROJECT_TEASER = {
  title: "프로젝트 사례",
  description:
    "문제 정의부터 해결 방법, 적용 기술과 구현 결과까지 검증된 사례만 공개합니다.",
  note: "현재 게시 준비 중입니다. 확인되지 않은 고객사·실적은 기재하지 않습니다.",
  href: "/project",
  cta: "프로젝트 목록 보기",
} as const;

export const ACADEMY_PROGRAMS = [
  {
    slug: "generative-ai-work",
    title: "생성형 AI 업무 활용",
    audience: "실무자 · 팀 리더",
  },
  {
    slug: "cursor-ai-intro",
    title: "Cursor AI 입문",
    audience: "개발·기획 입문자",
  },
  {
    slug: "claude-code-practice",
    title: "Claude Code 실전",
    audience: "개발자 · 엔지니어",
  },
  {
    slug: "vibe-coding-project",
    title: "바이브 코딩 프로젝트",
    audience: "실습 중심 수강생",
  },
  {
    slug: "supabase-practice",
    title: "Supabase 실습",
    audience: "풀스택 입문자",
  },
  {
    slug: "enterprise-custom",
    title: "기업 맞춤형 교육",
    audience: "기업 · 팀 단위",
  },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "업무에 바로 붙는 AI",
    description:
      "데모용이 아닌 실제 업무 흐름—보고서, 문서, 메일, 검색—에 맞춰 설계합니다.",
  },
  {
    title: "자동화 · 개발 · 교육의 연결",
    description:
      "도입만 하고 끝나지 않습니다. 시스템 구축과 조직 역량 교육을 함께 제공합니다.",
  },
  {
    title: "전국 온라인 · 방문 교육",
    description:
      "온라인으로 빠르게 시작하고, 필요 시 기업 방문 교육으로 현장 적용을 돕습니다.",
  },
] as const;

/** Hero flow diagram — taken from the automation service scope. */
export const HERO_FLOW = {
  inputs: ["ERP 데이터", "엑셀 · 문서", "수신 메일"],
  agent: "AI 업무 에이전트",
  outputs: ["정기 보고서", "회신 초안", "지식검색 답변"],
} as const;

/** Keywords strip — services and training topics offered. */
export const HERO_KEYWORDS = [
  "ERP 보고서 자동화",
  "엑셀 · 문서 자동화",
  "이메일 자동화",
  "AI 업무 에이전트",
  "사내 지식검색",
  "AI 네이티브 개발",
  "업무 · 문서 시스템",
  "생성형 AI 활용",
  "Cursor",
  "Claude Code",
  "바이브 코딩",
  "Supabase",
] as const;
