import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  Calendar,
  CheckCircle,
  Info,
  MapPin,
  Mountain,
  Package,
  TrendingUp,
  X,
} from 'lucide-react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { MountainData } from './MountainCard';

interface MountainDetailModalProps {
  mountain: MountainData;
  isOpen: boolean;
  onClose: () => void;
  onPlanClimb: (mountain: MountainData) => void;
}

export function MountainDetailModal({
  mountain,
  isOpen,
  onClose,
  onPlanClimb,
}: MountainDetailModalProps) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Moderate':
        return 'bg-blue-100 text-blue-700';
      case 'Difficult':
        return 'bg-orange-100 text-orange-700';
      case 'Expert':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityColor = (activity: string) => {
    switch (activity.toLowerCase()) {
      case 'hiking':
        return 'bg-[var(--teal-lighter)] text-teal-primary';
      case 'climbing':
        return 'bg-purple-100 text-purple-700';
      case 'skiing':
        return 'bg-blue-100 text-blue-700';
      case 'camping':
        return 'bg-green-100 text-green-700';
      case 'photography':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Transition show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose} open>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
            <TransitionChild
              as={Fragment}
              enter="transition-transform ease-out duration-150"
              enterFrom="translate-y-4 opacity-0 scale-95"
              enterTo="translate-y-0 opacity-100 scale-100"
              leave="transition-transform ease-in duration-150"
              leaveFrom="translate-y-0 opacity-100 scale-100"
              leaveTo="translate-y-4 opacity-0 scale-95"
            >
              <DialogPanel className="pointer-events-auto bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                  {/* Header Image */}
                  <div className="relative h-72 md:h-96 overflow-hidden rounded-t-3xl">
                    <img
                      src={mountain.image}
                      alt={mountain.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-150 ease-out shadow-lg hover:shadow-xl"
                    >
                      <X className="w-6 h-6 text-gray-900" />
                    </button>

                    {/* Mountain Name & Badges */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getActivityColor(mountain.activity)}`}
                        >
                          {mountain.activity}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(mountain.difficulty)}`}
                        >
                          <TrendingUp className="w-4 h-4 inline mr-1" />
                          {mountain.difficulty}
                        </span>
                        {mountain.elevation && (
                          <span className="px-3 py-1 rounded-full text-sm bg-white/90 text-gray-900">
                            <Mountain className="w-4 h-4 inline mr-1" />
                            {mountain.elevation}
                          </span>
                        )}
                      </div>
                      <h2 className="text-white text-3xl md:text-4xl">{mountain.name}</h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Overview */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-teal-primary" />
                        <p className="text-lg text-teal-primary">{mountain.region}</p>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {mountain.description}
                      </p>
                    </div>

                    {/* Best Season */}
                    {mountain.bestTime && (
                      <div className="mb-6 p-5 bg-teal-lighter rounded-2xl">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-teal-primary mt-1 shrink-0" />
                          <div>
                            <h3 className="text-teal-primary mb-2">
                              {t('modal.bestTimeToVisit', {
                                defaultValue: t('mountains.bestTimeToVisit', {
                                  defaultValue: 'Best Time to Visit',
                                }),
                              })}
                            </h3>
                            <p className="text-gray-800">{mountain.bestTime}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* What to Bring */}
                    {mountain.whatToBring && mountain.whatToBring.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-5 h-5 text-teal-primary" />
                          <h3 className="text-gray-900">
                            {t('modal.whatToBring', {
                              defaultValue: t('mountains.whatToBring', {
                                defaultValue: 'What to Bring',
                              }),
                            })}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {mountain.whatToBring.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-teal-primary mt-1 shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Available Activities */}
                    {mountain.activities && mountain.activities.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-gray-900 mb-3">
                          {t('modal.availableActivities', {
                            defaultValue: t('mountains.availableActivities', {
                              defaultValue: 'Available Activities',
                            }),
                          })}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {mountain.activities.map((activity, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:border-teal-primary hover:text-teal-primary transition-all duration-150"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {mountain.tips && (
                      <div className="mb-6 p-5 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                          <div>
                            <h3 className="text-blue-900 mb-2">
                              {t('modal.insiderTips', {
                                defaultValue: t('mountains.insiderTips', {
                                  defaultValue: 'Insider Tips',
                                }),
                              })}
                            </h3>
                            <p className="text-blue-800">{mountain.tips}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interesting Facts */}
                    {mountain.facts && (
                      <div className="mb-6 p-5 bg-purple-50 rounded-2xl border-l-4 border-purple-500">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-purple-600 mt-1 shrink-0" />
                          <div>
                            <h3 className="text-purple-900 mb-2">
                              {t('modal.interestingFacts', {
                                defaultValue: t('mountains.interestingFacts', {
                                  defaultValue: 'Interesting Facts',
                                }),
                              })}
                            </h3>
                            <p className="text-purple-800">{mountain.facts}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Best Seasons Badges */}
                    <div className="mb-8">
                      <h3 className="text-gray-900 mb-3">
                        {t('modal.bestSeasons', {
                          defaultValue: t('mountains.bestSeasons', {
                            defaultValue: 'Best Seasons',
                          }),
                        })}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {mountain.season.map((s, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onPlanClimb(mountain);
                        onClose();
                      }}
                      className="w-full py-4 bg-teal-primary text-white rounded-xl hover:bg-teal-light transition-all duration-150 ease-out shadow-md hover:shadow-xl"
                    >
                      {t('mountains.planThisClimb')}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
  );
}
