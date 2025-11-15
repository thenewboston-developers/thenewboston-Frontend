export interface BonsaiTree {
  description: string;
  highlights: string[];
  id: string;
  images: string[];
  name: string;
  origin: string;
  pot: string;
  price: number;
  size: string;
  species: string;
  style: string;
  teaser: string;
}

export const bonsaiTrees: BonsaiTree[] = [
  {
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
    price: 4600,
    size: '28in tall, 24in wide',
    species: 'Japanese Black Pine',
    style: 'Informal upright',
    teaser: 'A windswept pine with decades of ramification and a warm patina on the bark.',
  },
  {
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
    price: 2850,
    size: '22in tall, 20in wide',
    species: 'Japanese Maple',
    style: 'Broom style',
    teaser: 'A fiery maple with soft moss at the base and a perfectly symmetrical canopy.',
  },
  {
    description:
      'Styled as a raft forest, this juniper showcases multiple trunks rising from a single, dramatic root mass that was set horizontally decades ago. Cascading foliage pads mirror alpine ledges, and the deadwood spine has been lime-sulfur treated for a bleached contrast.',
    highlights: [
      'Hand-carved shari running the full length of the raft',
      'Mossed river stones to suggest a mountain stream',
      'Balanced planting angle supported by hidden anchor wires',
      'Ships with humidity dome and detailed styling history',
    ],
    id: 'driftwood-juniper',
    images: [
      'https://placehold.co/900x600/png?text=Driftwood+Juniper+1',
      'https://placehold.co/900x600/png?text=Driftwood+Juniper+2',
      'https://placehold.co/900x600/png?text=Driftwood+Juniper+3',
      'https://placehold.co/900x600/png?text=Driftwood+Juniper+4',
    ],
    name: 'Driftwood Juniper Grove',
    origin: 'Air-layered from a garden specimen and refined for 18 years',
    pot: 'Custom slab with copper feet, 24in',
    price: 5200,
    size: '34in long, 16in tall',
    species: 'Shimpaku Juniper',
    style: 'Raft forest',
    teaser: 'A dramatic juniper raft with bleached deadwood and low, flowing foliage pads.',
  },
];
