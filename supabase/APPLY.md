# Supabase 스키마 적용 절차

운영 DB에 임의로 SQL을 실행하지 마세요. 아래 순서로 **테스트 프로젝트**에 먼저 적용한 뒤, 승인 후 운영에 반영합니다.

## 1. 사전 확인

- Supabase 프로젝트(테스트) 준비
- SQL Editor 또는 CLI (`supabase db push`) 사용 권한 확인
- 백업/복구 방법을 알고 있는지 확인

## 2. 적용 파일 (순서 고정)

1. `migrations/20260320000000_init.sql` — 테이블, 인덱스, RLS, 시드(courses)
2. `migrations/20260320000001_admin.sql` — admin_users, is_admin(), 관리자 RLS

## 3. Auth 설정 (중요)

1. Supabase Dashboard → Authentication → Providers → Email 활성화
2. **공개 회원가입 비활성화** (Sign ups disabled / 또는 사이트에서 회원가입 UI를 제공하지 않음)
3. 관리자 계정은 아래 스크립트로만 생성

```bash
node scripts/create-admin.mjs admin@example.com 'strong-password'
```

## 4. 적용 방법 (SQL Editor)

1. Supabase Dashboard → SQL Editor
2. `20260320000000_init.sql` 실행
3. `20260320000001_admin.sql` 실행
4. Table Editor에서 테이블·정책 확인

## 5. 환경변수 (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=DOLBI <onboarding@resend.dev>
ADMIN_NOTIFICATION_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`는 서버 전용입니다.
- 관리자 페이지: `/admin/login`

## 6. RLS 검증 체크리스트

- [ ] anon으로 `inquiries` / `course_applications` SELECT 불가
- [ ] 일반 로그인 사용자(admin_users 미등록)로 `/admin` 접근 시 로그인으로 차단
- [ ] admin_users 등록 계정만 상담·신청·콘텐츠 조회/수정 가능
- [ ] 공개 사용자는 게시된 projects/insights와 활성 courses만 SELECT 가능

## 7. 롤백(개요)

테스트 DB에서는 프로젝트 재생성 또는 별도 승인된 drop 스크립트를 사용합니다.  
운영 롤백 SQL은 배포 승인 단계에서 작성합니다.
