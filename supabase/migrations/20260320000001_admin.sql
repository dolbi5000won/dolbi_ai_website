-- DOLBI admin auth & RLS (Phase 5)
-- Apply after 20260320000000_init.sql. See supabase/APPLY.md.

-- ---------------------------------------------------------------------------
-- admin_users (no public signup — populate via scripts/create-admin.mjs)
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Admins can read own admin row" on public.admin_users;
create policy "Admins can read own admin row"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- is_admin()
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- Admin access to operational tables
-- ---------------------------------------------------------------------------
grant select, update on public.inquiries to authenticated;
grant select, update on public.course_applications to authenticated;
grant select, insert, update, delete on public.courses to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.insights to authenticated;

drop policy if exists "Admins manage inquiries" on public.inquiries;
create policy "Admins manage inquiries"
on public.inquiries
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins manage course_applications" on public.course_applications;
create policy "Admins manage course_applications"
on public.course_applications
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins manage courses" on public.courses;
create policy "Admins manage courses"
on public.courses
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
on public.projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins manage insights" on public.insights;
create policy "Admins manage insights"
on public.insights
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Keep existing public read policies for courses/projects/insights.
-- inquiries / course_applications remain closed to anon.
