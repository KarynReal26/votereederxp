-- VoteReederXP — public home-page stats RPC
-- RUN THIS IN THE SUPABASE SQL EDITOR:
--   https://supabase.com/dashboard/project/ljxvkdslqxmmedfhrwgu/sql
--
-- WHY: user_tasks has owner-only RLS (auth.uid() = user_id), so an anonymous
-- homepage visitor cannot COUNT completed missions directly — the count comes
-- back 0. This SECURITY DEFINER function runs with the definer's rights and
-- returns ONLY aggregate numbers (no individual rows are exposed), which is
-- safe to call from the public homepage.
--
-- After running this, index.html's "Missions Completed" stat will show the real
-- global number via window.sb.rpc('home_stats').

create or replace function public.home_stats()
returns json
language sql
security definer
set search_path = public
stable
as $$
  select json_build_object(
    'volunteers',          (select count(*) from public.profiles),
    'xp',                  (select coalesce(sum(xp_score), 0) from public.profiles),
    'missions_completed',  (select count(*) from public.user_tasks where status = 'complete')
  );
$$;

-- Allow both anonymous (public homepage) and logged-in users to call it.
grant execute on function public.home_stats() to anon, authenticated;

-- Quick test (optional): should return a JSON object with the three counts.
-- select public.home_stats();
