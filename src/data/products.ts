import { Product } from '../types';
import { WOOD_FINISHES, FABRIC_SWATCHES } from './swatches';

// Import generated images
import heroLivingRoomImg from '../assets/images/hero_living_room_1784804151279.jpg';
import diningCollectionImg from '../assets/images/dining_collection_1784804162563.jpg';
import bedroomSanctuaryImg from '../assets/images/bedroom_sanctuary_1784804174221.jpg';
import lookbookImg from '../assets/images/lookbook_hotspot_1784804183436.jpg';

export const PRODUCTS: Product[] = [
  // ==================== LIVING ROOM ====================
  {
    id: 'ochre-signature-sectional',
    name: 'The Ochre Curved Sectional Sofa',
    subtitle: 'Sculptural 3-Piece Deep Comfort Sofa in Terracotta Velvet',
    category: 'living',
    priceINR: 185000,
    mrpINR: 215000,
    rating: 4.9,
    reviewCount: 48,
    image: heroLivingRoomImg,
    hoverImage: lookbookImg,
    images: [
      heroLivingRoomImg,
      lookbookImg,
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed as the centerpiece for thoughtful living spaces, our Ochre Sectional features organically curved silhouettes, high-resilience memory foam cushioning, and hand-tailored cotton velvet with kiln-dried solid teak inner framework engineered for lifetime durability.',
    features: [
      'Kiln-dried solid plantation teak internal structure',
      'High-density memory foam core wrapped in feather-down blend',
      'Stain-resistant performance velvet upholstery',
      'Modular 3-piece interlocking brass connector clips',
      '10-Year Frame Structural Warranty'
    ],
    materials: ['Solid Teak Wood', 'Cotton Velvet', 'High-Resilience Foam', 'Feather Blend'],
    dimensions: {
      widthCm: 290,
      depthCm: 160,
      heightCm: 82,
      seatingCapacity: 5,
      weightKg: 95
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-ochre-velvet': heroLivingRoomImg,
      'f-boucle-ivory': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      'f-linen-oatmeal': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'f-leather-saddle': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'f-sage-chenille': 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1200&q=80',
      'f-charcoal-weave': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'w-raw-teak': heroLivingRoomImg,
      'w-smoked-oak': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 5,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 10
  },
  {
    id: 'kanso-lounge-chair',
    name: 'Kanso Ochre Lounge Chair & Ottoman',
    subtitle: 'Ergonomic Accent Armchair with Brass Legs & Full Grain Leather',
    category: 'living',
    priceINR: 64500,
    mrpINR: 78000,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Inspired by Japanese minimalism and Nordic comfort. Features a gently reclined pitch, solid ash internal frame, and antiqued brass leg caps. Pairs with matching tufted ottoman.',
    features: [
      'Ergonomic 105° recline angle for optimal spine alignment',
      'Includes matching padded ottoman',
      'Antiqued brushed brass foot caps',
      'Available in full-grain leather or Belgian bouclé'
    ],
    materials: ['Solid Ash Wood', 'Brushed Brass', 'Italian Leather / Velvet'],
    dimensions: {
      widthCm: 85,
      depthCm: 90,
      heightCm: 88,
      seatingCapacity: 1,
      weightKg: 28
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-leather-saddle': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
      'f-sage-chenille': 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1200&q=80',
      'f-boucle-ivory': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'f-ochre-velvet': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 3,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 5
  },
  {
    id: 'terra-smoked-oak-credenza',
    name: 'Terra Smoked Oak Buffet & TV Credenza',
    subtitle: '4-Door Sideboard with Fluted Wood Slats and Marble Top Option',
    category: 'living',
    priceINR: 98000,
    mrpINR: 115000,
    rating: 4.7,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Artfully architectural. Hand-cut tambour slatted wooden doors curve seamlessly around rounded corners. Conceals adjustable interior shelving, soft-close Blum hinges, and integrated cord pass-throughs.',
    features: [
      'Slatted tambour solid oak doors with magnetic push catches',
      'Soft-close German Blum hardware',
      'Adjustable internal shelves and cable management slots',
      'Reinforced frame engineered to hold TVs up to 85 inches'
    ],
    materials: ['Solid European Oak', 'Brass Pulls', 'Smoked Finish'],
    dimensions: {
      widthCm: 200,
      depthCm: 48,
      heightCm: 75,
      weightKg: 68
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    swatchImageMap: {
      'w-smoked-oak': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      'w-raw-teak': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'w-honey-ash': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 4,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 5
  },
  {
    id: 'malabar-sheesham-armchair',
    name: 'Malabar Solid Sheesham & Cane Armchair',
    subtitle: 'Hand-Woven Natural Rattan & Solid Sheesham Accent Chair',
    category: 'living',
    priceINR: 34500,
    mrpINR: 42000,
    rating: 4.8,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A classic Indian mid-century accent chair. Frame is constructed from 100% kiln-dried solid Sheesham wood (Indian Rosewood) paired with genuine hand-knotted natural rattan backrest and a high-density removable seat cushion.',
    features: [
      '100% Solid Sheesham Timber construction',
      'Natural hand-woven cane backrest for breathable comfort',
      'Removable linen cushion cover with stain protection',
      'No compressed wood or artificial veneers'
    ],
    materials: ['Solid Sheesham Wood', 'Natural Rattan Cane', 'Belgian Linen Cushion'],
    dimensions: {
      widthCm: 68,
      depthCm: 72,
      heightCm: 82,
      seatingCapacity: 1,
      weightKg: 14
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-linen-oatmeal': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'f-leather-saddle': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 3,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 5
  },
  {
    id: 'jodhpur-nesting-coffee-tables',
    name: 'Jodhpur Carved Teak Coffee Table & Nesting Stools',
    subtitle: 'Organic Oval Solid Wood Coffee Table with Brass Accents',
    category: 'living',
    priceINR: 48000,
    mrpINR: 56000,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sculpted from thick slabs of solid plantation teak wood. Features smooth organic soft edges, hand-turned tapered tripod legs, and subtle brass inlay detailing.',
    features: [
      '100% Solid Teak Wood tabletop with natural grain variations',
      'Waterproof organic clear matte wax seal',
      'Tapered solid teak tripod legs',
      'Zero engineered wood or MDF'
    ],
    materials: ['Solid Teak Wood', 'Solid Brass Inlays'],
    dimensions: {
      widthCm: 120,
      depthCm: 70,
      heightCm: 42,
      weightKg: 24
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    swatchImageMap: {
      'w-raw-teak': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
      'w-smoked-oak': 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 3,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 10
  },
  {
    id: 'solstice-boucle-sofa',
    name: 'Solstice 3-Seater Fluted Teak & Bouclé Sofa',
    subtitle: 'Textured Ivory Bouclé Couch with Solid Teak Exposed Base',
    category: 'living',
    priceINR: 135000,
    mrpINR: 158000,
    rating: 4.9,
    reviewCount: 37,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A tactile masterpiece combining heavy Belgian bouclé looped fabric with an exposed solid teak wooden base frame. Deep plush seating designed for casual lounging.',
    features: [
      'Heavy looped Belgian bouclé stain-resistant upholstery',
      'Exposed solid teak wood perimeter base',
      'High-resilience foam wrapped in down feathers',
      '10-Year Frame Structural Warranty'
    ],
    materials: ['Solid Teak Wood', 'Belgian Bouclé', 'Feather Down'],
    dimensions: {
      widthCm: 220,
      depthCm: 98,
      heightCm: 80,
      seatingCapacity: 3,
      weightKg: 68
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-boucle-ivory': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      'f-ochre-velvet': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 4,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 10
  },

  // ==================== DINING ROOM ====================
  {
    id: 'solstice-teak-dining-table',
    name: 'Solstice Reclaimed Teak 8-Seater Dining Table',
    subtitle: 'Hand-Carved Solid Wood Dining Table with Trestle Base',
    category: 'dining',
    priceINR: 128000,
    mrpINR: 145000,
    rating: 4.8,
    reviewCount: 36,
    image: diningCollectionImg,
    hoverImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
    images: [
      diningCollectionImg,
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A monument of slow craft. Each Solstice Dining Table is handcrafted from 80-year-old reclaimed teak beams in Rajasthan. Features chamfered edges and a thick 5cm solid wood top sealed with organic clear matte oil.',
    features: [
      '100% Solid Reclaimed Teak Wood construction',
      'Beveled top edge with mortise-and-tenon traditional joinery',
      'Water and heat-resistant eco-friendly matte protective sealer',
      'Seats 8 guests comfortably with ample legroom',
      'Includes brass maker badge underneath top'
    ],
    materials: ['Reclaimed Teak Wood', 'Solid Brass Inlays'],
    dimensions: {
      widthCm: 240,
      depthCm: 100,
      heightCm: 76,
      seatingCapacity: 8,
      weightKg: 82
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    swatchImageMap: {
      'w-raw-teak': diningCollectionImg,
      'w-smoked-oak': 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
      'w-honey-ash': 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 7,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 10
  },
  {
    id: 'fluted-teak-dining-chairs-set',
    name: 'Fluted Solid Teak Dining Chairs (Set of 2)',
    subtitle: 'Hand-Carved Curved Back Dining Chairs in Bouclé Upholstery',
    category: 'dining',
    priceINR: 38000,
    mrpINR: 45000,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sculptural dining comfort. Features a gently curved fluted solid teak wood backrest and plush high-resilience foam seat upholstered in textured ivory bouclé yarn.',
    features: [
      'Set of 2 dining chairs handcrafted from solid teak timber',
      'Mortise-and-tenon joints tested for 150 kg weight tolerance',
      'Padded seat in stain-resistant Belgian bouclé',
      '100% Solid timber frame with organic wax polish'
    ],
    materials: ['Solid Teak Wood', 'Belgian Bouclé Fabric'],
    dimensions: {
      widthCm: 52,
      depthCm: 56,
      heightCm: 84,
      seatingCapacity: 2,
      weightKg: 18
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-boucle-ivory': 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
      'f-linen-oatmeal': 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 4,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 10
  },
  {
    id: 'rajasthan-carved-sideboard',
    name: 'Rajasthan Hand-Carved Teak 4-Door Sideboard',
    subtitle: 'Buffet Cabinet with Traditional Geometric Relief Carvings',
    category: 'dining',
    priceINR: 88000,
    mrpINR: 102000,
    rating: 4.9,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An ode to Marwar carving traditions. Solid teak wood panels hand-carved with geometric diamond motifs. Stores crockery, wine glasses, and linens with soft-close interior drawers.',
    features: [
      '100% Solid Teak Wood structure with zero MDF',
      '4 doors concealing 2 adjustable internal shelves',
      'Solid brass antique pull ring hardware',
      'Fitted with felt bottom drawer inserts for fine silver'
    ],
    materials: ['Solid Teak Wood', 'Solid Brass Hardware'],
    dimensions: {
      widthCm: 180,
      depthCm: 45,
      heightCm: 85,
      weightKg: 62
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    swatchImageMap: {
      'w-raw-teak': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'w-smoked-oak': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 5,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 10
  },
  {
    id: 'jodhpur-sheesham-dining-set',
    name: 'Jodhpur Solid Sheesham 6-Seater Dining Set',
    subtitle: 'Table + 4 Chairs + 1 Solid Wood Bench in Honey Finish',
    category: 'dining',
    priceINR: 96000,
    mrpINR: 112000,
    rating: 4.8,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
    hoverImage: diningCollectionImg,
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
      diningCollectionImg
    ],
    description: 'A complete family dining collection crafted from kiln-dried solid Sheesham wood. Celebrates prominent dark streak graining and includes a solid wood bench for versatile seating.',
    features: [
      'Includes 180cm Dining Table, 4 Cushioned Chairs, and 1 Long Bench',
      'Solid Sheesham wood with protective clear lacquer finish',
      'Resistant to food spills and hot cookware',
      '100% Solid timber construction'
    ],
    materials: ['Solid Sheesham Wood', 'Linen Upholstery'],
    dimensions: {
      widthCm: 180,
      depthCm: 90,
      heightCm: 76,
      seatingCapacity: 6,
      weightKg: 78
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    inStock: true,
    leadTimeDays: 4,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 5
  },

  // ==================== BEDROOM ====================
  {
    id: 'sanctuary-canopy-platform-bed',
    name: 'Sanctuary Low-Profile Teak Canopy Bed',
    subtitle: 'King Size Minimalist Solid Teak Platform Bed with Linen Headboard',
    category: 'bedroom',
    priceINR: 142000,
    mrpINR: 168000,
    rating: 5.0,
    reviewCount: 29,
    image: bedroomSanctuaryImg,
    hoverImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    images: [
      bedroomSanctuaryImg,
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Transform your bedroom into a soothing hotel-like retreat. The Sanctuary Canopy Bed pairs slender solid teak vertical posts with an upholstered organic Belgian linen padded headboard for supreme support.',
    features: [
      'Solid Teak Canopy Frame with smooth hand-sanded posts',
      'Removable and washable organic Belgian linen headboard cover',
      'Noise-free solid pine slat system supporting up to 450 kg',
      'Low VOC non-toxic wood stain',
      'Quick 30-minute white glove setup'
    ],
    materials: ['Solid Teak Wood', 'Organic Belgian Linen', 'Kiln-Dried Pine Slats'],
    dimensions: {
      widthCm: 195,
      depthCm: 215,
      heightCm: 200,
      seatingCapacity: 2,
      weightKg: 90
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-linen-oatmeal': bedroomSanctuaryImg,
      'f-boucle-ivory': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 6,
    isBestseller: true,
    isNewArrival: true,
    warrantyYears: 10
  },
  {
    id: 'rajasthan-carved-dresser',
    name: 'Rajasthan Hand-Carved Solid Teak 6-Drawer Dresser',
    subtitle: 'Artisan Carved Fluted Chest of Drawers with Solid Brass Knobs',
    category: 'bedroom',
    priceINR: 92000,
    mrpINR: 110000,
    rating: 5.0,
    reviewCount: 23,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Masterwork of Jodhpur woodworking. Constructed entirely of solid teak timber with hand-carved subtle fluted drawer faces. Features full-extension solid wood drawer runners and soft magnetic closures.',
    features: [
      '100% Solid Teak Wood carcass and drawer boxes',
      '0% Compressed Wood / MDF / Particle board guaranteed',
      'Solid brass cast knobs with antique patina',
      'Includes anti-tip safety wall mount'
    ],
    materials: ['Solid Plantation Teak', 'Solid Brass Hardware'],
    dimensions: {
      widthCm: 140,
      depthCm: 50,
      heightCm: 90,
      weightKg: 74
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    swatchImageMap: {
      'w-raw-teak': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'w-smoked-oak': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 6,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 10
  },
  {
    id: 'fluted-teak-nightstands-pair',
    name: 'Fluted Solid Teak Bedside Tables (Pair of 2)',
    subtitle: 'Nightstands with Soft-Close Drawers & Brass Pulls',
    category: 'bedroom',
    priceINR: 32000,
    mrpINR: 38000,
    rating: 4.9,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Set of two solid teak nightstands featuring fluted front details, soft-closing drawers, and felt-lined interiors for jewelry and watches.',
    features: [
      'Pair of 2 nightstands in 100% solid teak timber',
      'Soft-close concealed undermount runners',
      'Solid brass hardware knobs',
      'Includes wire routing port at rear'
    ],
    materials: ['Solid Teak Wood', 'Solid Brass'],
    dimensions: {
      widthCm: 50,
      depthCm: 42,
      heightCm: 55,
      weightKg: 16
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    inStock: true,
    leadTimeDays: 3,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 10
  },
  {
    id: 'kanso-upholstered-platform-bed',
    name: 'Kanso Low-Rider Solid Wood Bed with Padded Headboard',
    subtitle: 'King Size Japanese Minimalist Bed Frame in Terracotta Linen',
    category: 'bedroom',
    priceINR: 118000,
    mrpINR: 138000,
    rating: 4.9,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    hoverImage: bedroomSanctuaryImg,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      bedroomSanctuaryImg
    ],
    description: 'A floating low-rider bed frame crafted from solid ash wood. Features an angled padded headboard wrapped in tactile terracotta linen fabric.',
    features: [
      'Solid ash wood platform with floating base look',
      'Padded headboard inclined at comfortable reading angle',
      'Slatted pine mattress support with center beam',
      'Zero squeak construction'
    ],
    materials: ['Solid Ash Wood', 'Terracotta Linen', 'Pine Slats'],
    dimensions: {
      widthCm: 190,
      depthCm: 210,
      heightCm: 95,
      seatingCapacity: 2,
      weightKg: 78
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-linen-oatmeal': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'f-ochre-velvet': bedroomSanctuaryImg
    },
    inStock: true,
    leadTimeDays: 5,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 10
  },

  // ==================== OFFICE ====================
  {
    id: 'solstice-executive-desk',
    name: 'Solstice Solid Teak Executive Writing Desk',
    subtitle: '100% Solid Plantation Teak Office Desk with Antique Brass Hardware',
    category: 'office',
    priceINR: 82000,
    mrpINR: 96000,
    rating: 4.9,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed for executive focus and heirloom durability. Handcrafted entirely from solid plantation teak wood with mortise-and-tenon joinery. Zero MDF or particle board used. Features 3 soft-closing drawers and integrated solid brass cord grommets.',
    features: [
      '100% Solid Teak Wood Frame & Desktop (0% MDF or compressed board)',
      'Hand-turned solid teak legs with adjustable floor levelers',
      'Solid brass cord organizer port and brass drawer pulls',
      '10-Year Solid Frame Guarantee against warp and pests'
    ],
    materials: ['Solid Plantation Teak', 'Solid Brass Hardware'],
    dimensions: {
      widthCm: 160,
      depthCm: 75,
      heightCm: 76,
      weightKg: 58
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    swatchImageMap: {
      'w-raw-teak': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
      'w-smoked-oak': 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 4,
    isBestseller: true,
    isNewArrival: true,
    warrantyYears: 10
  },
  {
    id: 'zenith-solid-teak-bookcase',
    name: 'Zenith Solid Teak 5-Tier Open Bookcase',
    subtitle: 'Architectural Display Shelf in Solid Reclaimed Teak & Brass Supports',
    category: 'office',
    priceINR: 68000,
    mrpINR: 79000,
    rating: 4.9,
    reviewCount: 17,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An open airy display unit designed to showcase art objects and design monographs. Crafted with 3.5cm thick solid teak timber planks supported by brushed solid brass structural uprights.',
    features: [
      '3.5cm thick solid teak wood shelves (100% solid timber guaranteed)',
      'Heavy-gauge antiqued solid brass side tension rods',
      'Includes wall anchoring kit for earthquake stability',
      'Each tier holds up to 45 kg'
    ],
    materials: ['Solid Reclaimed Teak', 'Solid Brass Frame'],
    dimensions: {
      widthCm: 110,
      depthCm: 40,
      heightCm: 190,
      weightKg: 52
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    inStock: true,
    leadTimeDays: 5,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 10
  },
  {
    id: 'kanso-leather-executive-chair',
    name: 'Kanso Solid Walnut & Cognac Leather Swivel Desk Chair',
    subtitle: 'Ergonomic Mid-Century Office Armchair with Italian Leather',
    category: 'office',
    priceINR: 42000,
    mrpINR: 49000,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Combines bent walnut plywood shell with supple top-grain cognac leather cushions. Features 360-degree pneumatic swivel and tilt mechanism with solid brass star base.',
    features: [
      'Bent solid walnut veneer & teak core frame',
      'Italian full-grain saddle leather upholstery',
      'Silent smooth-rolling floor safe casters',
      'Pneumatic height adjustment (44-54 cm)'
    ],
    materials: ['Solid Walnut Wood', 'Top-Grain Leather', 'Brass Star Base'],
    dimensions: {
      widthCm: 65,
      depthCm: 65,
      heightCm: 92,
      seatingCapacity: 1,
      weightKg: 19
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    swatchImageMap: {
      'f-leather-saddle': 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1200&q=80',
      'f-sage-chenille': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
    },
    inStock: true,
    leadTimeDays: 3,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 5
  },

  // ==================== OUTDOOR ====================
  {
    id: 'nordic-woven-outdoor-set',
    name: 'Aria Teak & All-Weather Woven Outdoor Set',
    subtitle: '2 Loungers + Coffee Table in Weatherproof Teak & Olefin Cord',
    category: 'outdoor',
    priceINR: 112000,
    mrpINR: 135000,
    rating: 4.9,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Built to withstand monsoons, intense sun, and coastal humidity. Made from grade-A marine teak timber and UV-resistant hand-woven Italian synthetic cord with Sunbrella quick-dry foam cushions.',
    features: [
      'Grade-A Teak wood naturally rich in protective organic oils',
      'Sunbrella water-repellent performance fabric cushions',
      'Hand-woven weather-proof Italian rope backrest',
      'Includes protective rain covers'
    ],
    materials: ['Grade-A Teak', 'Sunbrella Fabric', 'Olefin Rope'],
    dimensions: {
      widthCm: 180,
      depthCm: 85,
      heightCm: 72,
      seatingCapacity: 2,
      weightKg: 42
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    inStock: true,
    leadTimeDays: 5,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 5
  },
  {
    id: 'solstice-teak-sun-lounger',
    name: 'Solstice Grade-A Teak Reclining Sun Lounger',
    subtitle: 'Poolside Adjustable Deck Chair with Wheels & Sunbrella Cushion',
    category: 'outdoor',
    priceINR: 48000,
    mrpINR: 58000,
    rating: 4.9,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Crafted for resort-quality outdoor relaxation. 5-position reclining backrest with slide-out drink tray and rear rubber-tread teak wheels.',
    features: [
      'Grade-A solid marine teak frame',
      '5-position back recline mechanism',
      'Integrated pull-out side drink tray',
      'Mildew and UV resistant Sunbrella cushion included'
    ],
    materials: ['Grade-A Teak', 'Sunbrella Fabric', 'Stainless Steel Hardware'],
    dimensions: {
      widthCm: 70,
      depthCm: 200,
      heightCm: 35,
      weightKg: 26
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: FABRIC_SWATCHES,
    inStock: true,
    leadTimeDays: 4,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 5
  },
  {
    id: 'malabar-teak-garden-bench',
    name: 'Malabar Solid Teak Slatted Garden Bench (3-Seater)',
    subtitle: 'Classic Park & Patio Bench in Weatherproof Teak Wood',
    category: 'outdoor',
    priceINR: 36000,
    mrpINR: 42000,
    rating: 4.8,
    reviewCount: 15,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An enduring garden classic. Handcrafted with traditional mortise-and-tenon teak joints that naturally weather over time to an elegant silver patina.',
    features: [
      '100% Solid Plantation Teak construction',
      'Deep contoured seat slats for ergonomic back support',
      'Resistant to humidity, rain, and rot',
      'Holds up to 300 kg'
    ],
    materials: ['Solid Teak Wood'],
    dimensions: {
      widthCm: 150,
      depthCm: 60,
      heightCm: 90,
      seatingCapacity: 3,
      weightKg: 24
    },
    availableWoodFinishes: WOOD_FINISHES,
    availableFabrics: [],
    inStock: true,
    leadTimeDays: 3,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 5
  },

  // ==================== LIGHTING & RUGS ====================
  {
    id: 'artisan-woolen-tufted-rug',
    name: 'Aura Hand-Tufted Wool & Jute Area Rug (8x10 ft)',
    subtitle: 'Organic Terracotta and Warm Ivory Textured Floor Rug',
    category: 'lighting-rugs',
    priceINR: 38500,
    mrpINR: 46000,
    rating: 4.9,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Hand-woven by master artisan weavers in Bhadohi using 100% New Zealand wool blended with natural Indian jute. Offers rich underfoot tactile comfort and subtle tonal variation.',
    features: [
      '100% Un-dyed New Zealand Wool and Jute fibers',
      'Plush 15mm pile height with high knot density',
      'Natural latex backing with canvas binding',
      'Shed-resistant treated yarn'
    ],
    materials: ['New Zealand Wool', 'Natural Jute', 'Cotton Backing'],
    dimensions: {
      widthCm: 240,
      depthCm: 300,
      heightCm: 1.8,
      weightKg: 18
    },
    availableWoodFinishes: [],
    availableFabrics: [],
    inStock: true,
    leadTimeDays: 2,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 3
  },
  {
    id: 'alabaster-ceramic-table-lamp',
    name: 'Ochre Terra Ceramic & Linen Table Lamp',
    subtitle: 'Hand-Thrown Terracotta Base with Unbleached Linen Shade',
    category: 'lighting-rugs',
    priceINR: 14500,
    mrpINR: 18000,
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Brings warm ambient illumination to bedside tables or sideboards. Hand-thrown terracotta clay base with raw textured reactive glaze paired with a drum shade in coarse Belgian linen.',
    features: [
      'Handcrafted pottery clay base with reactive ochre glaze',
      'Included warm LED dimmable filament bulb (2700K)',
      'Brass rotary inline dimmer switch on braided fabric cord',
      'E27 socket compatible'
    ],
    materials: ['Terracotta Clay', 'Natural Linen', 'Brass'],
    dimensions: {
      widthCm: 38,
      depthCm: 38,
      heightCm: 58,
      weightKg: 4.5
    },
    availableWoodFinishes: [],
    availableFabrics: [],
    inStock: true,
    leadTimeDays: 2,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 2
  },
  {
    id: 'solstice-brass-opal-pendant',
    name: 'Fluted Solid Brass & Opal Glass Tiered Chandelier',
    subtitle: 'Art Deco Modern Brass Pendant Light with Frosted Globes',
    category: 'lighting-rugs',
    priceINR: 28500,
    mrpINR: 34000,
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Statement dining room chandelier crafted from hand-spun solid brass arms holding mouth-blown opal glass diffusers. Casts soft glare-free ambient light.',
    features: [
      'Solid heavy brass structure with unlacquered hand-brushed finish',
      'Mouth-blown frosted opal glass globes',
      'Adjustable drop rod length (up to 120cm)',
      'Compatible with smart dimmable LED bulbs'
    ],
    materials: ['Solid Brass', 'Opal Glass'],
    dimensions: {
      widthCm: 80,
      depthCm: 80,
      heightCm: 65,
      weightKg: 8.5
    },
    availableWoodFinishes: [],
    availableFabrics: [],
    inStock: true,
    leadTimeDays: 3,
    isBestseller: true,
    isNewArrival: false,
    warrantyYears: 3
  },
  {
    id: 'vintage-terracotta-runner-rug',
    name: 'Aura Terracotta & Warm Cream Hand-Knot Runner Rug (2.5x8 ft)',
    subtitle: 'Traditional Hallway & Kitchen Runner Rug in Pure Wool',
    category: 'lighting-rugs',
    priceINR: 19500,
    mrpINR: 24000,
    rating: 4.9,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Woven with traditional Marwar motifs in warm terracotta, ochre, and unbleached cream tones. High knot density ensures exceptional longevity in busy hallways.',
    features: [
      '100% Hand-knotted New Zealand Wool',
      'Low 10mm pile ideal for easy door clearance',
      'Natural organic plant dyes',
      'Includes non-slip felt rug pad'
    ],
    materials: ['New Zealand Wool', 'Cotton Foundation'],
    dimensions: {
      widthCm: 75,
      depthCm: 240,
      heightCm: 1.2,
      weightKg: 6.8
    },
    availableWoodFinishes: [],
    availableFabrics: [],
    inStock: true,
    leadTimeDays: 2,
    isBestseller: false,
    isNewArrival: true,
    warrantyYears: 3
  }
];

export const LOOKBOOK_HOTSPOTS = [
  {
    id: 'pin-sectional',
    xPercent: 40,
    yPercent: 62,
    productId: 'ochre-signature-sectional',
    label: 'Curved Sectional Sofa (₹1,85,000)'
  },
  {
    id: 'pin-credenza',
    xPercent: 82,
    yPercent: 48,
    productId: 'terra-smoked-oak-credenza',
    label: 'Terra Smoked Credenza (₹98,000)'
  },
  {
    id: 'pin-lamp',
    xPercent: 22,
    yPercent: 32,
    productId: 'alabaster-ceramic-table-lamp',
    label: 'Terracotta Lamp (₹14,500)'
  },
  {
    id: 'pin-rug',
    xPercent: 55,
    yPercent: 88,
    productId: 'artisan-woolen-tufted-rug',
    label: 'Hand-Tufted Wool Rug (₹38,500)'
  }
];
