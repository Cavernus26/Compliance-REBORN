import { createClient } from "@supabase/supabase-js";
import { TestCase } from "./types";

// Primary URL & Anon Key from Vite environment, falling back to user's provided project details.
const SUPABASE_URL =
  (import.meta as any).env.VITE_SUPABASE_URL || "https://vaqorxcunfakewanjyos.supabase.co";

const SUPABASE_ANON_KEY =
  (import.meta as any).env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcW9yeGN1bmZha2V3YW5qeW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2OTExMjksImV4cCI6MjA5NzI2NzEyOX0.1K9noPw7Theexp-HB64iewT7no1jy2nMDrjrqySRscs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SyncedCuration {
  customTcs: TestCase[];
  editedTcs: Record<string, TestCase>;
  deletedTcs: string[];
}

export const SQL_SETUP_SCRIPT = `-- SUPABASE SQL INITIALIZATION SCRIPT FOR COMPLIANCE DISPATCH HUB
-- Copy and run this script in your Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- 1. Create the master curation storage table
create table if not exists compliance_curator (
  id text primary key,
  custom_tcs jsonb default '[]'::jsonb NOT NULL,
  edited_tcs jsonb default '{}'::jsonb NOT NULL,
  deleted_tcs jsonb default '[]'::jsonb NOT NULL,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table compliance_curator enable row level security;

-- 3. Create permissive access policies for client-side syncing
create policy "Allow public selective read"
  on compliance_curator for select
  using (true);

create policy "Allow public selective mutate"
  on compliance_curator for all
  using (true)
  with check (true);

-- 4. Seed the initial configuration record
insert into compliance_curator (id, custom_tcs, edited_tcs, deleted_tcs)
values ('master_curator', '[]'::jsonb, '{}'::jsonb, '[]'::jsonb)
on conflict (id) do nothing;`;

/**
 * Fetches the curated guidelines configuration from Supabase.
 * Gracefully falls back to null if the table doesn't exist yet or other error occurs.
 */
export async function fetchSyncedCuration(): Promise<SyncedCuration | null> {
  try {
    const { data, error } = await supabase
      .from("compliance_curator")
      .select("custom_tcs, edited_tcs, deleted_tcs")
      .eq("id", "master_curator")
      .maybeSingle();

    if (error) {
      console.warn("Error fetching Supabase curation, table may not be seeded yet:", error.message);
      return null;
    }

    if (data) {
      return {
        customTcs: Array.isArray(data.custom_tcs) ? data.custom_tcs : [],
        editedTcs: typeof data.edited_tcs === "object" && data.edited_tcs ? data.edited_tcs : {},
        deletedTcs: Array.isArray(data.deleted_tcs) ? data.deleted_tcs : [],
      };
    }
    return null;
  } catch (err) {
    console.error("Critical failure during Supabase fetch:", err);
    return null;
  }
}

/**
 * Saves and publishes the curated guidelines to the database.
 */
export async function saveSyncedCuration(curation: SyncedCuration): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      id: "master_curator",
      custom_tcs: curation.customTcs || [],
      edited_tcs: curation.editedTcs || {},
      deleted_tcs: curation.deletedTcs || [],
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("compliance_curator")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}
