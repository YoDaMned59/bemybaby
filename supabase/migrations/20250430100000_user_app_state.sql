-- BeMyBaby : une ligne par utilisateur (auth.uid), données applicatives dans `payload`.
-- À exécuter dans Supabase → SQL Editor (ou via CLI migrations).

create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users (id) on delete cascade not null,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists user_app_state_updated_at_idx
  on public.user_app_state (updated_at desc);

alter table public.user_app_state enable row level security;

create policy "user_app_state_select_own"
  on public.user_app_state for select
  using (auth.uid() = user_id);

create policy "user_app_state_insert_own"
  on public.user_app_state for insert
  with check (auth.uid() = user_id);

create policy "user_app_state_update_own"
  on public.user_app_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Met à jour `updated_at` à chaque modification.
create or replace function public.touch_user_app_state_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return NEW;
end;
$$;

drop trigger if exists tr_touch_user_app_state_updated_at on public.user_app_state;
create trigger tr_touch_user_app_state_updated_at
  before insert or update on public.user_app_state
  for each row
  execute function public.touch_user_app_state_updated_at();
