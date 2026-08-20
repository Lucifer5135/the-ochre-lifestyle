export type CategoryId = 'all' | 'living' | 'dining' | 'bedroom' | 'office' | 'outdoor' | 'lighting-rugs';

export interface Swatch {
  id: string;
  name: string;
  category: 'fabric' | 'wood' | 'leather';
  hex: string;
  textureImage?: string;
  description: string;
}

export interface ProductDimension {
  widthCm: number;
  depthCm: number;
  heightCm: number;
  seatingCapacity?: number;
  weightKg: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  priceINR: number;
  mrpINR: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage?: string;
  images: string[];
  description: string;
  features: string[];
  materials: string[];
  dimensions: ProductDimension;
  availableWoodFinishes: Swatch[];
  availableFabrics: Swatch[];
  swatchImageMap?: Record<string, string>;
  inStock: boolean;
  leadTimeDays: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  warrantyYears: number;
}

export interface CartItem {
  product: Product;
  selectedWoodFinish?: Swatch;
  selectedFabric?: Swatch;
  quantity: number;
  includeWhiteGlove: boolean;
}

export interface RoomPreset {
  id: string;
  name: string;
  type: 'living' | 'bedroom' | 'dining';
  dimensionsMeter: { width: number; length: number };
  gridSize: { cols: number; rows: number };
}

export interface PlacedRoomItem {
  id: string; // unique instance id
  productId: string;
  x: number; // grid x coordinate
  y: number; // grid y coordinate
  rotation: 0 | 90 | 180 | 270;
  woodFinishId?: string;
  fabricId?: string;
}

export interface HotspotPin {
  id: string;
  xPercent: number;
  yPercent: number;
  productId: string;
  label: string;
}

export interface FilterState {
  category: CategoryId;
  priceRange: [number, number];
  materials: string[];
  colors: string[];
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}

export interface StylistAppointment {
  name: string;
  email: string;
  phone: string;
  city: string;
  consultationType: 'virtual' | 'in-store' | 'home-visit';
  preferredDate: string;
  preferredTime: string;
  notes: string;
  roomType: string;
}

export interface CustomFurnitureRequest {
  requestId: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  itemType: 'sectional' | 'dining-table' | 'canopy-bed' | 'credenza' | 'accent-chair' | 'desk' | 'wardrobe' | 'bar-cabinet';
  customWidthCm: number;
  customDepthCm: number;
  customHeightCm: number;
  woodSpecies: 'solid-teak' | 'solid-sheesham' | 'white-oak' | 'solid-ash' | 'walnut-hardwood';
  upholsteryFabric: 'ochre-velvet' | 'belgian-boucle' | 'washed-linen' | 'saddle-leather' | 'none';
  hasBrassAccents: boolean;
  hasFlutedSlats: boolean;
  specialInstructions: string;
  estimatedPriceINR: number;
  submittedAt: string;
  status: 'Draft' | 'Submitted for Artisan Quote' | 'CAD Drawing In Progress';
}

export interface TrackingStep {
  title: string;
  description: string;
  date?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface OrderTrackInfo {
  orderId: string;
  customerName: string;
  phone: string;
  orderDate: string;
  estimatedDeliveryDate: string;
  currentStepIndex: number;
  deliveryAddress: string;
  carrierName: string;
  trackingNumber: string;
  steps: TrackingStep[];
  items: {
    name: string;
    finish: string;
    qty: number;
    priceINR: number;
    image: string;
  }[];
  isCustomOrder?: boolean;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  acceptedAt?: string;
}

export interface SwatchOrderRecord {
  orderId: string;
  customerName: string;
  phone: string;
  pincode: string;
  address: string;
  swatches: Swatch[];
  status: 'Pending Dispatch' | 'Assembled' | 'In Transit via Air Express' | 'Delivered';
  requestedAt: string;
  trackingNumber?: string;
  carrier?: string;
}

export interface StylistBookingRecord {
  id: string;
  customerName: string;
  phone: string;
  roomType: string;
  consultationType: 'virtual' | 'in-store' | 'home-visit';
  preferredDate: string;
  preferredTime: string;
  assignedStylist?: string;
  notes: string;
  status: 'Pending Review' | 'Confirmed & Scheduled' | 'Consultation In Progress' | 'Completed' | 'Follow-up Sent';
  createdAt: string;
}

export interface WorkshopActivityLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
  type: 'order' | 'inventory' | 'bespoke' | 'stylist' | 'system';
}

export interface DailySalesMetric {
  date: string;
  shortDate: string;
  grossSalesINR: number;
  netSalesINR: number;
  ordersCount: number;
  aovINR: number;
  bespokeRevenueINR: number;
  storefrontRevenueINR: number;
}

export interface DailyTrafficMetric {
  date: string;
  shortDate: string;
  websiteVisits: number;
  pageViews: number;
  uniqueVisitors: number;
  bounceRatePercent: number;
  conversions: number;
  conversionRatePercent: number;
  cartAdditions: number;
}

export interface CategoryRevenueMetric {
  category: string;
  name: string;
  revenueINR: number;
  ordersCount: number;
  percentage: number;
  color: string;
}

export interface TrafficSourceMetric {
  source: string;
  visits: number;
  percentage: number;
  conversionRate: number;
  revenueINR: number;
}

export interface FinancialSummary {
  grossRevenueINR: number;
  netRevenueINR: number;
  gstCollectedINR: number;
  whiteGloveLogisticsINR: number;
  totalOrders: number;
  averageOrderValueINR: number;
  bespokeRevenueINR: number;
  monthOverMonthGrowth: number;
  projectedMonthEndINR: number;
}

