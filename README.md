# DOLBI — Official Website

JK SYSTEMS / DOLBI AI 공식 홈페이지 프로젝트입니다.

**Make AI Work.** — AI로 일하는 방식의 새로운 기준.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS
- Supabase (PostgreSQL, Auth, SSR) — 4단계 이후
- Resend — 4단계 이후
- Vercel / GitHub — 배포는 승인 후

## Brand

| Token | Value |
|-------|-------|
| Navy | `#101D35` |
| Blue | `#2878E5` |
| Cyan | `#65C7F3` |
| Font | Pretendard |

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and fill values when integrating services.
Do not commit `.env` / `.env.local`.

Supabase schema: see `supabase/APPLY.md` and `supabase/migrations/`.

```bash
npm run test:validation
npm run test:security
```

## Development phases

1. Foundation (layout & design system)
2. Home & brand
3. Business / project / insight pages
4. Supabase forms & Resend
5. Admin
6. Security, SEO, deploy prep — current

Admin login: `/admin/login`  
Create admin (no public signup): `npm run create-admin -- email password`

Deploy checklist: see `DEPLOY.md` (do not push/deploy without approval).

SEO: `robots.ts` / `sitemap.ts` — sitemap URLs are emitted only when `NEXT_PUBLIC_SITE_URL` is set.
