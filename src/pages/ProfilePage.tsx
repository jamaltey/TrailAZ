import { Calendar, LogOut, Mail, Mountain, UserRound } from 'lucide-react';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, profile, loading, signOut } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      onNavigate('auth');
    }
  }, [loading, user, onNavigate]);

  const trips = [
    {
      id: 't1',
      title: 'Shahdag Summit Trail',
      date: '2025-02-12',
      status: 'Completed',
    },
    {
      id: 't2',
      title: 'Tufandag Winter Route',
      date: '2025-03-04',
      status: 'Planned',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm font-semibold text-teal-700">
          <UserRound className="h-5 w-5" />
          <span>Profile</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
                <UserRound className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Signed in</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile?.full_name || profile?.email || 'Traveler'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">
                <Mail className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-semibold">{profile?.email || user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">
                <Calendar className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Birthday</p>
                  <p className="text-gray-900 font-semibold">{profile?.birthday || 'Not set'}</p>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <LogOut className="h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mountain className="h-5 w-5 text-teal-700" />
                <p className="text-lg font-semibold text-gray-900">Trips</p>
              </div>
              <button
                onClick={() => onNavigate('planner')}
                className="rounded-lg border border-teal-200 px-3 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
              >
                Plan new trip
              </button>
            </div>

            <div className="space-y-3">
              {trips.map(trip => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{trip.title}</p>
                    <p className="text-sm text-gray-500">{trip.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      trip.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {trip.status}
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
