-- VoteReederXP — Supabase migration (RUN MANUALLY in the Supabase SQL Editor)
-- Dashboard: https://supabase.com/dashboard/project/ljxvkdslqxmmedfhrwgu/sql
-- Date: 2026-06-21
--
-- NOTE: This cannot be applied from the app (the anon REST API cannot run DDL).
-- Paste the whole file into the SQL Editor and Run.
--
-- IMPORTANT FIX: PostgreSQL has NO `CREATE POLICY IF NOT EXISTS` syntax (it errors).
-- The original request used that; below uses `DROP POLICY IF EXISTS ... ; CREATE POLICY`
-- which is idempotent and safe to re-run.

-- ── TASK 1: missing profile columns ─────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS badges jsonb DEFAULT '[]';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city  text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS state text;

-- ── TASK 2: RLS policies ────────────────────────────────────────
-- Ensure RLS is enabled (no-op if already enabled). Without this, policies do nothing.
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tasks    ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- profiles: public read, owner write
DROP POLICY IF EXISTS "Public can read profiles" ON profiles;
CREATE POLICY "Public can read profiles" ON profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- user_tasks: owner read and write
DROP POLICY IF EXISTS "Users can read own tasks" ON user_tasks;
CREATE POLICY "Users can read own tasks" ON user_tasks
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own tasks" ON user_tasks;
CREATE POLICY "Users can insert own tasks" ON user_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own tasks" ON user_tasks;
CREATE POLICY "Users can update own tasks" ON user_tasks
  FOR UPDATE USING (auth.uid() = user_id);

-- chat_messages: authenticated read, owner insert
-- ⚠️ CAVEAT: game.html initChat() loads chat history via the ANON key (sbFetch),
-- whose role is 'anon', so this SELECT policy will BLOCK that initial load.
-- Fix: switch the chat-history read in game.html to window.sb (carries the user JWT),
-- OR loosen this policy to `USING (true)` if chat should be publicly readable.
DROP POLICY IF EXISTS "Authenticated can read chat" ON chat_messages;
CREATE POLICY "Authenticated can read chat" ON chat_messages
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert own messages" ON chat_messages;
CREATE POLICY "Users can insert own messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);
