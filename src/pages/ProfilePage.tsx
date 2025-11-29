import { Calendar, LogOut, Mail, Mountain, UserRound } from 'lucide-react';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import type { Trip } from '../types/auth';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const { t } = useLanguage();
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const [tripsLoading, setTripsLoading] = React.useState(false);
  const [tripsError, setTripsError] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      onNavigate('auth');
    }
  }, [loading, user, onNavigate]);

  React.useEffect(() => {
    if (user && !profile) {
      refreshProfile();
    }
  }, [user, profile, refreshProfile]);

  const displayName =
    profile?.full_name ||
    (user?.user_metadata as any)?.full_name ||
    profile?.email ||
    user?.email ||
    'Traveler';
  const displayEmail = profile?.email || user?.email || 'Not set';
  const displayBirthday = profile?.birthday || (user?.user_metadata as any)?.birthday || 'Not set';

  React.useEffect(() => {
    let cancelled = false;
    const loadTrips = async () => {
      if (!user) {
        setTrips([]);
        return;
      }
      setTripsLoading(true);
      setTripsError('');
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (error) {
        setTripsError(error.message || 'Could not load trips.');
        setTrips([]);
      } else {
        setTrips(data as Trip[]);
      }
      setTripsLoading(false);
    };
    loadTrips();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm font-semibold text-teal-700">
          <UserRound className="h-5 w-5" />
          <span>{t.profilePage?.title || 'Profile'}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
                  <UserRound className="h-6 w-6 text-teal-700" />
                </div>
                <div>
                <p className="text-sm text-gray-500">{t.profilePage?.signedIn || 'Signed in'}</p>
                  <p className="text-lg font-semibold text-gray-900">{displayName}</p>
                </div>
              </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">
                <Mail className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">{t.profilePage?.email || 'Email'}</p>
                  <p className="text-gray-900 font-semibold">{displayEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">
                <Calendar className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">{t.profilePage?.birthday || 'Birthday'}</p>
                  <p className="text-gray-900 font-semibold">{displayBirthday}</p>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <LogOut className="h-5 w-5" />
                {t.profilePage?.signOut || 'Sign out'}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mountain className="h-5 w-5 text-teal-700" />
                <p className="text-lg font-semibold text-gray-900">
                  {t.profilePage?.trips || 'Trips'}
                </p>
              </div>
              <button
                onClick={() => onNavigate('planner')}
                className="rounded-lg border border-teal-200 px-3 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
              >
                {t.profilePage?.planNewTrip || 'Plan new trip'}
              </button>
            </div>

            {tripsLoading && (
              <p className="text-sm text-gray-500">{t.profilePage?.loadingTrips || 'Loading trips...'}</p>
            )}
            {tripsError && (
              <p className="text-sm text-red-600">
                {t.profilePage?.tripsError || 'Could not load trips.'}: {tripsError}
              </p>
            )}

            {!tripsLoading && trips.length === 0 && !tripsError && (
              <p className="text-sm text-gray-500">
                {t.profilePage?.noTrips || 'No trips yet. Plan your first adventure.'}
              </p>
            )}

            <div className="space-y-3">
              {trips.map(trip => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 transition hover:border-teal-200"
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') navigate(`/trips/${trip.id}`);
                  }}
                >
                  <div>
                    <p className="font-semibold text-gray-900">{trip.title}</p>
                    <p className="text-sm text-gray-500">
                      {trip.mountain || t.profilePage?.customLocation || 'Custom location'} •{' '}
                      {trip.activity_type || t.profilePage?.activityFallback || 'Activity'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {trip.start_date || t.profilePage?.startNA || 'Start N/A'} →{' '}
                      {trip.end_date || t.profilePage?.endNA || 'End N/A'}
                    </p>
                    {trip.total_cost !== undefined && trip.total_cost !== null && (
                      <p className="text-xs text-gray-500">
                        {t.profilePage?.total || 'Total'}: ${trip.total_cost}
                      </p>
                    )}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      trip.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : trip.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {trip.status ||
                      t.profilePage?.statusPlanned ||
                      'Planned'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
