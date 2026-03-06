import { createClient } from '@supabase/supabase-js';

// Vercel environment variables are accessed via import.meta.env in Vite
// The fallbacks ensure the app works even if env vars aren't set in the dashboard yet
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uygaflxjbrdqpjxepzkd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TuL1gM-FLhxDRziG9KcQcA_r-4GX6wm';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel project settings.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
