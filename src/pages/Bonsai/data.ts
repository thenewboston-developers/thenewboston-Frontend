export interface BonsaiTree {
  age: string;
  careLevel: string;
  description: string;
  highlights: string[];
  id: string;
  images: string[];
  name: string;
  origin: string;
  pot: string;
  price: string;
  size: string;
  species: string;
  style: string;
  teaser: string;
  watering: string;
}

export const bonsaiTrees: BonsaiTree[] = [
  {
    age: 'Estimated 120 years',
    careLevel: 'Intermediate',
    description:
      'Trained in the informal upright style, this pine leans gently to mimic how harsh coastal winds carve their way through mountain groves. The canopy was thinned this winter to expose the layered pads and elegant branching structure.',
    highlights: [
      'Hand-wired copper clips for subtle movement',
      'Imported Tokoname clay pot with custom drainage mesh',
      'Sphagnum moss mulched surface to retain moisture',
      'Accompanied by provenance certificate and seasonal care notes',
    ],
    id: 'ancient-pine',
    images: [
      'https://placehold.co/900x600/png?text=Ancient+Pine+1',
      'https://placehold.co/900x600/png?text=Ancient+Pine+2',
      'https://placehold.co/900x600/png?text=Ancient+Pine+3',
      'https://placehold.co/900x600/png?text=Ancient+Pine+4',
    ],
    name: 'Ancient Coast Pine',
    origin: 'Collected along the Pacific Northwest 30 years ago',
    pot: 'Unglazed Tokoname oval, 18in',
    price: '4,600 TNBC',
    size: '28in tall, 24in wide',
    species: 'Pinus thunbergii (Japanese Black Pine)',
    style: 'Informal upright',
    teaser: 'A windswept pine with decades of ramification and a warm patina on the bark.',
    watering: 'Soak thoroughly every 4–5 days in growing season',
  },
  {
    age: 'Estimated 65 years',
    careLevel: 'Beginner friendly',
    description:
      'This maple is styled in a graceful broom silhouette with a dense crown of tiny leaves. The nebari flares evenly on all sides, and the trunk features subtle taper emphasized by soft green moss at the soil line.',
    highlights: [
      'Custom glazed ceramic inspired by vintage Kutani ware',
      'Organic akadama mix with added pumice for drainage',
      'Includes seasonal wiring plan and nebari maintenance tips',
      'Ships in a humidity-controlled crate with reusable anchors',
    ],
    id: 'mossy-maple',
    images: [
      'https://placehold.co/900x600/png?text=Mossy+Maple+1',
      'https://placehold.co/900x600/png?text=Mossy+Maple+2',
      'https://placehold.co/900x600/png?text=Mossy+Maple+3',
      'https://placehold.co/900x600/png?text=Mossy+Maple+4',
    ],
    name: 'Mossy Autumn Maple',
    origin: 'Field grown in Kyoto and refined in-house for 12 years',
    pot: 'Glazed oval with carved feet, 16in',
    price: '2,850 TNBC',
    size: '22in tall, 20in wide',
    species: 'Acer palmatum (Japanese Maple)',
    style: 'Broom style',
    teaser: 'A fiery maple with soft moss at the base and a perfectly symmetrical canopy.',
    watering: 'Light watering every other day; prefers afternoon shade',
  },
];
