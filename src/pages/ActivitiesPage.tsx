import { ArrowRight, Camera, Compass, Mountain, Snowflake, Tent } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MountainData } from '../components/MountainCard';
import { fetchMountains } from '../utils/mountains';

interface ActivitiesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function ActivitiesPage({ onNavigate }: ActivitiesPageProps) {
  const { t } = useTranslation();
  const [mountains, setMountains] = useState<MountainData[]>([]);
  const [loading, setLoading] = useState(true);

  const activities = [
    {
      id: 'hiking',
      icon: Compass,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      key: 'hiking' as const,
    },
    {
      id: 'climbing',
      icon: Mountain,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      key: 'climbing' as const,
    },
    {
      id: 'skiing',
      icon: Snowflake,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      key: 'skiing' as const,
    },
    {
      id: 'camping',
      icon: Tent,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      key: 'camping' as const,
    },
    {
      id: 'photography',
      icon: Camera,
      color: 'from-pink-500 to-red-600',
      bgColor: 'bg-pink-50',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      key: 'photography' as const,
    },
  ];

  const getActivityCount = (activity: string) =>
    mountains.filter(m => m.activity?.toLowerCase() === activity.toLowerCase()).length;

  const handleExploreActivity = (activityId: string) => {
    onNavigate('mountains', { filterActivity: activityId });
  };

  useEffect(() => {
    let cancelled = false;
    fetchMountains()
      .then(data => {
        if (!cancelled) setMountains(data);
      })
      .catch(() => {
        if (!cancelled) setMountains([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1
            className="animate-fade-in-up mb-4 text-4xl text-gray-900 md:text-5xl"
            style={{ fontWeight: 700 }}
          >
            {t('activities.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">{t('activities.subtitle')}</p>
        </div>

        {/* Activity Cards Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const count = getActivityCount(activity.id);
            const activityData = t(`activities.${activity.key}`, { returnObjects: true }) as any;

            return (
              <div
                key={activity.id}
                className="group animate-fade-in-up overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Header */}
                <div
                  className={`h-32 bg-linear-to-br ${activity.color} relative flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
                  </div>
                  <div
                    className={`h-20 w-20 ${activity.iconBg} relative z-10 flex items-center justify-center rounded-full transition-transform group-hover:scale-110`}
                  >
                    <Icon className={`h-10 w-10 ${activity.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-3 text-gray-900">{activityData.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {activityData.description}
                  </p>

                  {/* Stats */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`px-4 py-2 ${activity.bgColor} rounded-lg`}>
                      <p className="text-sm text-gray-600">
                        <span
                          className={`${activity.iconColor} text-2xl`}
                          style={{ fontWeight: 700 }}
                        >
                          {count}
                        </span>{' '}
                        {activityData.destinations}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleExploreActivity(activity.id)}
                    className={`w-full bg-linear-to-r py-3 ${activity.color} flex items-center justify-center gap-2 rounded-xl text-white transition-all group-hover:gap-3 hover:shadow-lg`}
                  >
                    {t('common.exploreNow')}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Mountains Section */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl text-gray-900" style={{ fontWeight: 700 }}>
              {t('common.popularActivities')}
            </h2>
            <p className="text-gray-600">{t('activities.popularAcross')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {activities.map(activity => {
              const Icon = activity.icon;
              const count = getActivityCount(activity.id);

              return (
                <button
                  key={activity.id}
                  onClick={() => handleExploreActivity(activity.id)}
                  className={`${activity.bgColor} rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-md`}
                >
                  <Icon className={`h-8 w-8 ${activity.iconColor} mx-auto mb-2`} />
                  <p className="mb-1 text-sm text-gray-700">
                    {(t(`activities.${activity.key}.title`) as string) || activity.id}
                  </p>
                  <p className={`text-xs ${activity.iconColor}`} style={{ fontWeight: 600 }}>
                    {loading ? '–' : count} {t('mountains.mountains')}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="from-teal-primary to-blue-primary mt-16 rounded-2xl bg-linear-to-r p-12 text-center text-white">
          <h2 className="mb-4 text-3xl md:text-4xl" style={{ fontWeight: 700 }}>
            {t('cta.readyToStart')}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">{t('cta.joinThousands')}</p>
          <button
            onClick={() => onNavigate('planner')}
            className="text-teal-primary rounded-full bg-white px-8 py-4 shadow-lg transition-all hover:scale-105 hover:bg-gray-100"
            style={{ fontSize: '1.125rem', fontWeight: 600 }}
          >
            {t('cta.startPlanning')}
          </button>
        </div>
      </div>
    </div>
  );
}
