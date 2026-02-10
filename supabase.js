import { createClient } from "@supabase/supabase-js";

// Prefer standard env var names, then react-app style, then fall back to the project's existing values.
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.REACT_APP_SUPABASE_URL ||
  "https://eecxsxlkbdaaawbhfnxh.supabase.co";

const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  "sb_publishable_B0SICeYzqU81Q-frlkKG2w_A3QH7-z6";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);