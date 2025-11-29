import { CheckCircle2, Compass, Mountain, Shield, Sparkles } from 'lucide-react';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../utils/supabase';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

type AuthMode = 'login' | 'signup';

export function AuthPage({ onNavigate }: AuthPageProps) {
  const { t } = useLanguage();
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = React.useState<AuthMode>('login');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [formLoading, setFormLoading] = React.useState(false);

  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [signupName, setSignupName] = React.useState('');
  const [signupEmail, setSignupEmail] = React.useState('');
  const [signupPassword, setSignupPassword] = React.useState('');
  const [signupBirthday, setSignupBirthday] = React.useState('');

  const processPendingTrip = React.useCallback(async () => {
    const pending = localStorage.getItem('pending-trip');
    if (!pending) return false;
    const payload = JSON.parse(pending);
    const { data: sessionData } = await supabase.auth.getSession();
    const currentUser = sessionData.session?.user;
    if (!currentUser) return false;
    const { data, error } = await supabase
      .from('trips')
      .insert({ ...payload, user_id: currentUser.id })
      .select('id')
      .single();
    localStorage.removeItem('pending-trip');
    if (error) {
      setError(error.message || 'Could not finalize trip.');
      return false;
    }
    if (data?.id) {
      window.location.href = `/trips/${data.id}`;
      return true;
    }
    window.location.href = '/profile';
    return true;
  }, []);

  React.useEffect(() => {
    setMessage('');
    setError('');
  }, [activeTab]);

  React.useEffect(() => {
    if (user && !authLoading) {
      processPendingTrip().then(handled => {
        if (!handled) onNavigate('home');
      });
    }
  }, [user, authLoading, onNavigate, processPendingTrip]);

  const perks = [
    t.auth?.perks?.safety || 'Safety alerts on the routes you follow',
    t.auth?.perks?.offline || 'Saved itineraries and offline-ready notes',
    t.auth?.perks?.guides || 'Local guides and language support tailored to you',
  ];

  const renderCredentialFields = (
    email: string,
    setEmail: (v: string) => void,
    password: string,
    setPassword: (v: string) => void
  ) => (
    <>
      <label className="space-y-2 text-sm font-semibold text-slate-800">
        <p>{t.auth?.emailLabel || 'Email address'}</p>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="focus-visible:ring-ring ring-offset-background w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <label className="space-y-2 text-sm font-semibold text-slate-800">
        <p>{t.auth?.passwordLabel || 'Password'}</p>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          className="focus-visible:ring-ring ring-offset-background w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>
    </>
  );

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setFormLoading(true);
    try {
      await signIn(loginEmail, loginPassword);
      setMessage(t.auth?.loginSuccess || 'Logged in!');
      const handled = await processPendingTrip();
      if (!handled) {
        onNavigate('home');
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to log in. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setFormLoading(true);
    try {
      await signUp({
        email: signupEmail,
        password: signupPassword,
        fullName: signupName,
        birthday: signupBirthday,
      });
      const handled = await processPendingTrip();
      if (!handled) {
        setMessage(
          t.auth?.signupSuccess ||
            'Account created. Check your email for confirmation before signing in.'
        );
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to sign up. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-900 via-slate-950 to-emerald-950 text-white">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-slate-900/90 via-slate-950/85 to-emerald-900/70" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
          <Shield className="h-4 w-4" />
          <span>{t.auth?.badge || 'Member Access'}</span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                className="text-4xl leading-tight sm:text-5xl"
                style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                {t.auth?.title || 'Log in or create your TrailAZ account'}
              </h1>
              <p className="max-w-2xl text-lg text-slate-100/85 sm:text-xl">
                {t.auth?.subtitle ||
                  'Save itineraries, sync accessibility settings, and pick up planning on any device.'}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-sm text-emerald-100">
                  <Sparkles className="h-4 w-4" />
                  <span>{t.activities?.title || 'Activities'}</span>
                </div>
                <p className="text-2xl font-semibold text-white">1,200+</p>
                <p className="text-sm text-slate-200">
                  {t.activities?.popularAcross || 'Curated adventures'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-sm text-emerald-100">
                  <Compass className="h-4 w-4" />
                  <span>{t.hero?.trails || 'Trails'}</span>
                </div>
                <p className="text-2xl font-semibold text-white">40+</p>
                <p className="text-sm text-slate-200">
                  {t.features?.expertTrails?.title || 'Expert trail mapping'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-sm text-emerald-100">
                  <Mountain className="h-4 w-4" />
                  <span>{t.hero?.peaks || 'Peaks'}</span>
                </div>
                <p className="text-2xl font-semibold text-white">24/7</p>
                <p className="text-sm text-slate-200">
                  {t.auth?.support || 'Safety desk monitoring weather and routes'}
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.15em] text-emerald-100">
                {t.auth?.perksTitle || 'Your account unlocks:'}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {perks.map((perk, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                    <p className="text-sm text-slate-50">{perk}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/30 bg-white/95 text-slate-900 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-5 sm:px-8">
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  {t.auth?.cardBadge || 'Account center'}
                </p>
                <p className="text-base text-slate-600">
                  {t.auth?.cardSubtitle || 'Pick the fastest way to join TrailAZ.'}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                <Mountain className="h-6 w-6 text-emerald-700" />
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <Tabs
                value={activeTab}
                onValueChange={value => setActiveTab(value as AuthMode)}
                className="space-y-6"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="login">{t.auth?.loginTab || 'Log in'}</TabsTrigger>
                  <TabsTrigger value="signup">{t.auth?.signupTab || 'Sign up'}</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
                  <form className="space-y-4" onSubmit={handleLogin}>
                    {renderCredentialFields(
                      loginEmail,
                      setLoginEmail,
                      loginPassword,
                      setLoginPassword
                    )}

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{t.auth?.rememberMe || 'Remember me on this device'}</span>
                      </label>
                      <button
                        type="button"
                        className="text-emerald-700 transition hover:text-emerald-800"
                        onClick={() =>
                          setMessage(t.auth?.forgotPassword || 'Password reset coming soon.')
                        }
                      >
                        {t.auth?.forgotPassword || 'Forgot password?'}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="hover:bg-emerald-700 focus-visible:ring-ring flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white transition focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70"
                      style={{ fontWeight: 600 }}
                    >
                      {formLoading
                        ? t.common?.loading || 'Loading...'
                        : t.auth?.loginCta || 'Continue'}
                    </button>
                  </form>

                  <p className="text-sm text-slate-600">
                    {t.auth?.switchToSignup ||
                      'New to TrailAZ? Create an account to save your plans.'}
                  </p>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  <form className="space-y-4" onSubmit={handleSignup}>
                    <label className="space-y-2 text-sm font-semibold text-slate-800">
                      <span>{t.auth?.nameLabel || 'Full name'}</span>
                      <input
                        type="text"
                        required
                        value={signupName}
                        onChange={e => setSignupName(e.target.value)}
                        placeholder="Alex Mountain"
                        className="focus-visible:ring-ring ring-offset-background w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </label>

                    <label className="space-y-2 text-sm font-semibold text-slate-800">
                      <span>{t.auth?.birthdayLabel || 'Birthday'}</span>
                      <input
                        type="date"
                        required
                        value={signupBirthday}
                        onChange={e => setSignupBirthday(e.target.value)}
                        className="focus-visible:ring-ring ring-offset-background w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </label>

                    {renderCredentialFields(
                      signupEmail,
                      setSignupEmail,
                      signupPassword,
                      setSignupPassword
                    )}

                    <label className="flex items-start gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>
                        {t.auth?.updatesOptIn ||
                          'Email me seasonal route updates and safety briefings'}
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="hover:bg-emerald-700 focus-visible:ring-ring flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white transition focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70"
                      style={{ fontWeight: 600 }}
                    >
                      {formLoading
                        ? t.common?.loading || 'Loading...'
                        : t.auth?.signupCta || 'Create account'}
                    </button>

                    <p className="text-sm text-slate-600">
                      {t.auth?.switchToLogin || 'Already have an account? Log in to continue.'}
                    </p>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <p className="font-semibold">{t.auth?.highlightTitle || 'Plan with confidence.'}</p>
                <p>
                  {t.auth?.highlightSubtitle ||
                    'Keep your checklists, preferences, and routes in one place for every climb.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('mountains')}
                className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
              >
                {t.hero?.exploreMountains || 'Explore Mountains'}
              </button>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              {message && (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
