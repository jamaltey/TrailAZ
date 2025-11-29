import { MountainData } from '../components/MountainCard';

export const mountainsData: MountainData[] = [
  {
    id: 1,
    name: 'Shahdag Peak',
    description:
      'The highest peak in the Greater Caucasus range of Azerbaijan, offering spectacular views and challenging climbs.',
    region: 'Qusar',
    difficulty: 'Expert',
    season: ['Summer', 'Autumn'],
    activity: 'Climbing',
    elevation: '4,243m',
    image:
      'https://images.unsplash.com/photo-1664648853617-127a94346600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBzdW1taXR8ZW58MXx8fHwxNzY0MjU2NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    activities: ['Technical climbing', 'Ice climbing', 'Alpine photography', 'Glacier trekking'],
    tips: 'Best climbed June-September. Requires technical climbing experience and proper equipment. Weather changes rapidly above 3,500m.',
    facts:
      'Named "Shahdag" (Royal Mountain) in Persian. First recorded ascent in 1932. Part of Greater Caucasus UNESCO Biosphere Reserve.',
  },
  {
    id: 2,
    name: 'Bazarduzu Mountain',
    description:
      'A majestic peak on the Azerbaijan-Russia border, known for its pristine alpine meadows and diverse wildlife.',
    region: 'Qusar',
    difficulty: 'Expert',
    season: ['Summer'],
    activity: 'Hiking',
    elevation: '4,466m',
    image:
      'https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Tufandag Mountain',
    description:
      'Popular ski resort destination with year-round activities, from winter sports to summer hiking trails.',
    region: 'Gabala',
    difficulty: 'Moderate',
    season: ['Winter', 'Spring', 'Summer'],
    activity: 'Skiing',
    elevation: '4,191m',
    image:
      'https://images.unsplash.com/photo-1589894287084-eee3c5c1966a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNraWluZyUyMHNsb3Blc3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    activities: ['Skiing', 'Snowboarding', 'Cable car rides', 'Mountain biking', 'Paragliding'],
    tips: 'Winter skiing December-March. Cable cars operate year-round. Beginner-friendly ski slopes with professional instructors available.',
    facts:
      '17km of ski slopes, modern cable car system reaching 2,500m, 2020 resort upgrade. Host to international ski competitions.',
  },
  {
    id: 4,
    name: 'Khinalig Village Trek',
    description:
      'Ancient mountain village surrounded by stunning peaks, offering cultural immersion and breathtaking landscapes.',
    region: 'Quba',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '2,350m',
    image:
      'https://images.unsplash.com/photo-1663841365399-bf1a469a16e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQzMTkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    activities: [
      'Village trekking',
      'Cultural tours',
      'Traditional homestays',
      'Photography',
      'Ethnographic exploration',
    ],
    tips: "One of Europe's highest permanently inhabited villages. Road access May-October. Bring warm clothing even in summer.",
    facts:
      '2,000+ years old, unique Khinalig language, UNESCO heritage site candidate. Ancient stone architecture and traditions preserved.',
  },
  {
    id: 5,
    name: 'Laza Waterfall Trail',
    description:
      'Scenic hiking trail leading to magnificent waterfalls, perfect for photography and nature lovers.',
    region: 'Qusar',
    difficulty: 'Easy',
    season: ['Spring', 'Summer'],
    activity: 'Hiking',
    elevation: '1,650m',
    image:
      'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHNjZW5pY3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    activities: [
      'Waterfall hiking',
      'Nature photography',
      'Picnicking',
      'Bird watching',
      'Family-friendly trails',
    ],
    tips: 'Best visited May-July when waterfalls are most powerful. Easy 2-hour trail suitable for families. Wear waterproof shoes.',
    facts:
      'Village of Laza known for wool processing. Multiple cascading waterfalls reaching 25m height. Rich in endemic plant species.',
  },
  {
    id: 6,
    name: 'Gizilgaya Camping Grounds',
    description:
      'Spectacular camping location with panoramic mountain views and excellent stargazing opportunities.',
    region: 'Gabala',
    difficulty: 'Easy',
    season: ['Summer', 'Autumn'],
    activity: 'Camping',
    activities: [
      'Tent camping',
      'Stargazing',
      'Bonfire gatherings',
      'Nature walks',
      'Wildlife spotting',
    ],
    tips: 'Bring warm sleeping bag even in summer. No facilities available - pack everything. Best camping June-September.',
    facts:
      'Dark sky location perfect for astronomy. Often spotted: deer, foxes, eagles. Named after reddish-gold rock formations.',
    elevation: '1,800m',
    image:
      'https://images.unsplash.com/photo-1607672390383-aa666b4761ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbXBpbmclMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 7,
    name: 'Quba Mountain Resort',
    description:
      'All-season mountain resort offering various activities from hiking to winter sports in a comfortable setting.',
    region: 'Quba',
    difficulty: 'Easy',
    season: ['Winter', 'Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '2,100m',
    image:
      'https://images.unsplash.com/photo-1667297793700-db338d5ec68c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBtb3VudGFpbiUyMHNub3d8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    name: 'Lahij Mountain Village',
    description:
      'Historic copper-working village nestled in mountains, combining cultural heritage with stunning scenery.',
    region: 'Ismailli',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,375m',
    image:
      'https://images.unsplash.com/photo-1680306684314-35d1a83f3ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtb3VudGFpbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    activities: [
      'Copper craft workshops',
      'Village hiking',
      'Photography tours',
      'Cultural immersion',
      'Traditional cuisine tasting',
    ],
    tips: 'Famous for handmade copper crafts - great souvenirs! Cobblestone streets require good footwear. Visit craft workshops.',
    facts:
      '1,500+ years of copper crafting tradition. Unique Tat language spoken. UNESCO Creative Cities candidate for crafts.',
  },
  {
    id: 9,
    name: 'Nohur Lake Trail',
    description:
      'Beautiful alpine lake surrounded by lush forests and mountains, ideal for leisurely hikes and picnics.',
    region: 'Gabala',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,550m',
    activities: [
      'Lake hiking',
      'Picnicking',
      'Fishing',
      'Photography',
      'Forest bathing',
      'Birdwatching',
    ],
    tips: 'Perfect for families and beginners. 3km easy trail around the lake. Bring picnic supplies - beautiful lakeside spots.',
    facts:
      'Crystal-clear glacial lake fed by mountain springs. Home to trout. Ancient legends of lake spirits still told by locals.',
    image:
      'https://images.unsplash.com/photo-1689825422854-8e3083c2fb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2NDIyNDQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 10,
    name: 'Murovdag Range',
    description:
      'Extensive mountain range offering diverse climbing routes and exceptional views of surrounding valleys.',
    region: 'Goygol',
    difficulty: 'Difficult',
    season: ['Summer', 'Autumn'],
    activity: 'Climbing',
    elevation: '3,724m',
    image:
      'https://images.unsplash.com/photo-1664648853617-127a94346600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBzdW1taXR8ZW58MXx8fHwxNzY0MjU2NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    activities: [
      'Technical climbing',
      'Ridge traversing',
      'Multi-pitch routes',
      'Alpine scrambling',
      'Summit photography',
    ],
    tips: 'Experienced climbers only. Variable weather - be prepared. Multiple routes of varying difficulty. Best July-September.',
    facts:
      'Part of Lesser Caucasus range. Name means "thousand mountains". Home to endemic Caucasian tur (mountain goat).',
  },
  {
    id: 11,
    name: 'Galaalti Lake Trek',
    description:
      'Pristine alpine lake with crystal-clear waters, accessible via scenic mountain trails.',
    region: 'Gabala',
    difficulty: 'Moderate',
    season: ['Summer'],
    activity: 'Hiking',
    elevation: '1,920m',
    image:
      'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHNjZW5pY3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 12,
    name: 'Shahdag National Park',
    description:
      'Vast protected area with diverse ecosystems, from dense forests to alpine meadows and glaciers.',
    region: 'Qusar',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '3,200m',
    image:
      'https://images.unsplash.com/photo-1663841365399-bf1a469a16e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQzMTkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 13,
    name: 'Yeddi Gozel Waterfall',
    description:
      'Seven beautiful waterfalls cascading down mountain slopes, creating a magical natural spectacle.',
    region: 'Gabala',
    difficulty: 'Easy',
    season: ['Spring', 'Summer'],
    activity: 'Photography',
    elevation: '1,200m',
    activities: [
      'Waterfall photography',
      'Nature walks',
      'Instagram-worthy spots',
      'Guided tours',
      'Picnic areas',
    ],
    tips: 'Bring camera with waterproof cover. Best light for photos morning/evening. Easy 1.5-hour trail to all seven falls.',
    facts:
      'Name means "Seven Beauties" in Azerbaijani. Local legend of seven sisters. Popular with photographers - 360° views.',
    image:
      'https://images.unsplash.com/photo-1680306684314-35d1a83f3ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtb3VudGFpbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 14,
    name: 'Ilisu Village Trail',
    description:
      'Charming mountain village trail offering cultural experiences and stunning Caucasus mountain views.',
    region: 'Qakh',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,620m',
    image:
      'https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 15,
    name: 'Goygol Lake Circuit',
    description:
      'Stunning mountain lake formed by an earthquake, surrounded by pristine forests and dramatic peaks.',
    region: 'Goygol',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,556m',
    image:
      'https://images.unsplash.com/photo-1689825422854-8e3083c2fb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2NDIyNDQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 16,
    name: 'Chirag Camp Base',
    description:
      "Base camp for serious mountaineering expeditions, gateway to some of Azerbaijan's highest peaks.",
    region: 'Qusar',
    difficulty: 'Expert',
    season: ['Summer'],
    activity: 'Camping',
    elevation: '3,100m',
    image:
      'https://images.unsplash.com/photo-1607672390383-aa666b4761ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbXBpbmclMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 17,
    name: 'Kish Alpine Route',
    description:
      'Historical mountain route passing ancient churches and offering panoramic Caucasus views.',
    region: 'Shaki',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '2,000m',
    image:
      'https://images.unsplash.com/photo-1635793889811-c342a365d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBtb3VudGFpbiUyMGZhbGx8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 18,
    name: 'Qalaalti Winter Sports',
    description:
      'Premier winter destination with excellent skiing facilities and modern infrastructure.',
    region: 'Gabala',
    difficulty: 'Moderate',
    season: ['Winter'],
    activity: 'Skiing',
    elevation: '2,300m',
    image:
      'https://images.unsplash.com/photo-1589894287084-eee3c5c1966a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNraWluZyUyMHNsb3Blc3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 19,
    name: 'Afurja Waterfall Trek',
    description:
      'Hidden gem featuring multiple waterfalls along a scenic forest trail in the mountains.',
    region: 'Lerik',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer'],
    activity: 'Photography',
    elevation: '1,400m',
    image:
      'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHNjZW5pY3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 20,
    name: 'Avey Village Heights',
    description:
      'Remote mountain village offering authentic local experiences and spectacular mountain vistas.',
    region: 'Qusar',
    difficulty: 'Difficult',
    season: ['Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '2,800m',
    image:
      'https://images.unsplash.com/photo-1663841365399-bf1a469a16e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQzMTkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 21,
    name: 'Batabat Plateau',
    description:
      'Vast alpine plateau with rolling green hills, perfect for horseback riding and camping.',
    region: 'Nakhchivan',
    difficulty: 'Easy',
    season: ['Spring', 'Summer'],
    activity: 'Camping',
    elevation: '2,400m',
    image:
      'https://images.unsplash.com/photo-1680306684314-35d1a83f3ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtb3VudGFpbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 22,
    name: 'Zaqatala Nature Reserve',
    description:
      'Protected mountain forest with diverse wildlife and well-maintained hiking trails.',
    region: 'Zaqatala',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,100m',
    image:
      'https://images.unsplash.com/photo-1689825422854-8e3083c2fb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2NDIyNDQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 23,
    name: 'Caucasus Ridge Trail',
    description:
      'Epic multi-day trek along the main Caucasus ridge with challenging terrain and rewarding views.',
    region: 'Qusar',
    difficulty: 'Expert',
    season: ['Summer'],
    activity: 'Climbing',
    elevation: '3,800m',
    image:
      'https://images.unsplash.com/photo-1664648853617-127a94346600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBzdW1taXR8ZW58MXx8fHwxNzY0MjU2NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 24,
    name: 'Lak Village Trails',
    description:
      'Network of trails connecting mountain villages, showcasing traditional architecture and hospitality.',
    region: 'Qakh',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,700m',
    image:
      'https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 25,
    name: 'Pirkuli Forest Trail',
    description:
      'Dense mountain forest with ancient trees and abundant wildlife, ideal for nature photography.',
    region: 'Lerik',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Photography',
    elevation: '900m',
    image:
      'https://images.unsplash.com/photo-1635793889811-c342a365d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBtb3VudGFpbiUyMGZhbGx8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 26,
    name: 'Qudyalchai Canyon',
    description:
      'Dramatic mountain canyon with rushing river, offering exciting adventure opportunities.',
    region: 'Qusar',
    difficulty: 'Difficult',
    season: ['Summer'],
    activity: 'Climbing',
    elevation: '2,200m',
    image:
      'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHNjZW5pY3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 27,
    name: 'Cek Village Heights',
    description:
      'Picturesque mountain village perched on hillside, offering stunning valley views and local crafts.',
    region: 'Qakh',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,450m',
    image:
      'https://images.unsplash.com/photo-1680306684314-35d1a83f3ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtb3VudGFpbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 28,
    name: 'Saribash Peak',
    description:
      'Prominent peak offering 360-degree panoramic views of the Greater Caucasus range.',
    region: 'Quba',
    difficulty: 'Difficult',
    season: ['Summer', 'Autumn'],
    activity: 'Climbing',
    elevation: '3,600m',
    image:
      'https://images.unsplash.com/photo-1664648853617-127a94346600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBzdW1taXR8ZW58MXx8fHwxNzY0MjU2NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 29,
    name: 'Sumgait Valley Camp',
    description:
      'Peaceful valley camping spot with access to multiple hiking routes and pristine nature.',
    region: 'Gabala',
    difficulty: 'Easy',
    season: ['Summer', 'Autumn'],
    activity: 'Camping',
    elevation: '1,600m',
    image:
      'https://images.unsplash.com/photo-1607672390383-aa666b4761ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbXBpbmclMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 30,
    name: 'Ganja Highlands',
    description: 'Extensive highland region with diverse landscapes, from meadows to rocky peaks.',
    region: 'Ganja',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '2,100m',
    image:
      'https://images.unsplash.com/photo-1663841365399-bf1a469a16e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQzMTkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 31,
    name: 'Mingachevir Mountains',
    description: 'Lesser-known mountain range offering solitude and unspoiled natural beauty.',
    region: 'Mingachevir',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,950m',
    image:
      'https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 32,
    name: 'Shamakhi Observatory Trail',
    description:
      "Scenic trail leading to Azerbaijan's premier astronomical observatory with stellar mountain views.",
    region: 'Shamakhi',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,435m',
    image:
      'https://images.unsplash.com/photo-1635793889811-c342a365d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBtb3VudGFpbiUyMGZhbGx8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 33,
    name: 'Talish Mountains Trek',
    description:
      'Unique subtropical mountain ecosystem with endemic flora and fauna, and ancient forests.',
    region: 'Lankaran',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '2,477m',
    image:
      'https://images.unsplash.com/photo-1680306684314-35d1a83f3ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtb3VudGFpbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 34,
    name: 'Pirqulu Mountain Views',
    description:
      'Accessible mountain lookout point offering breathtaking panoramas perfect for photography.',
    region: 'Ismayilli',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Photography',
    elevation: '1,290m',
    image:
      'https://images.unsplash.com/photo-1689825422854-8e3083c2fb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2NDIyNDQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 35,
    name: 'Goyazan Mountain',
    description:
      'Sacred mountain with historical significance and spiritual importance to local communities.',
    region: 'Goranboy',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '857m',
    image:
      'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHNjZW5pY3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 36,
    name: 'Dashkasan Alpine Zone',
    description: 'High-altitude alpine environment with unique geology and mineral deposits.',
    region: 'Dashkasan',
    difficulty: 'Difficult',
    season: ['Summer'],
    activity: 'Climbing',
    elevation: '3,200m',
    image:
      'https://images.unsplash.com/photo-1664648853617-127a94346600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBzdW1taXR8ZW58MXx8fHwxNzY0MjU2NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 37,
    name: 'Kelbajar Ridge',
    description: 'Dramatic mountain ridge with challenging terrain and spectacular scenic beauty.',
    region: 'Kelbajar',
    difficulty: 'Expert',
    season: ['Summer'],
    activity: 'Climbing',
    elevation: '3,904m',
    image:
      'https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 38,
    name: 'Basitchay Valley',
    description:
      'Lush green valley surrounded by mountains, ideal for multi-day camping and exploration.',
    region: 'Balakan',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Camping',
    elevation: '800m',
    image:
      'https://images.unsplash.com/photo-1607672390383-aa666b4761ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbXBpbmclMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 39,
    name: 'Aghsu Mountain Resort',
    description:
      'Developing resort area with modern facilities and access to pristine mountain trails.',
    region: 'Aghsu',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,100m',
    image:
      'https://images.unsplash.com/photo-1663841365399-bf1a469a16e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQzMTkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 40,
    name: 'Kapaz Mountain',
    description:
      'Iconic peak overlooking Goygol Lake, offering challenging climbs and incredible views.',
    region: 'Goygol',
    difficulty: 'Expert',
    season: ['Summer', 'Autumn'],
    activity: 'Climbing',
    elevation: '3,065m',
    image:
      'https://images.unsplash.com/photo-1689825422854-8e3083c2fb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2NDIyNDQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 41,
    name: 'Beshbarmag Mountain',
    description:
      'Sacred pilgrimage site with spiritual significance, offering panoramic views of the Caspian Sea and surrounding landscapes.',
    region: 'Siyazan',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '520m',
    image:
      'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHNjZW5pY3xlbnwxfHx8fDE3NjQzMTkwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 42,
    name: 'Gamigaya Petroglyph Trail',
    description:
      'Ancient rock art site in mountains featuring thousands of petroglyphs dating back to Bronze Age.',
    region: 'Ordubad',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Photography',
    elevation: '1,850m',
    image:
      'https://images.unsplash.com/photo-1635793889811-c342a365d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBtb3VudGFpbiUyMGZhbGx8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 43,
    name: 'Babadağ Mountain',
    description:
      'Sacred mountain near Baku with religious sites and excellent hiking trails for day trips.',
    region: 'Baku',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn', 'Winter'],
    activity: 'Hiking',
    elevation: '378m',
    image:
      'https://images.unsplash.com/photo-1663841365399-bf1a469a16e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjQzMTkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 44,
    name: 'Alinja Castle Heights',
    description:
      'Historic fortress on mountain peak in Nakhchivan, combining medieval architecture with stunning views.',
    region: 'Nakhchivan',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,415m',
    image:
      'https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 45,
    name: 'Khachmaz Forest Trails',
    description:
      'Lush forested mountain area with diverse flora and fauna, perfect for nature walks and camping.',
    region: 'Khachmaz',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Camping',
    elevation: '650m',
    image:
      'https://images.unsplash.com/photo-1607672390383-aa666b4761ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbXBpbmclMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 46,
    name: 'Astara Mountain Pass',
    description:
      'Border mountain region with subtropical climate, unique biodiversity, and scenic hiking paths.',
    region: 'Astara',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '2,100m',
    image:
      'https://images.unsplash.com/photo-1680306684314-35d1a83f3ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBtb3VudGFpbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 47,
    name: 'Masalli Highlands',
    description:
      'Tea plantation mountains with terraced landscapes and charming rural mountain villages.',
    region: 'Masalli',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Photography',
    elevation: '890m',
    image:
      'https://images.unsplash.com/photo-1689825422854-8e3083c2fb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2NDIyNDQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 48,
    name: 'Gobustan Mountain Reserve',
    description:
      'UNESCO World Heritage site with ancient rock carvings and mud volcanoes in mountainous terrain.',
    region: 'Gobustan',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn', 'Winter'],
    activity: 'Photography',
    elevation: '285m',
    image:
      'https://images.unsplash.com/photo-1635793889811-c342a365d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBtb3VudGFpbiUyMGZhbGx8ZW58MXx8fHwxNzY0MzE5MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 49,
    name: 'Qizqala Fortress Mountain',
    description:
      'Ancient fortress ruins perched on mountain ridge with commanding views of surrounding valleys.',
    region: 'Qakh',
    difficulty: 'Moderate',
    season: ['Spring', 'Summer', 'Autumn'],
    activity: 'Hiking',
    elevation: '1,680m',
    image:
      'https://images.unsplash.com/photo-1560165842-795101bfc497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHBlYWtzfGVufDF8fHx8MTc2NDI3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 50,
    name: 'Yanardag Flaming Mountain',
    description:
      'Natural gas fire mountain near Baku, featuring eternal flames and unique geological phenomena.',
    region: 'Baku',
    difficulty: 'Easy',
    season: ['Spring', 'Summer', 'Autumn', 'Winter'],
    activity: 'Photography',
    elevation: '116m',
    image:
      'https://images.unsplash.com/photo-1667297793700-db338d5ec68c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBtb3VudGFpbiUyMHNub3d8ZW58MXx8fHwxNzY0MzE5MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];
