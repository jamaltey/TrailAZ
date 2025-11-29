import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: 'var(--teal-lighter)' }}
      >
        <Icon className="h-7 w-7" style={{ color: 'var(--teal-primary)' }} />
      </div>
      <h3 className="mb-2 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
