import type { Session, User } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  email?: string;
  full_name?: string;
  birthday?: string | null;
  avatar_url?: string | null;
  preferences?: Record<string, unknown> | null;
};

export type Trip = {
  id: string;
  title: string;
  mountain?: string | null;
  activity_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  addons?: Array<{ id: string; name: string; price: number }>;
  total_cost?: number | null;
  status?: string | null;
  created_at?: string;
};

export type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: {
    email: string;
    password: string;
    fullName?: string;
    birthday?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};
