import { Search, SlidersHorizontal, X } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MountainCard, MountainData } from '../components/MountainCard';
import { fetchMountains } from '../utils/mountains';

interface MountainsPageProps {
  onNavigate: (page: string, data?: any) => void;
  filterData?: any;
}

export function MountainsPage({ onNavigate, filterData }: MountainsPageProps) {
  const { t } = useTranslation();
  const [mountains, setMountains] = React.useState<MountainData[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('All');
  const [selectedSeason, setSelectedSeason] = React.useState('All');
  const [selectedActivity, setSelectedActivity] = React.useState(
    filterData?.filterActivity || 'All'
  );
  const [showFilters, setShowFilters] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (filterData?.filterActivity) {
      setSelectedActivity(filterData.filterActivity);
    }
  }, [filterData]);

  React.useEffect(() => {
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

  const regions = [t('mountains.all'), ...Array.from(new Set(mountains.map(m => m.region)))];
  const difficulties = [
    t('mountains.all'),
    t('mountains.easy'),
    t('mountains.moderate'),
    t('mountains.difficult'),
    t('mountains.expert'),
  ];
  const seasons = [
    t('mountains.all'),
    t('seasons.winter.name'),
    t('seasons.spring.name'),
    t('seasons.summer.name'),
    t('seasons.autumn.name'),
  ];
  const activities = [t('mountains.all'), ...Array.from(new Set(mountains.map(m => m.activity)))];

  const filteredMountains = mountains.filter(mountain => {
    const matchesSearch =
      mountain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mountain.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === 'All' ||
      selectedRegion === t('mountains.all') ||
      mountain.region === selectedRegion;
    const matchesDifficulty =
      selectedDifficulty === 'All' ||
      selectedDifficulty === t('mountains.all') ||
      mountain.difficulty === selectedDifficulty;
    const matchesSeason =
      selectedSeason === 'All' ||
      selectedSeason === t('mountains.all') ||
      mountain.season.includes(selectedSeason);
    const matchesActivity =
      selectedActivity === 'All' ||
      selectedActivity === t('mountains.all') ||
      mountain.activity.toLowerCase() === selectedActivity.toLowerCase();

    return matchesSearch && matchesRegion && matchesDifficulty && matchesSeason && matchesActivity;
  });

  const handlePlanClimb = (mountain: MountainData) => {
    onNavigate('planner', { selectedMountain: mountain });
  };

  const activeFiltersCount = [
    selectedRegion !== 'All',
    selectedDifficulty !== 'All',
    selectedSeason !== 'All',
    selectedActivity !== 'All',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedRegion('All');
    setSelectedDifficulty('All');
    setSelectedSeason('All');
    setSelectedActivity('All');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl text-gray-900 md:text-5xl" style={{ fontWeight: 700 }}>
            {t('mountains.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('mountains.subtitle')}</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder={t('mountains.searchPlaceholder')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="focus:ring-teal-primary w-full rounded-xl border border-gray-300 py-3 pr-4 pl-12 focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-teal-primary hover:bg-teal-light flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-white transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
              {t('mountains.filters')}
              {activeFiltersCount > 0 && (
                <span className="text-teal-primary ml-1 rounded-full bg-white px-2 py-0.5 text-sm">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="animate-fade-in-up mt-6 grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 md:grid-cols-4">
              {/* Region Filter */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">{t('mountains.region')}</label>
                <select
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                  className="focus:ring-teal-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  {t('mountains.difficulty')}
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="focus:ring-teal-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Season Filter */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">{t('mountains.season')}</label>
                <select
                  value={selectedSeason}
                  onChange={e => setSelectedSeason(e.target.value)}
                  className="focus:ring-teal-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                >
                  {seasons.map(season => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>

              {/* Activity Filter */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  {t('mountains.activityType')}
                </label>
                <select
                  value={selectedActivity}
                  onChange={e => setSelectedActivity(e.target.value)}
                  className="focus:ring-teal-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                >
                  {activities.map(activity => (
                    <option key={activity} value={activity}>
                      {activity}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">{t('mountains.activeFilters')}</span>
              {selectedRegion !== 'All' && (
                <span className="bg-teal-lighter text-teal-primary rounded-full px-3 py-1 text-sm">
                  {selectedRegion}
                </span>
              )}
              {selectedDifficulty !== 'All' && (
                <span className="bg-teal-lighter text-teal-primary rounded-full px-3 py-1 text-sm">
                  {selectedDifficulty}
                </span>
              )}
              {selectedSeason !== 'All' && (
                <span className="bg-teal-lighter text-teal-primary rounded-full px-3 py-1 text-sm">
                  {selectedSeason}
                </span>
              )}
              {selectedActivity !== 'All' && (
                <span className="bg-teal-lighter text-teal-primary rounded-full px-3 py-1 text-sm">
                  {selectedActivity}
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700 transition-colors hover:bg-red-200"
              >
                <X className="h-3 w-3" />
                {t('mountains.clearAll')}
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t('mountains.showing')}{' '}
            <span className="text-teal-primary" style={{ fontWeight: 600 }}>
              {filteredMountains.length}
            </span>{' '}
            {filteredMountains.length === 1 ? t('mountains.mountain') : t('mountains.mountains')}
          </p>
        </div>

        {/* Mountains Grid */}
        {filteredMountains.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMountains.map(mountain => (
              <MountainCard key={mountain.id} mountain={mountain} onPlanClimb={handlePlanClimb} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl text-gray-900">
              {loading ? t('common.loading') : t('mountains.noMountainsFound')}
            </h3>
            <p className="mb-6 text-gray-600">{t('mountains.tryAdjusting')}</p>
            <button
              onClick={clearAllFilters}
              className="bg-teal-primary hover:bg-teal-light rounded-lg px-6 py-3 text-white transition-colors"
            >
              {t('mountains.clearAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
