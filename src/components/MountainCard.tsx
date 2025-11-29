import { MapPin, Mountain, Tag, TrendingUp } from 'lucide-react';
import React from 'react';
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
}

interface MountainCardProps {
  mountain: MountainData;
  onPlanClimb: (mountain: MountainData) => void;
}

export function MountainCard({ mountain, onPlanClimb }: MountainCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={mountain.image}
          alt={mountain.name}
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
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

        {/* Additional Activities - shown on hover */}
        {mountain.activities && mountain.activities.length > 0 && isHovered && (
          <div className="animate-fade-in-up mb-4 rounded-lg bg-gray-50 p-3">
            <p className="mb-2 text-xs text-gray-500">Available Activities:</p>
            <div className="flex flex-wrap gap-1">
              {mountain.activities.slice(0, 4).map((act, i) => (
                <span
                  key={i}
                  className="rounded-full border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tips - shown on hover */}
        {mountain.tips && isHovered && (
          <div className="animate-fade-in-up mb-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-900">
            💡 {mountain.tips}
          </div>
        )}

        {/* Hover Action */}
        <button
          onClick={() => onPlanClimb(mountain)}
          className={`w-full rounded-lg py-2 transition-all ${
            isHovered ? 'bg-teal-primary text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Plan This Climb
        </button>
      </div>
    </div>
  );
}
