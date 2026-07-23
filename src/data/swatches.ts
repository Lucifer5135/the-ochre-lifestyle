import { Swatch } from '../types';

export const WOOD_FINISHES: Swatch[] = [
  {
    id: 'w-raw-teak',
    name: 'Raw Plantation Teak',
    category: 'wood',
    hex: '#A26D3F',
    description: 'Sustainably harvested teak with natural warm grain and matte protective seal.',
  },
  {
    id: 'w-smoked-oak',
    name: 'Smoked Espresso Oak',
    category: 'wood',
    hex: '#3E2F26',
    description: 'Deep brown European oak cured with natural smoked oils for dark rich tone.',
  },
  {
    id: 'w-honey-ash',
    name: 'Honey Amber Ash',
    category: 'wood',
    hex: '#C59A63',
    description: 'Light, golden wood finish emphasizing prominent wavy grain patterns.',
  },
  {
    id: 'w-burnt-ochre',
    name: 'Burnt Ochre Stain',
    category: 'wood',
    hex: '#8C4825',
    description: 'Signature Ochre Lifestyle stained finish highlighting terracotta undertones.',
  },
];

export const FABRIC_SWATCHES: Swatch[] = [
  {
    id: 'f-ochre-velvet',
    name: 'Ochre Terracotta Velvet',
    category: 'fabric',
    hex: '#C17D3C',
    description: 'Plush stain-resistant cotton velvet with rich, warm terracotta luster.',
  },
  {
    id: 'f-boucle-ivory',
    name: 'Belgian Bouclé Ivory',
    category: 'fabric',
    hex: '#F2ECE1',
    description: 'Heavy textured looped wool-blend yarn in soft warm off-white cream.',
  },
  {
    id: 'f-linen-oatmeal',
    name: 'Washed Belgian Linen Oatmeal',
    category: 'fabric',
    hex: '#D1C2A5',
    description: '100% natural organic flax linen pre-washed for effortless casual elegance.',
  },
  {
    id: 'f-leather-saddle',
    name: 'Full-Grain Saddle Brown Leather',
    category: 'leather',
    hex: '#6E4528',
    description: 'Italian full-grain cognac leather that develops a rich vintage patina over time.',
  },
  {
    id: 'f-sage-chenille',
    name: 'Earthy Sage Chenille',
    category: 'fabric',
    hex: '#7A8471',
    description: 'Ultra-soft durable chenille weave with muted botanical olive-sage notes.',
  },
  {
    id: 'f-charcoal-weave',
    name: 'Warm Espresso Charcoal Weave',
    category: 'fabric',
    hex: '#332C2A',
    description: 'High-durability heathered dark weave resistant to sunlight and pet wear.',
  },
];

export const ALL_SWATCHES = [...FABRIC_SWATCHES, ...WOOD_FINISHES];
