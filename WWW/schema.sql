-- Tip App Supabase schema
-- Run this file in the Supabase SQL Editor before using the WWW app.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text not null default '',
  role text not null check (role in ('manager', 'worker')),
  location_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workers (
  id uuid primary key default gen_random_uuid(),
  manager_id uuid not null references auth.users(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  role_title text not null default '',
  payment_handle text not null default '',
  payment_url text not null default '',
  photo_url text not null default '',
  claim_code text unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tips (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid not null references public.workers(id) on delete cascade,
  amount numeric(10, 2) not null check (amount > 0),
  customer_name text not null default '',
  customer_email text not null default '',
  message text not null default '',
  status text not null default 'recorded' check (status in ('recorded', 'paid', 'void')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_workers_updated_at on public.workers;
create trigger set_workers_updated_at
before update on public.workers
for each row execute function public.set_updated_at();

drop trigger if exists set_tips_updated_at on public.tips;
create trigger set_tips_updated_at
before update on public.tips
for each row execute function public.set_updated_at();

create or replace view public.public_workers as
select
  id,
  name,
  role_title,
  payment_handle,
  payment_url,
  photo_url,
  sort_order
from public.workers
where active = true;

create or replace function public.is_active_worker(worker uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workers
    where workers.id = worker
      and workers.active = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.workers enable row level security;
alter table public.tips enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "workers_select_manager" on public.workers;
create policy "workers_select_manager"
on public.workers for select
to authenticated
using (manager_id = auth.uid());

drop policy if exists "workers_select_claimed_worker" on public.workers;
create policy "workers_select_claimed_worker"
on public.workers for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "workers_insert_manager" on public.workers;
create policy "workers_insert_manager"
on public.workers for insert
to authenticated
with check (manager_id = auth.uid());

drop policy if exists "workers_update_manager" on public.workers;
create policy "workers_update_manager"
on public.workers for update
to authenticated
using (manager_id = auth.uid())
with check (manager_id = auth.uid());

drop policy if exists "workers_update_claimed_worker" on public.workers;

drop policy if exists "workers_delete_manager" on public.workers;
create policy "workers_delete_manager"
on public.workers for delete
to authenticated
using (manager_id = auth.uid());

drop policy if exists "tips_insert_public" on public.tips;
create policy "tips_insert_public"
on public.tips for insert
to anon, authenticated
with check (
  amount > 0
  and amount <= 10000
  and public.is_active_worker(worker_id)
);

drop policy if exists "tips_select_manager" on public.tips;
create policy "tips_select_manager"
on public.tips for select
to authenticated
using (
  exists (
    select 1
    from public.workers
    where workers.id = tips.worker_id
      and workers.manager_id = auth.uid()
  )
);

drop policy if exists "tips_select_worker" on public.tips;
create policy "tips_select_worker"
on public.tips for select
to authenticated
using (
  exists (
    select 1
    from public.workers
    where workers.id = tips.worker_id
      and workers.user_id = auth.uid()
  )
);

drop policy if exists "tips_update_manager" on public.tips;
create policy "tips_update_manager"
on public.tips for update
to authenticated
using (
  exists (
    select 1
    from public.workers
    where workers.id = tips.worker_id
      and workers.manager_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.workers
    where workers.id = tips.worker_id
      and workers.manager_id = auth.uid()
  )
);

create or replace function public.claim_worker_profile(worker_claim_code text)
returns public.workers
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed_worker public.workers;
begin
  update public.workers
  set
    user_id = auth.uid(),
    claim_code = null,
    updated_at = now()
  where claim_code = upper(trim(worker_claim_code))
    and user_id is null
  returning * into claimed_worker;

  if claimed_worker.id is null then
    raise exception 'Invalid or already used claim code.';
  end if;

  return claimed_worker;
end;
$$;

create or replace function public.update_claimed_worker_profile(
  worker_profile_id uuid,
  display_name text,
  worker_role_title text,
  worker_payment_handle text,
  worker_payment_url text,
  worker_photo_url text
)
returns public.workers
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_worker public.workers;
begin
  if nullif(trim(display_name), '') is null then
    raise exception 'Display name is required.';
  end if;

  update public.workers
  set
    name = trim(display_name),
    role_title = coalesce(trim(worker_role_title), ''),
    payment_handle = coalesce(trim(worker_payment_handle), ''),
    payment_url = coalesce(trim(worker_payment_url), ''),
    photo_url = coalesce(trim(worker_photo_url), ''),
    updated_at = now()
  where id = worker_profile_id
    and user_id = auth.uid()
  returning * into updated_worker;

  if updated_worker.id is null then
    raise exception 'Worker profile was not found for this account.';
  end if;

  return updated_worker;
end;
$$;

grant usage on schema public to anon, authenticated;
revoke all on public.profiles from anon;
revoke all on public.workers from anon;
revoke all on public.tips from anon;
grant select on public.public_workers to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.workers to authenticated;
grant select, insert, update on public.tips to authenticated;
grant insert on public.tips to anon;
grant execute on function public.is_active_worker(uuid) to anon, authenticated;
grant execute on function public.claim_worker_profile(text) to authenticated;
grant execute on function public.update_claimed_worker_profile(uuid, text, text, text, text, text) to authenticated;
