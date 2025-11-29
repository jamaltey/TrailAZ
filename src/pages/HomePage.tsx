import { ArrowRight, Compass, DollarSign, Eye, Mountain, Shield, Wifi } from 'lucide-react';
import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { SeasonCard } from '../components/SeasonCard';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Compass,
      title: t.features?.expertTrails?.title || 'Expert Trail Mapping',
      description:
        t.features?.expertTrails?.description ||
        'Professionally mapped routes with detailed topographic information and waypoints.',
    },
    {
      icon: Mountain,
      title: t.features?.aiRoutes?.title || 'AI-Suggested Routes',
      description:
        t.features?.aiRoutes?.description ||
        'Smart recommendations based on your experience level, fitness, and preferences.',
    },
    {
      icon: Shield,
      title: t.features?.safety?.title || 'Safety-First Approach',
      description:
        t.features?.safety?.description ||
        'Real-time weather updates, emergency contacts, and safety guidelines for every trail.',
    },
    {
      icon: DollarSign,
      title: t.features?.budget?.title || 'Budget-Friendly Options',
      description:
        t.features?.budget?.description ||
        'Transparent pricing with packages for every budget, from basic to premium experiences.',
    },
    {
      icon: Eye,
      title: t.features?.accessibility?.title || 'Accessibility Features',
      description:
        t.features?.accessibility?.description ||
        'Inclusive design with tools for enhanced readability and navigation assistance.',
    },
    {
      icon: Wifi,
      title: t.features?.offline?.title || 'Offline-Ready',
      description:
        t.features?.offline?.description ||
        'Download maps and guides for offline access in remote mountain locations.',
    },
  ];

  const seasons = [
    {
      season: t.seasons?.winter?.name || 'Winter',
      image:
        'https://images.unsplash.com/photo-1667297793700-db338d5ec68c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBtb3VudGFpbiUyMHNub3d8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      activities: t.seasons?.winter?.activities || ['Skiing', 'Snowboarding', 'Winter Hiking'],
      budget: t.seasons?.winter?.budget || '$$$ - Premium',
      difficulty: t.seasons?.winter?.difficulty || 'Moderate to Difficult',
    },
    {
      season: t.seasons?.spring?.name || 'Spring',
      image:
        'https://images.unsplash.com/photo-1680306684314-35d1a83f3ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtb3VudGFpbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      activities: t.seasons?.spring?.activities || [
        'Wildflower Trails',
        'Photography',
        'Gentle Hiking',
      ],
      budget: t.seasons?.spring?.budget || '$$ - Moderate',
      difficulty: t.seasons?.spring?.difficulty || 'Easy to Moderate',
    },
    {
      season: t.seasons?.summer?.name || 'Summer',
      image:
        'https://images.unsplash.com/photo-1663841365399-bf1a469a16e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQzMTkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      activities: t.seasons?.summer?.activities || ['Peak Climbing', 'Camping', 'Multi-day Treks'],
      budget: t.seasons?.summer?.budget || '$ - Budget Friendly',
      difficulty: t.seasons?.summer?.difficulty || 'All Levels',
    },
    {
      season: t.seasons?.autumn?.name || 'Autumn',
      image:
        'https://images.unsplash.com/photo-1635793889811-c342a365d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBtb3VudGFpbiUyMGZhbGx8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      activities: t.seasons?.autumn?.activities || [
        'Fall Foliage Tours',
        'Scenic Hiking',
        'Photography',
      ],
      budget: t.seasons?.autumn?.budget || '$$ - Moderate',
      difficulty: t.seasons?.autumn?.difficulty || 'Easy to Moderate',
    },
  ];

  const floatingInfoItems = [
    { label: t.hero?.trails || 'Trails', delay: '0s' },
    { label: t.hero?.peaks || 'Peaks', delay: '0.2s' },
    { label: t.hero?.guides || 'Guides', delay: '0.4s' },
    { label: t.hero?.seasonalTips || 'Seasonal Tips', delay: '0.6s' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <h1
            className="animate-fade-in-up mb-6 text-5xl md:text-7xl"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            {t.hero?.title || "Conquer Azerbaijan's Mountains"}
          </h1>
          <p className="animate-fade-in-up mb-8 text-xl text-gray-100 opacity-90 md:text-2xl">
            {t.hero?.subtitle || 'Plan your adventure, pick your dates, and explore safely'}
          </p>

          <div className="animate-fade-in-up mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate('planner')}
              className="bg-teal-primary hover:bg-teal-light flex items-center justify-center gap-2 rounded-full px-8 py-4 text-white shadow-lg transition-all hover:scale-105"
              style={{ fontSize: '1.125rem' }}
            >
              {t.hero?.planMyClimb || 'Plan My Climb'}
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate('mountains')}
              className="rounded-full bg-gray-500/80 px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:bg-white/20 hover:backdrop-blur-xs"
              style={{ fontSize: '1.125rem' }}
            >
              {t.hero?.exploreMountains || 'Explore Mountains'}
            </button>
          </div>

          {/* Floating Info Icons */}
          <div className="flex flex-wrap justify-center gap-4">
            {floatingInfoItems.map((item, index) => (
              <div
                key={index}
                className="glass-dark animate-float rounded-full px-6 py-3 text-white"
                style={{ animationDelay: item.delay }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform animate-bounce">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white p-2">
            <div className="h-3 w-1 rounded-full bg-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl text-gray-900 md:text-5xl" style={{ fontWeight: 700 }}>
              {t.features?.title || 'Why TrailAZ Mountains?'}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {t.features?.subtitle ||
                "Experience the perfect blend of adventure, safety, and local expertise in Azerbaijan's most stunning mountain destinations."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Recommendations */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl text-gray-900 md:text-5xl" style={{ fontWeight: 700 }}>
              {t.seasons?.title || 'Plan by Season'}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {t.seasons?.subtitle ||
                "Each season offers unique experiences and adventures in Azerbaijan's mountains. Choose your perfect time to explore."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {seasons.map((season, index) => (
              <SeasonCard
                key={index}
                season={season.season}
                image={season.image}
                activities={season.activities}
                budget={season.budget}
                difficulty={season.difficulty}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-teal-primary to-blue-primary bg-linear-to-r px-4 py-20">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-6 text-4xl md:text-5xl" style={{ fontWeight: 700 }}>
            {t.cta?.readyToStart || 'Ready to Start Your Adventure?'}
          </h2>
          <p className="mb-8 text-xl opacity-90">
            {t.cta?.joinThousands ||
              "Join thousands of adventurers discovering Azerbaijan's hidden mountain gems. Plan your perfect climb today."}
          </p>
          <button
            onClick={() => onNavigate('planner')}
            className="text-teal-primary rounded-full bg-white px-8 py-4 shadow-lg transition-all hover:scale-105 hover:bg-gray-100"
            style={{ fontSize: '1.125rem', fontWeight: 600 }}
          >
            {t.cta?.startPlanning || 'Start Planning Now'}
          </button>
        </div>
      </section>
    </div>
  );
}
