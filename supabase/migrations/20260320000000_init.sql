-- DOLBI homepage schema (Phase 4)
-- Apply via supabase/APPLY.md — do not run on production without approval.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- inquiries
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 100),
  company text check (company is null or char_length(trim(company)) <= 200),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 255),
  phone text not null check (char_length(trim(phone)) between 7 and 30),
  inquiry_type text not null check (
    inquiry_type in (
      'enterprise_automation',
      'development',
      'education',
      'general'
    )
  ),
  subject text not null check (char_length(trim(subject)) between 1 and 200),
  message text not null check (char_length(trim(message)) between 1 and 5000),
  privacy_consent boolean not null check (privacy_consent = true),
  status text not null default 'pending' check (
    status in ('pending', 'in_progress', 'done', 'spam')
  ),
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_email_created_at_idx on public.inquiries (email, created_at desc);
create index if not exists inquiries_inquiry_type_idx on public.inquiries (inquiry_type);

-- ---------------------------------------------------------------------------
-- courses
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null check (char_length(trim(description)) >= 1),
  target_audience text not null,
  curriculum jsonb not null default '[]'::jsonb,
  duration text not null,
  difficulty text not null check (difficulty in ('입문', '중급', '실전', '맞춤')),
  price integer check (price is null or price >= 0), -- KRW integer
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists courses_is_active_idx on public.courses (is_active);
create index if not exists courses_slug_idx on public.courses (slug);

-- ---------------------------------------------------------------------------
-- course_applications
-- ---------------------------------------------------------------------------
create table if not exists public.course_applications (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete restrict,
  applicant_name text not null check (char_length(trim(applicant_name)) between 1 and 100),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 255),
  phone text not null check (char_length(trim(phone)) between 7 and 30),
  company text check (company is null or char_length(trim(company)) <= 200),
  participant_count integer not null default 1 check (participant_count between 1 and 500),
  preferred_date date,
  message text check (message is null or char_length(message) <= 5000),
  privacy_consent boolean not null check (privacy_consent = true),
  status text not null default 'pending' check (
    status in ('pending', 'confirmed', 'cancelled', 'completed')
  ),
  created_at timestamptz not null default now()
);

create index if not exists course_applications_created_at_idx
  on public.course_applications (created_at desc);
create index if not exists course_applications_status_idx
  on public.course_applications (status);
create index if not exists course_applications_course_id_idx
  on public.course_applications (course_id);
create index if not exists course_applications_email_created_at_idx
  on public.course_applications (email, created_at desc);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null,
  summary text not null,
  problem text not null,
  solution text not null,
  technologies text[] not null default '{}',
  thumbnail text,
  content text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_is_published_idx on public.projects (is_published);
create index if not exists projects_slug_idx on public.projects (slug);

-- ---------------------------------------------------------------------------
-- insights
-- ---------------------------------------------------------------------------
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null,
  summary text not null,
  content text not null,
  thumbnail text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists insights_is_published_idx on public.insights (is_published);
create index if not exists insights_slug_idx on public.insights (slug);
create index if not exists insights_category_idx on public.insights (category);

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
before update on public.courses
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists insights_set_updated_at on public.insights;
create trigger insights_set_updated_at
before update on public.insights
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.inquiries enable row level security;
alter table public.courses enable row level security;
alter table public.course_applications enable row level security;
alter table public.projects enable row level security;
alter table public.insights enable row level security;

-- Public: no direct access to inquiries / applications (server uses service role)
revoke all on public.inquiries from anon, authenticated;
revoke all on public.course_applications from anon, authenticated;

-- Courses: public can read active courses only
revoke all on public.courses from anon, authenticated;
grant select on public.courses to anon, authenticated;

drop policy if exists "Public read active courses" on public.courses;
create policy "Public read active courses"
on public.courses
for select
to anon, authenticated
using (is_active = true);

