import { MapPin, Mountain, Tag, TrendingUp } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MountainDetailModal } from './MountainDetailModal';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface MountainData {
  id: number;
  name: string;
  description: string;
  region: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Expert';
  season: string[];
  activity: string;
  image: string;
  elevation?: string;
  activities?: string[];
  tips?: string;
  facts?: string;
  bestTime?: string;
  whatToBring?: string[];
}

interface MountainCardProps {
  mountain: MountainData;
  onPlanClimb: (mountain: MountainData) => void;
}

export function MountainCard({ mountain, onPlanClimb }: MountainCardProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

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
        return 'bg-teal-lighter text-teal-primary';
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
    <div
      className="group magnifier-target cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
      onClick={() => {
        if (!isOpen) setIsOpen(true);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
        }
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={mountain.image}
          alt={mountain.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`rounded-full px-3 py-1 text-xs ${getActivityColor(mountain.activity)}`}>
            {mountain.activity}
          </span>
        </div>
        {mountain.elevation && (
          <div className="glass-dark absolute bottom-3 left-3 rounded-full px-3 py-1 text-sm text-white">
            <Mountain className="mr-1 inline h-4 w-4" />
            {mountain.elevation}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-gray-900">{mountain.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{mountain.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <MapPin className="h-3 w-3" />
            {mountain.region}
          </div>
          <span
            className={`rounded-full px-2 py-1 text-xs ${getDifficultyColor(mountain.difficulty)}`}
          >
            <TrendingUp className="mr-1 inline h-3 w-3" />
            {mountain.difficulty}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
            <Tag className="mr-1 inline h-3 w-3" />
            {mountain.season.join(', ')}
          </span>
        </div>
        <div className="mt-4 rounded-lg bg-gray-100 px-3 py-2 text-center text-sm text-gray-700">
          {t.common?.viewDetails || 'View Details'}
        </div>
      </div>

      <MountainDetailModal
        mountain={mountain}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          console.log('close modal', isOpen);
        }}
        onPlanClimb={onPlanClimb}
      />
    </div>
  );
}
