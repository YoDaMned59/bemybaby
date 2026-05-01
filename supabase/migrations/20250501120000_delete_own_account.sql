-- Permet à un utilisateur connecté de supprimer son compte auth (et les données liées).
-- `user_app_state` est supprimé en cascade (FK vers auth.users ON DELETE CASCADE).
-- À appliquer dans Supabase → SQL Editor si tu n’utilises pas `supabase db push`.

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid;
begin
  uid := auth.uid();
  if uid is null then
    raise exception 'Non authentifié'
      using errcode = '28000';
  end if;

  delete from auth.users where id = uid;
end;
$$;

comment on function public.delete_own_account() is
  'Suppression du compte appelant (auth.users). Appelable via supabase.rpc depuis le client authentifié.';

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;

-- Force PostgREST à recharger le cache des fonctions exposées (sinon erreur du type
-- « impossible de trouver … dans le cache de schéma » juste après le CREATE).
notify pgrst, 'reload schema';
