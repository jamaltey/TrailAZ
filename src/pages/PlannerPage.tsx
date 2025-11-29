import { AlertCircle, Calendar, CheckCircle, MapPin, Package } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MountainData } from '../components/MountainCard';
import { fetchMountains } from '../utils/mountains';

interface PlannerPageProps {
  preselectedMountain?: MountainData;
}

export function PlannerPage({ preselectedMountain }: PlannerPageProps) {
  const { t } = useTranslation();
  const [mountains, setMountains] = React.useState<MountainData[]>([]);
  const [selectedMountain, setSelectedMountain] = React.useState(
    preselectedMountain?.id.toString() || ''
  );
  const [numDays, setNumDays] = React.useState(3);
  const [activity, setActivity] = React.useState('Hiking');
  const [accessibilityMode, setAccessibilityMode] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [selectedPackages, setSelectedPackages] = React.useState<string[]>([]);

  const packages = [
    { id: 'guide', name: t('planner.packages.guide'), price: 150 },
    { id: 'equipment', name: t('planner.packages.equipment'), price: 80 },
    { id: 'transport', name: t('planner.packages.transport'), price: 100 },
    { id: 'meals', name: t('planner.packages.meals'), price: 60 },
    { id: 'insurance', name: t('planner.packages.insurance'), price: 40 },
  ];

  const togglePackage = (packageId: string) => {
    setSelectedPackages(prev =>
      prev.includes(packageId) ? prev.filter(id => id !== packageId) : [...prev, packageId]
    );
  };

  const calculateTotalCost = () => {
    const baseCost = numDays * 50;
    const packageCost = packages
      .filter(pkg => selectedPackages.includes(pkg.id))
      .reduce((sum, pkg) => sum + pkg.price, 0);
    return baseCost + packageCost;
  };

  const getMountainData = () => {
    return mountains.find(m => m.id.toString() === selectedMountain);
  };

  const generateItinerary = () => {
    const days = [];
    for (let i = 1; i <= numDays; i++) {
      let dayActivity = '';
      let dayCost = 50;

      if (i === 1) {
        dayActivity = t('planner.itinerary.arrival');
        dayCost = 80;
      } else if (i === numDays) {
        dayActivity = t('planner.itinerary.finale');
        dayCost = 70;
      } else {
        const activities = t('planner.itinerary.options', { returnObjects: true }) as string[];
        dayActivity = activities[i % activities.length];
        dayCost = 50;
      }

      days.push({
        day: i,
        activity: dayActivity,
        cost: dayCost,
      });
    }
    return days;
  };

  const itinerary = generateItinerary();
  const mountain = getMountainData();

  React.useEffect(() => {
    let cancelled = false;
    fetchMountains()
      .then(data => {
        if (!cancelled) setMountains(data);
      })
      .catch(() => {
        if (!cancelled) setMountains([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  console.log(mountain);

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl text-gray-900 md:text-5xl" style={{ fontWeight: 700 }}>
            {t('planner.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('planner.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Planning Form */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-gray-900">{t('planner.planYourAdventure')}</h2>

            <div className="space-y-6">
              {/* Mountain Selector */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-gray-700">
                  <MapPin className="text-teal-primary h-5 w-5" />
                  {t('planner.selectMountain')}
                </label>
                <select
                  value={selectedMountain}
                  onChange={e => setSelectedMountain(e.target.value)}
                  className="focus:ring-teal-primary w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none"
                >
                  <option value="">{t('planner.chooseMountain')}</option>
                  {mountains.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.region} ({m.elevation})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-gray-700">
                  <Calendar className="text-teal-primary h-5 w-5" />
                  {t('planner.startDate')}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="focus:ring-teal-primary w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none"
                />
              </div>

              {/* Number of Days */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-gray-700">
                  <Calendar className="text-teal-primary h-5 w-5" />
                  {t('planner.duration')}
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={numDays}
                  onChange={e => setNumDays(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>1 {t('planner.day')}</span>
                  <span className="text-teal-primary" style={{ fontWeight: 600 }}>
                    {numDays} {numDays === 1 ? t('planner.day') : t('planner.days')}
                  </span>
                  <span>7 {t('planner.days')}</span>
                </div>
              </div>

              {/* Season */}
              {/* <div>
                <label className="mb-2 block text-gray-700">
                  {t('planner.bestSeason')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Winter', 'Spring', 'Summer', 'Autumn'].map(s => (
                    <button
                      key={s}
                      className={cn('rounded-lg border px-4 py-2 transition-colors',
                        selectedMountain?.season.includes(s.toLowerCase())
                          ? 'border-teal-primary bg-teal-primary text-white'
                          : 'hover:border-teal-primary border-gray-300 bg-white')}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Activity Type */}
              <div>
                <label className="mb-2 block text-gray-700">{t('planner.activityType')}</label>
                <select
                  value={activity}
                  onChange={e => setActivity(e.target.value)}
                  className="focus:ring-teal-primary w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none"
                >
                  <option value="Hiking">Hiking</option>
                  <option value="Climbing">Climbing</option>
                  <option value="Skiing">Skiing</option>
                  <option value="Camping">Camping</option>
                  <option value="Photography">Photography</option>
                </select>
              </div>

              {/* Difficulty Level */}
              {/* <div>
                <label className="mb-2 flex items-center gap-2 text-gray-700">
                  <TrendingUp className="text-teal-primary h-5 w-5" />
                  {t('planner.difficultyLevel')}
                </label>
                <select
                  value={mountain?.difficulty}
                  className="focus:ring-teal-primary w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                  <option value="Expert">Expert</option>
                </select>
              </div> */}

              {/* Accessibility Mode */}
              <div>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={accessibilityMode}
                    onChange={e => setAccessibilityMode(e.target.checked)}
                    className="text-teal-primary focus:ring-teal-primary h-5 w-5 rounded focus:ring-2"
                  />
                  <span className="text-gray-700">{t('planner.accessibilityRoutes')}</span>
                </label>
              </div>

              {/* Optional Packages */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-gray-700">
                  <Package className="text-teal-primary h-5 w-5" />
                  {t('planner.optionalAddons')}
                </label>
                <div className="space-y-2">
                  {packages.map(pkg => (
                    <label
                      key={pkg.id}
                      className="hover:border-teal-primary flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedPackages.includes(pkg.id)}
                          onChange={() => togglePackage(pkg.id)}
                          className="text-teal-primary h-4 w-4 rounded"
                        />
                        <span className="text-gray-700">{pkg.name}</span>
                      </div>
                      <span className="text-teal-primary" style={{ fontWeight: 600 }}>
                        ${pkg.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Preview */}
          <div className="space-y-6">
            {/* Mountain Info Card */}
            {mountain && (
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="from-teal-primary to-blue-primary flex h-48 items-center justify-center bg-linear-to-br text-white">
                  <div className="text-center">
                    <h3 className="mb-2 text-2xl" style={{ fontWeight: 700 }}>
                      {mountain.name}
                    </h3>
                    <p className="text-lg opacity-90">
                      {mountain.region} • {mountain.elevation}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-gray-600">{mountain.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-teal-lighter text-teal-primary rounded-full px-3 py-1 text-sm">
                      {mountain.activity}
                    </span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {mountain.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Itinerary */}
            <div className="magnifier-target rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-gray-900">{t('planner.yourItinerary')}</h3>
              <div className="space-y-4">
                {itinerary.map(day => (
                  <div
                    key={day.day}
                    className="magnifier-target border-teal-primary border-l-4 py-2 pl-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-gray-900">
                        {t('planner.day')} {day.day}
                      </h4>
                      <span className="text-teal-primary" style={{ fontWeight: 600 }}>
                        ${day.cost}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{day.activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Summary */}
            <div className="from-teal-primary to-blue-primary rounded-2xl bg-linear-to-br p-6 text-white shadow-lg">
              <h3 className="mb-4">{t('planner.tripSummary')}</h3>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span>
                    {t('planner.baseCost')} ({numDays}{' '}
                    {numDays === 1 ? t('planner.day') : t('planner.days')})
                  </span>
                  <span>${numDays * 50}</span>
                </div>
                {selectedPackages.length > 0 && (
                  <>
                    <div className="border-t border-white/20 pt-3">
                      <p className="mb-2 text-sm opacity-80">{t('planner.addons')}</p>
                      {packages
                        .filter(pkg => selectedPackages.includes(pkg.id))
                        .map(pkg => (
                          <div key={pkg.id} className="mb-1 flex justify-between text-sm">
                            <span>{pkg.name}</span>
                            <span>${pkg.price}</span>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-white/20 pt-4 text-xl">
                <span style={{ fontWeight: 700 }}>{t('planner.totalCost')}</span>
                <span style={{ fontWeight: 700 }}>${calculateTotalCost()}</span>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <h4 className="mb-2 text-amber-900">{t('planner.safetyTips')}</h4>
                  <ul className="space-y-1 text-sm text-amber-800">
                    <li>• Check weather forecasts before departure</li>
                    <li>• Inform someone of your itinerary</li>
                    <li>
                      • Pack appropriate gear for {mountain?.season.join(', ').toLowerCase()}{' '}
                      conditions
                    </li>
                    <li>• Stay hydrated and monitor altitude sickness symptoms</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="bg-teal-primary hover:bg-teal-light flex w-full items-center justify-center gap-2 rounded-xl py-4 text-white shadow-lg transition-colors">
              <CheckCircle className="h-5 w-5" />
              {t('planner.planRoute')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
