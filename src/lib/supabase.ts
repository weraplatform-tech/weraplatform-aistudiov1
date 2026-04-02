import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Render.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'worker' | 'client' | 'admin';
  skills: string[];
  bio: string | null;
  phone: string | null;
  location: string | null;
  is_ai_certified: boolean;
  created_at: string;
};

export type Job = {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  location: string | null;
  requires_ai_certification: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  job_id: string;
  worker_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'paid';
  created_at: string;
};
