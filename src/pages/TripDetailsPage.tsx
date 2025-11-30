import { ArrowLeft, Calendar, MapPin, Receipt, Tag, Wallet } from 'lucide-react';
import React from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import type { Trip } from '../types/auth';
import { supabase } from '../utils/supabase';

interface TripDetailsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function TripDetailsPage({ onNavigate }: TripDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [trip, setTrip] = React.useState<Trip | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    const loadTrip = async () => {
      if (!id || !user) {
        setLoading(false);
        return;
      }
      const { data, error: fetchError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      if (cancelled) return;
      if (fetchError) {
        setError(fetchError.message || 'Could not load trip.');
      } else {
        setTrip(data as Trip);
      }
      setLoading(false);
    };
    loadTrip();
    return () => {
      cancelled = true;
    };
  }, [id, user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm text-gray-500">{t.tripDetails?.loading || 'Loading trip...'}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm text-gray-500">
            {t.tripDetails?.authRequired || 'Please sign in to view this trip.'}
          </p>
          <button
            onClick={() => onNavigate('auth')}
            className="mt-3 rounded-lg border border-teal-200 px-3 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            {t.tripDetails?.goToLogin || 'Go to login'}
          </button>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm text-red-600">
            {error || t.tripDetails?.notFound || 'Trip not found.'}
          </p>
          <button
            onClick={() => onNavigate('profile')}
            className="mt-3 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            {t.tripDetails?.back || 'Back to profile'}
          </button>
        </div>
      </div>
    );
  }

  const addons = (trip.addons as any[]) || [];
  const qrValue = `${window.location.origin}/trips/${trip.id}`;
  const mapQuery = encodeURIComponent(trip.mountain || trip.title || 'Azerbaijan mountains');
  const mapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-4xl px-4 space-y-6">
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.tripDetails?.back || 'Back to profile'}
        </button>

        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
          <Receipt className="h-4 w-4" />
          {t.tripDetails?.receipt || 'Trip Receipt'}
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="from-teal-primary to-blue-primary border-b border-gray-100 bg-linear-to-r px-6 py-8 text-white">
            <p className="text-sm opacity-80">
              {trip.activity_type || t.profilePage?.activityFallback || 'Adventure'}
            </p>
            <h1 className="text-3xl font-bold">{trip.title}</h1>
            <p className="mt-1 text-sm opacity-90">
              {trip.status || t.profilePage?.statusPlanned || 'Planned'}
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">
                <MapPin className="h-5 w-5 text-teal-700" />
                <div>
                  <p className="text-sm text-gray-500">{t.tripDetails?.mountain || 'Mountain'}</p>
                  <p className="text-gray-900 font-semibold">
                    {trip.mountain || t.profilePage?.customLocation || 'Custom location'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">
                <Calendar className="h-5 w-5 text-teal-700" />
                <div>
                  <p className="text-sm text-gray-500">{t.tripDetails?.dates || 'Dates'}</p>
                  <p className="text-gray-900 font-semibold">
                    {trip.start_date || t.profilePage?.startNA || 'N/A'} →{' '}
                    {trip.end_date || t.profilePage?.endNA || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 h-full rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-teal-700" />
                  <p className="text-gray-900 font-semibold">
                    {t.tripDetails?.costSummary || 'Cost summary'}
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {trip.total_cost !== null && trip.total_cost !== undefined
                    ? `$${trip.total_cost}`
                    : 'N/A'}
                </p>
              </div>
              {addons.length > 0 ? (
                <div className="space-y-2">
                  {addons.map(addon => (
                    <div key={addon.id} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-700">
                        <Tag className="h-4 w-4 text-gray-400" />
                        {addon.name}
                      </span>
                      <span className="font-semibold text-gray-900">${addon.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  {t.tripDetails?.noAddons || 'No add-ons selected.'}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900">
                {t.tripDetails?.scan || 'Scan this receipt'}
              </p>
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <QRCode value={qrValue} size={120} />
              </div>
              <p className="break-all text-xs text-gray-500 text-center">{qrValue}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <p className="text-sm font-semibold text-gray-900">{t.tripDetails?.map || 'Map'}</p>
            <p className="text-xs text-gray-500">
              {trip.mountain || t.profilePage?.customLocation || 'Custom location'}
            </p>
          </div>
          <div className="h-72 w-full">
            <iframe
              title="Trip location map"
              src={mapUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
