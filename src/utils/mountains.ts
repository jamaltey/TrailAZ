import { MountainData } from '../components/MountainCard';
import { supabase } from './supabase';

const formatElevation = (elevation?: number | string | null) => {
  if (elevation === null || elevation === undefined) return undefined;
  if (typeof elevation === 'number') return `${elevation}m`;
  const trimmed = String(elevation).trim();
  return trimmed.endsWith('m') ? trimmed : `${trimmed}m`;
};

const normalizeArray = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  return String(value)
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);
};

export async function fetchMountains(): Promise<MountainData[]> {
  const { data, error } = await supabase.from('mountains').select('*');
  if (error) {
    throw new Error(error.message);
  }

  return (
    data?.map(row => ({
      id: row.id,
      name: row.name ?? '',
      description: row.description ?? '',
      region: row.region ?? '',
      difficulty: (row.difficulty as MountainData['difficulty']) ?? 'Moderate',
      season: normalizeArray(row.season),
      activity: row.activity ?? 'Hiking',
      elevation: formatElevation(row.elevation),
      image:
        row.image ??
        'https://images.unsplash.com/photo-1504280317859-9da4284e948f?auto=format&fit=crop&w=1200&q=80',
      activities: normalizeArray(row.activities),
      tips: row.tips ?? undefined,
      facts: row.facts ?? undefined,
      bestTime: row.bestTime ?? undefined,
      whatToBring: normalizeArray((row as any).whatToBring),
    })) ?? []
  );
}
