import type { Session, User } from '@supabase/supabase-js';
import React from 'react';
import { supabase } from '../utils/supabase';

type Profile = {
  id: string;
  email?: string;
  full_name?: string;
  birthday?: string | null;
  avatar_url?: string | null;
  preferences?: Record<string, unknown> | null;
};

type AuthContextValue = {
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

const STORAGE_KEY = 'trailaz-auth';

export const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

function storeAuth(session: Session | null, profile: Profile | null) {
  try {
    const payload = JSON.stringify({ session, profile });
    localStorage.setItem(STORAGE_KEY, payload);
  } catch (err) {
    console.warn('Failed to persist auth state', err);
  }
}

function loadStoredAuth(): { session: Session | null; profile: Profile | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { session: null, profile: null };
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read auth state', err);
    return { session: null, profile: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const cached = React.useMemo(() => loadStoredAuth(), []);
  const [session, setSession] = React.useState<Session | null>(cached.session);
  const [user, setUser] = React.useState<User | null>(cached.session?.user ?? null);
  const [profile, setProfile] = React.useState<Profile | null>(cached.profile);
  const [loading, setLoading] = React.useState(true);

  const sessionRef = React.useRef<Session | null>(cached.session);
  const profileRef = React.useRef<Profile | null>(cached.profile);

  React.useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  React.useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  React.useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;
      if (error) console.warn('Session fetch error', error);
      const nextSession = data.session ?? null;
      sessionRef.current = nextSession;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (!nextSession?.user) {
        setProfile(null);
        profileRef.current = null;
        storeAuth(nextSession, null);
        setLoading(false);
      }
    };

    bootstrap();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      sessionRef.current = newSession;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (!newSession?.user) {
        setProfile(null);
        profileRef.current = null;
        storeAuth(newSession, null);
        setLoading(false);
      } else {
        setLoading(true);
      }
    });

    return () => {
      mounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        console.warn('Profile fetch error', error);
        setProfile(null);
        profileRef.current = null;
        storeAuth(sessionRef.current, null);
        setLoading(false);
        return;
      }
      const nextProfile = data ? { ...data } : null;
      setProfile(nextProfile);
      profileRef.current = nextProfile;
      storeAuth(sessionRef.current, nextProfile);
      setLoading(false);
    };
    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const signIn = React.useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    sessionRef.current = data.session;
    setSession(data.session);
    setUser(data.user ?? null);
    setLoading(true);
  }, []);

  const signUp = React.useCallback(
    async ({
      email,
      password,
      fullName,
      birthday,
    }: {
      email: string;
      password: string;
      fullName?: string;
      birthday?: string;
    }) => {
      const redirectTo = `${window.location.origin}/auth`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, birthday }, emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      const newUser = data.user ?? null;
      const nextSession = data.session ?? null;
      sessionRef.current = nextSession;
      setSession(nextSession);
      setUser(newUser);

      let nextProfile: Profile | null = null;
      if (newUser) {
        nextProfile = {
          id: newUser.id,
          email,
          full_name: fullName,
          birthday: birthday ?? null,
        };
        const { error: profileError } = await supabase.from('profiles').upsert(nextProfile);
        if (profileError) console.warn('Profile upsert error', profileError);
        setProfile(nextProfile);
        profileRef.current = nextProfile;
        storeAuth(nextSession, nextProfile);
      } else {
        storeAuth(nextSession, null);
      }
      setLoading(false);
    },
    []
  );

  const signOut = React.useCallback(async () => {
    await supabase.auth.signOut();
    sessionRef.current = null;
    setSession(null);
    setUser(null);
    setProfile(null);
    profileRef.current = null;
    storeAuth(null, null);
    setLoading(false);
  }, []);

  const refreshProfile = React.useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    if (error) {
      console.warn('Profile fetch error', error);
      return;
    }
    const nextProfile = data ? { ...data } : null;
    setProfile(nextProfile);
    profileRef.current = nextProfile;
    storeAuth(sessionRef.current, nextProfile);
  }, [user]);

  const value: AuthContextValue = React.useMemo(
    () => ({
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [user, session, profile, loading, signIn, signUp, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
