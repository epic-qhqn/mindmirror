-- =========================================================================
-- SOULMATE JOURNAL - SUPABASE SQL SCHEMA FOR E2EE CLOUD SYNC
-- Copy and paste this script directly into your Supabase SQL Editor to initialize.
-- =========================================================================

-- 1. Create Journals table
CREATE TABLE IF NOT EXISTS public.journals (
    id text NOT NULL,
    user_id text NOT NULL,
    encrypted_data text NOT NULL,
    ts bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT journals_pkey PRIMARY KEY (id)
);

-- Enable RLS (Row Level Security) for journals
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous/authenticated access only if matching X-User-Id header
CREATE POLICY "Allow select for owner" ON public.journals FOR SELECT 
  USING (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''));

CREATE POLICY "Allow all for owner" ON public.journals FOR ALL 
  USING (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''))
  WITH CHECK (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''));


-- 2. Create AI History table
CREATE TABLE IF NOT EXISTS public.ai_history (
    id text NOT NULL,
    user_id text NOT NULL,
    encrypted_data text NOT NULL,
    ts bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT ai_history_pkey PRIMARY KEY (id)
);

ALTER TABLE public.ai_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for owner on ai_history" ON public.ai_history FOR ALL 
  USING (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''))
  WITH CHECK (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''));


-- 3. Create Letters table
CREATE TABLE IF NOT EXISTS public.letters (
    id text NOT NULL,
    user_id text NOT NULL,
    encrypted_data text NOT NULL,
    ts bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT letters_pkey PRIMARY KEY (id)
);

ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for owner on letters" ON public.letters FOR ALL 
  USING (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''))
  WITH CHECK (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''));


-- 4. Create CBT Records table
CREATE TABLE IF NOT EXISTS public.cbt_records (
    id text NOT NULL,
    user_id text NOT NULL,
    encrypted_data text NOT NULL,
    ts bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT cbt_records_pkey PRIMARY KEY (id)
);

ALTER TABLE public.cbt_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for owner on cbt_records" ON public.cbt_records FOR ALL 
  USING (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''))
  WITH CHECK (user_id = nullif(current_setting('request.headers', true)::json->>'x-user-id', ''));
