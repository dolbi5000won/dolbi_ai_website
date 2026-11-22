# 배포 준비 (Phase 6) — 승인 후 진행

이 문서는 **준비 절차**입니다. GitHub Push와 Vercel 운영 배포는 별도 승인 없이 실행하지 마세요.

## 1. 사전 체크

- [ ] `npm run lint` 통과
- [ ] `npm run typecheck` 통과
- [ ] `npm run test:validation` 통과
- [ ] `npm run build` 통과
- [ ] `.env*` 실키가 Git에 포함되지 않음
- [ ] Supabase SQL (`init` → `admin`) 테스트 프로젝트에 적용됨
- [ ] 공개 회원가입 비활성 + `create-admin`으로 관리자 생성
- [ ] Resend 발신 도메인/테스트 메일 확인
- [ ] 운영 도메인 확정 후 `NEXT_PUBLIC_SITE_URL` 설정 (확정 전 임의 도메인 금지)

## 2. 환경변수 (Vercel / 호스팅)

| Key | 공개 | 설명 |
|-----|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Anon key |
| `NEXT_PUBLIC_SITE_URL` | yes | 확정된 `https://도메인` (SEO/sitemap) |
| `SUPABASE_SERVICE_ROLE_KEY` | **no** | 서버 전용 |
| `RESEND_API_KEY` | **no** | 서버 전용 |
| `RESEND_FROM_EMAIL` | no | 발신 주소 |
| `ADMIN_NOTIFICATION_EMAIL` | no | 관리자 알림 |

## 3. 권장 배포 순서 (승인 후)

1. GitHub 원격 연결 및 최초 Push (승인)
2. Vercel 프로젝트 연결 (승인)
3. Preview 환경에서 폼·관리자·메일 스모크 테스트
4. Production 환경변수 입력
5. Production 배포 (최종 승인)
6. `/robots.txt`, `/sitemap.xml`, 주요 OG 태그 확인

## 4. 배포 후 스모크

- [ ] 홈·3대 사업·교육·CONTACT 페이지
- [ ] 모바일 메뉴·상담 CTA
- [ ] 상담/교육 신청 (정상·검증 실패·중복)
- [ ] `/admin` 비로그인 차단, 관리자 로그인
- [ ] 이메일 알림 (실패해도 DB 유지)