-- Projects / insights: public read published only
revoke all on public.projects from anon, authenticated;
revoke all on public.insights from anon, authenticated;
grant select on public.projects to anon, authenticated;
grant select on public.insights to anon, authenticated;

drop policy if exists "Public read published projects" on public.projects;
create policy "Public read published projects"
on public.projects
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Public read published insights" on public.insights;
create policy "Public read published insights"
on public.insights
for select
to anon, authenticated
using (is_published = true);

-- Note: admin write/read policies are added in Phase 5 with authenticated admin role.
-- Service role bypasses RLS for trusted server actions.

-- ---------------------------------------------------------------------------
-- Seed courses (idempotent by slug)
-- ---------------------------------------------------------------------------
insert into public.courses (
  title, slug, description, target_audience, curriculum, duration, difficulty, price, is_active
)
values
  (
    '생성형 AI 업무 활용',
    'generative-ai-work',
    '문서 작성, 요약, 조사, 회의 정리 등 실무에 바로 쓰는 생성형 AI 활용법을 익힙니다.',
    '실무자 · 팀 리더',
    '["생성형 AI 업무 적용 원칙","프롬프트와 산출물 품질 관리","문서·메일·회의 활용 실습","팀 내 안전한 사용 가이드"]'::jsonb,
    '1일 또는 2일',
    '입문',
    null,
    true
  ),
  (
    'Cursor AI 입문',
    'cursor-ai-intro',
    'Cursor 환경에서 AI와 함께 코드를 읽고, 수정하고, 작은 기능을 구현하는 방법을 배웁니다.',
    '개발·기획 입문자',
    '["Cursor 인터페이스와 워크플로","코드베이스 이해와 질문하는 법","리팩터링·버그 수정 실습","작은 기능 구현 미니 프로젝트"]'::jsonb,
    '1일',
    '입문',
    null,
    true
  ),
  (
    'Claude Code 실전',
    'claude-code-practice',
    'Claude Code를 활용해 실무형 개발 과제를 수행하고, 에이전트형 코딩 워크플로를 익힙니다.',
    '개발자 · 엔지니어',
    '["Claude Code 실무 워크플로","요구사항 → 구현 → 검증 루프","테스트·리뷰와 함께 쓰는 방법","팀 협업 시 주의점"]'::jsonb,
    '1일 또는 2일',
    '실전',
    null,
    true
  ),
  (
    '바이브 코딩 프로젝트',
    'vibe-coding-project',
    '아이디어를 빠르게 서비스 형태로 만드는 바이브 코딩 프로젝트를 끝까지 완성합니다.',
    '실습 중심 수강생',
    '["문제 정의와 범위 설정","AI 협업으로 UI·로직 구현","데이터·인증 기본 연결","데모 가능한 결과물 완성"]'::jsonb,
    '2일 또는 단기 프로젝트',
    '중급',
    null,
    true
  ),
  (
    'Supabase 실습',
    'supabase-practice',
    'Supabase로 인증, 데이터베이스, 정책을 구성하고 실습 앱에 연결합니다.',
    '풀스택 입문자',
    '["Supabase 프로젝트 구성","테이블·관계 설계 기초","Auth와 RLS 개념 실습","프론트엔드 연동 실습"]'::jsonb,
    '1일',
    '중급',
    null,
    true
  ),
  (
    '기업 맞춤형 교육',
    'enterprise-custom',
    '팀의 업무, 도구, 보안 정책에 맞춰 커리큘럼과 실습 과제를 설계하는 방문·온라인 교육입니다.',
    '기업 · 팀 단위',
    '["사전 인터뷰 및 업무 분석","맞춤 커리큘럼 설계","실습·워크숍 진행","사후 적용 가이드 제공"]'::jsonb,
    '협의',
    '맞춤',
    null,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  target_audience = excluded.target_audience,
  curriculum = excluded.curriculum,
  duration = excluded.duration,
  difficulty = excluded.difficulty,
  is_active = excluded.is_active,
  updated_at = now();
