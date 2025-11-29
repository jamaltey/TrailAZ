import { Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SeasonCardProps {
  season: string;
  image: string;
  activities: string[];
  budget: string;
  difficulty: string;
}

export function SeasonCard({ season, image, activities, budget, difficulty }: SeasonCardProps) {
  return (
    <div className="magnifier-target overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={season}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute right-4 bottom-4 left-4">
          <div className="mb-2 flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5" />
            <span className="text-xl" style={{ fontWeight: 600 }}>
              {season}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h4 className="mb-2 text-gray-900">Popular Activities</h4>
          <div className="flex flex-wrap gap-2">
            {activities.map((activity, index) => (
              <span
                key={index}
                className="bg-teal-lighter text-teal-primary rounded-full px-3 py-1 text-sm"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>{budget}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
