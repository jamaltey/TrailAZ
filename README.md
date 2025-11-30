# TrailAZ

Accessible mountain exploration UI built with Vite + React, Tailwind (v4 via `@tailwindcss/vite`), and Supabase-backed data for mountains. Includes multi-language support with `react-i18next`, accessible modals, and Shadcn-style UI primitives.

## Stack
- React 18, Vite 7, TypeScript
- Tailwind CSS 4 with `@tailwindcss/vite`
- react-i18next for translations (language persisted to `localStorage`)
- Supabase for mountain data (`mountains` table)
- Headless UI / lucide-react for dialogs and icons

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Data & Supabase
- Supabase client is defined in `src/utils/supabase.ts`.
- Mountain data is fetched from the `mountains` table via `src/utils/mountains.ts` (fields: `id, created_at, name, description, region, difficulty, season, activity, elevation, image, activities, facts, tips`, plus optional `bestTime/whatToBring` if present).
- Profiles and trips are modeled in Supabase:
  - `profiles` (id uuid, full_name, avatar_url, preferences jsonb, created_at, birthday) linked to `auth.users.id`.
  - `trips` (id uuid, user_id uuid → auth.users.id, title, mountain, start_date, end_date, status, notes, created_at, updated_at, activity_type, addons jsonb, total_cost numeric).
- Update the client URL/key as needed for your project.

## Translations
- Resources live in `src/translations.ts`.
- Language selection is saved to `localStorage` and applied on load.

## UI Notes
- Mountain cards open a Headless UI dialog (`MountainDetailModal`) showing details and a “Plan This Climb” action.
- Global styling lives in `src/index.css`.
