import { 
  Product, 
  OrderTrackInfo, 
  CustomFurnitureRequest, 
  StylistBookingRecord, 
  SwatchOrderRecord, 
  WorkshopActivityLog,
  DailySalesMetric,
  DailyTrafficMetric,
  CategoryRevenueMetric,
  TrafficSourceMetric,
  FinancialSummary
} from '../types';
import { PRODUCTS } from '../data/products';
import { safeStorage } from './security';

const DEFAULT_ORDERS: Record<string, OrderTrackInfo> = {
  'OCHRE-8921': {
    orderId: 'OCHRE-8921',
    customerName: 'Ananya Sharma',
    phone: '+91 98192 38472',
    orderDate: '18 Jul 2026',
    estimatedDeliveryDate: '26 Jul 2026',
    currentStepIndex: 2,
    deliveryAddress: '402 Sunset Towers, Worli Sea Face, Mumbai - 400018',
    carrierName: 'The Ochre White-Glove Direct Logistics',
    trackingNumber: 'OG-MUM-884912',
    isCustomOrder: false,
    items: [
      {
        name: 'The Ochre Curved Sectional Sofa',
        finish: 'Raw Plantation Teak / Terracotta Velvet',
        qty: 1,
        priceINR: 185000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Aura Hand-Tufted Wool & Jute Area Rug',
        finish: '8x10 ft Ivory/Terracotta',
        qty: 1,
        priceINR: 38500,
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=300&q=80',
      },
    ],
    steps: [
      {
        title: 'Order Confirmed & Solid Timber Selected',
        description: 'Kiln-dried plantation teak planks hand-selected for zero grain flaws.',
        date: '18 Jul 2026, 10:30 AM',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Master Artisan Hand-Carving & Joinery',
        description: 'Frame crafted using mortise-and-tenon joinery in Jodhpur workshop.',
        date: '21 Jul 2026, 04:15 PM',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Upholstery & High-Resilience Cushioning',
        description: 'Cotton velvet upholstery tailored with stain-resistant protective coat.',
        date: '23 Jul 2026, 09:00 AM',
        isCompleted: false,
        isCurrent: true,
      },
      {
        title: 'Quality Inspection & Wooden Crating',
        description: '100% Solid frame stress-test audit & climate-sealed crating.',
        isCompleted: false,
        isCurrent: false,
      },
      {
        title: 'White Glove Transit & In-Home Assembly',
        description: 'Scheduled room placement and packaging removal by Ochre technicians.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'OCHRE-5510': {
    orderId: 'OCHRE-5510',
    customerName: 'Vikramaditya Singhania',
    phone: '+91 98200 11928',
    orderDate: '20 Jul 2026',
    estimatedDeliveryDate: '02 Aug 2026',
    currentStepIndex: 1,
    deliveryAddress: 'Villa 12, Palm Meadows, Whitefield, Bengaluru - 560066',
    carrierName: 'The Ochre Dedicated Fleet',
    trackingNumber: 'OG-BLR-10293',
    isCustomOrder: true,
    items: [
      {
        name: 'The Rajasthan Live-Edge 8-Seater Dining Table',
        finish: 'Dark Walnut Finish / Brass Butterfly Inlays',
        qty: 1,
        priceINR: 145000,
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Handcrafted Rattan & Teak Dining Chairs (Set of 6)',
        finish: 'Natural Honey Teak / Woven Cane',
        qty: 1,
        priceINR: 114000,
        image: 'https://images.unsplash.com/photo-1580481077195-c990b79cefe2?auto=format&fit=crop&w=300&q=80',
      },
    ],
    steps: [
      {
        title: 'Order Confirmed & Live-Edge Slab Cured',
        description: 'Single-slab Sheesham timber dried to 8% moisture equilibrium.',
        date: '20 Jul 2026',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Brass Butterfly Inlay & Planing',
        description: 'Hand-chiseling butterfly keys to secure natural wood crevices.',
        date: '22 Jul 2026',
        isCompleted: false,
        isCurrent: true,
      },
      {
        title: 'Organic Oil & Beeswax Buffing',
        description: 'Triple coat application of food-safe linseed oil and natural wax.',
        isCompleted: false,
        isCurrent: false,
      },
      {
        title: 'Custom Wooden Crate Packing',
        description: 'Reinforced corner armor for interstate transit.',
        isCompleted: false,
        isCurrent: false,
      },
      {
        title: 'White Glove Installation',
        description: 'Direct room placement with floor protector pads installed.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'OCHRE-SWATCH-341': {
    orderId: 'OCHRE-SWATCH-341',
    customerName: 'Rohan Verma',
    phone: '+91 98765 43210',
    orderDate: '21 Jul 2026',
    estimatedDeliveryDate: '24 Jul 2026',
    currentStepIndex: 2,
    deliveryAddress: 'House No 14, Koramangala 4th Block, Bengaluru - 560034',
    carrierName: 'Bluedart Express Courier',
    trackingNumber: 'BD-BLR-9921',
    isCustomOrder: false,
    items: [
      {
        name: 'Free Ochre Swatch Box (5 Swatches)',
        finish: 'Teak Stains + Terracotta Velvet & Bouclé',
        qty: 1,
        priceINR: 0,
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=300&q=80',
      },
    ],
    steps: [
      {
        title: 'Swatch Kit Requested',
        description: 'Fabric and teak wood chips packaged in presentation box.',
        date: '21 Jul 2026',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Dispatched via Bluedart Express',
        description: 'Air express transit initiated from Jodhpur hub.',
        date: '22 Jul 2026',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Out for Local Delivery in Bengaluru',
        description: 'On route with delivery agent.',
        date: '23 Jul 2026',
        isCompleted: false,
        isCurrent: true,
      },
      {
        title: 'Delivered to Doorstep',
        description: 'Swatch box delivered for home testing.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
};

const DEFAULT_BESPOKE_REQUESTS: CustomFurnitureRequest[] = [
  {
    requestId: 'OCHRE-BESPOKE-9412',
    customerName: 'Gayatri Sundaram',
    phone: '+91 98400 99881',
    email: 'gayatri.s@example.com',
    city: 'Chennai',
    itemType: 'sectional',
    customWidthCm: 320,
    customDepthCm: 180,
    customHeightCm: 85,
    woodSpecies: 'solid-teak',
    upholsteryFabric: 'belgian-boucle',
    hasBrassAccents: true,
    hasFlutedSlats: true,
    specialInstructions: 'Need low back profile to sit right below a double-height window. Left-facing chaise lounge configuration.',
    estimatedPriceINR: 235000,
    submittedAt: '22 Jul 2026',
    status: 'Submitted for Artisan Quote',
  },
  {
    requestId: 'OCHRE-BESPOKE-8104',
    customerName: 'Karan Mehra',
    phone: '+91 98110 55442',
    email: 'karan.mehra@example.com',
    city: 'New Delhi (Golf Links)',
    itemType: 'bar-cabinet',
    customWidthCm: 140,
    customDepthCm: 55,
    customHeightCm: 175,
    woodSpecies: 'walnut-hardwood',
    upholsteryFabric: 'none',
    hasBrassAccents: true,
    hasFlutedSlats: true,
    specialInstructions: 'Internal wine glass stems and brass mesh cabinet panels. LED strip channel groove needed under top shelf.',
    estimatedPriceINR: 118000,
    submittedAt: '21 Jul 2026',
    status: 'CAD Drawing In Progress',
  },
  {
    requestId: 'OCHRE-BESPOKE-7729',
    customerName: 'Nisha Pillai',
    phone: '+91 97411 22334',
    email: 'nisha.p@example.com',
    city: 'Bengaluru (Indiranagar)',
    itemType: 'canopy-bed',
    customWidthCm: 210,
    customDepthCm: 225,
    customHeightCm: 220,
    woodSpecies: 'solid-sheesham',
    upholsteryFabric: 'washed-linen',
    hasBrassAccents: false,
    hasFlutedSlats: false,
    specialInstructions: 'King mattress size 78x72 inches clearance. Minimalist clean posts with mortise joints.',
    estimatedPriceINR: 154000,
    submittedAt: '19 Jul 2026',
    status: 'Draft',
  },
];

const DEFAULT_STYLIST_BOOKINGS: StylistBookingRecord[] = [
  {
    id: 'STYL-2026-101',
    customerName: 'Dr. Alok Kulkarni',
    phone: '+91 98220 44556',
    roomType: 'Living & Dining Room',
    consultationType: 'home-visit',
    preferredDate: '2026-08-25',
    preferredTime: '11:00 AM - 01:00 PM',
    assignedStylist: 'Priya Mehta (Lead Spatial Architect)',
    notes: 'Moving into new 4BHK apartment in Bandra West. Want cohesive warm minimalist theme with natural teak and terracotta tones.',
    status: 'Confirmed & Scheduled',
    createdAt: '21 Jul 2026',
  },
  {
    id: 'STYL-2026-102',
    customerName: 'Samira Roy',
    phone: '+91 99030 88123',
    roomType: 'Primary Bedroom Suite',
    consultationType: 'virtual',
    preferredDate: '2026-08-27',
    preferredTime: '03:00 PM - 04:30 PM',
    assignedStylist: 'Vikram Rathore (Artisan Consultant)',
    notes: 'Need recommendation on canopy bed vs floating bed frame with integrated brass bedside sconces.',
    status: 'Pending Review',
    createdAt: '22 Jul 2026',
  },
];

const DEFAULT_SWATCH_ORDERS: SwatchOrderRecord[] = [
  {
    orderId: 'OCHRE-SWATCH-341',
    customerName: 'Rohan Verma',
    phone: '+91 98765 43210',
    pincode: '560034',
    address: 'House No 14, Koramangala 4th Block, Bengaluru',
    swatches: [
      { id: 'wood-raw-teak', name: 'Raw Plantation Teak', category: 'wood', hex: '#B27A4B', description: 'Matte organic finish' },
      { id: 'wood-natural-sheesham', name: 'Golden Sheesham', category: 'wood', hex: '#8B4513', description: 'Rich natural grain' },
      { id: 'fabric-ochre-velvet', name: 'Terracotta Cotton Velvet', category: 'fabric', hex: '#C17D3C', description: 'Stain-resistant' },
    ],
    status: 'In Transit via Air Express',
    requestedAt: '21 Jul 2026',
    carrier: 'Bluedart Express',
    trackingNumber: 'BD-BLR-9921',
  },
  {
    orderId: 'OCHRE-SWATCH-342',
    customerName: 'Divya Nambiar',
    phone: '+91 98450 12345',
    pincode: '682001',
    address: 'Flat 6B, Marina Heights, Fort Kochi, Kerala',
    swatches: [
      { id: 'fabric-belgian-boucle', name: 'Warm Ivory Bouclé', category: 'fabric', hex: '#EAE6DF', description: 'High-texture yarn' },
      { id: 'fabric-washed-linen', name: 'Earthy Oatmeal Linen', category: 'fabric', hex: '#D6CEBE', description: 'Breathable wash' },
    ],
    status: 'Assembled',
    requestedAt: '22 Jul 2026',
  },
];

const DEFAULT_ACTIVITY_LOGS: WorkshopActivityLog[] = [
  {
    id: 'LOG-1',
    timestamp: '23 Jul 2026, 11:30 AM',
    action: 'Order Milestone Updated',
    user: 'Master Woodworker Arjun',
    details: 'Moved OCHRE-8921 to Upholstery & High-Resilience Cushioning stage',
    type: 'order',
  },
  {
    id: 'LOG-2',
    timestamp: '22 Jul 2026, 05:15 PM',
    action: 'New Bespoke Quote Received',
    user: 'Gayatri Sundaram (Customer)',
    details: 'Submitted request for 320cm Teak Sectional in Bouclé (Est: ₹2,35,000)',
    type: 'bespoke',
  },
  {
    id: 'LOG-3',
    timestamp: '22 Jul 2026, 02:00 PM',
    action: 'Stylist Scheduled',
    user: 'Admin Desk',
    details: 'Assigned Priya Mehta to Dr. Alok Kulkarni home consultation',
    type: 'stylist',
  },
  {
    id: 'LOG-4',
    timestamp: '21 Jul 2026, 10:00 AM',
    action: 'Inventory Price Adjusted',
    user: 'Artisan Atelier Admin',
    details: 'Adjusted seasonal promotion for Rajasthan Live-Edge Dining Table',
    type: 'inventory',
  },
];

// Helper Store API
export const atelierStore = {
  // Product Catalog
  getProducts: (): Product[] => {
    return safeStorage.getItem<Product[]>('ochre_catalog_products', PRODUCTS);
  },
  saveProducts: (products: Product[]) => {
    safeStorage.setItem('ochre_catalog_products', products);
  },
  resetProducts: (): Product[] => {
    safeStorage.setItem('ochre_catalog_products', PRODUCTS);
    return PRODUCTS;
  },

  // Orders
  getOrders: (): Record<string, OrderTrackInfo> => {
    return safeStorage.getItem<Record<string, OrderTrackInfo>>('ochre_atelier_orders', DEFAULT_ORDERS);
  },
  saveOrders: (orders: Record<string, OrderTrackInfo>) => {
    safeStorage.setItem('ochre_atelier_orders', orders);
  },
  addOrder: (order: OrderTrackInfo) => {
    const orders = atelierStore.getOrders();
    orders[order.orderId] = order;
    atelierStore.saveOrders(orders);
    atelierStore.logActivity({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action: 'New Order Created',
      user: order.customerName || 'Store Customer',
      details: `Order #${order.orderId} for ${order.items.length} item(s) logged in system`,
      type: 'order',
    });
  },
  updateOrder: (orderId: string, updated: Partial<OrderTrackInfo>) => {
    const orders = atelierStore.getOrders();
    if (orders[orderId]) {
      orders[orderId] = { ...orders[orderId], ...updated };
      atelierStore.saveOrders(orders);
      atelierStore.logActivity({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        action: 'Order Updated',
        user: 'Artisan Atelier Admin',
        details: `Updated tracking/status for Order #${orderId}`,
        type: 'order',
      });
    }
  },

  // Bespoke Requests
  getBespokeRequests: (): CustomFurnitureRequest[] => {
    return safeStorage.getItem<CustomFurnitureRequest[]>('ochre_bespoke_requests', DEFAULT_BESPOKE_REQUESTS);
  },
  saveBespokeRequests: (requests: CustomFurnitureRequest[]) => {
    safeStorage.setItem('ochre_bespoke_requests', requests);
  },
  addBespokeRequest: (req: CustomFurnitureRequest) => {
    const list = atelierStore.getBespokeRequests();
    const updated = [req, ...list];
    atelierStore.saveBespokeRequests(updated);
    atelierStore.logActivity({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action: 'Bespoke Quote Requested',
      user: req.customerName,
      details: `${req.itemType.toUpperCase()} (${req.customWidthCm}x${req.customDepthCm}cm) in ${req.woodSpecies}`,
      type: 'bespoke',
    });
  },
  updateBespokeStatus: (requestId: string, status: CustomFurnitureRequest['status'], estimatedPriceINR?: number) => {
    const list = atelierStore.getBespokeRequests().map(r => {
      if (r.requestId === requestId) {
        return {
          ...r,
          status,
          ...(estimatedPriceINR !== undefined ? { estimatedPriceINR } : {}),
        };
      }
      return r;
    });
    atelierStore.saveBespokeRequests(list);
    atelierStore.logActivity({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action: 'Bespoke Status Changed',
      user: 'Artisan Atelier Admin',
      details: `Request #${requestId} changed to "${status}"`,
      type: 'bespoke',
    });
  },

  // Stylist Bookings
  getStylistBookings: (): StylistBookingRecord[] => {
    return safeStorage.getItem<StylistBookingRecord[]>('ochre_stylist_bookings', DEFAULT_STYLIST_BOOKINGS);
  },
  saveStylistBookings: (bookings: StylistBookingRecord[]) => {
    safeStorage.setItem('ochre_stylist_bookings', bookings);
  },
  addStylistBooking: (booking: StylistBookingRecord) => {
    const list = atelierStore.getStylistBookings();
    atelierStore.saveStylistBookings([booking, ...list]);
    atelierStore.logActivity({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action: 'Stylist Consultation Booked',
      user: booking.customerName,
      details: `${booking.consultationType} on ${booking.preferredDate} (${booking.roomType})`,
      type: 'stylist',
    });
  },
  updateStylistBooking: (id: string, updated: Partial<StylistBookingRecord>) => {
    const list = atelierStore.getStylistBookings().map(b => b.id === id ? { ...b, ...updated } : b);
    atelierStore.saveStylistBookings(list);
  },

  // Swatch Orders
  getSwatchOrders: (): SwatchOrderRecord[] => {
    return safeStorage.getItem<SwatchOrderRecord[]>('ochre_swatch_orders', DEFAULT_SWATCH_ORDERS);
  },
  saveSwatchOrders: (orders: SwatchOrderRecord[]) => {
    safeStorage.setItem('ochre_swatch_orders', orders);
  },
  addSwatchOrder: (order: SwatchOrderRecord) => {
    const list = atelierStore.getSwatchOrders();
    atelierStore.saveSwatchOrders([order, ...list]);
    atelierStore.logActivity({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action: 'Swatch Box Requested',
      user: order.customerName,
      details: `${order.swatches.length} samples to PIN ${order.pincode}`,
      type: 'system',
    });
  },
  updateSwatchStatus: (orderId: string, status: SwatchOrderRecord['status'], trackingNumber?: string) => {
    const list = atelierStore.getSwatchOrders().map(o => o.orderId === orderId ? { ...o, status, ...(trackingNumber ? { trackingNumber } : {}) } : o);
    atelierStore.saveSwatchOrders(list);
  },

  // Activity Logs
  getActivityLogs: (): WorkshopActivityLog[] => {
    return safeStorage.getItem<WorkshopActivityLog[]>('ochre_workshop_logs', DEFAULT_ACTIVITY_LOGS);
  },
  logActivity: (log: WorkshopActivityLog) => {
    const logs = atelierStore.getActivityLogs();
    safeStorage.setItem('ochre_workshop_logs', [log, ...logs.slice(0, 49)]); // Keep last 50
  },

  // Auth / PIN management
  getMasterPin: (): string => {
    return safeStorage.getItem<string>('ochre_admin_pin', '8921');
  },
  setMasterPin: (newPin: string) => {
    safeStorage.setItem('ochre_admin_pin', newPin);
  },
  isSessionUnlocked: (): boolean => {
    return safeStorage.getItem<boolean>('ochre_admin_session_unlocked', false);
  },
  setSessionUnlocked: (unlocked: boolean) => {
    safeStorage.setItem('ochre_admin_session_unlocked', unlocked);
  },

  // Full Store Data Export & Import
  exportFullBackup: () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      products: atelierStore.getProducts(),
      orders: atelierStore.getOrders(),
      bespokeRequests: atelierStore.getBespokeRequests(),
      stylistBookings: atelierStore.getStylistBookings(),
      swatchOrders: atelierStore.getSwatchOrders(),
      activityLogs: atelierStore.getActivityLogs(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `the-ochre-lifestyle-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importFullBackup: (jsonData: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.products && Array.isArray(parsed.products)) {
        atelierStore.saveProducts(parsed.products);
      }
      if (parsed.orders && typeof parsed.orders === 'object') {
        atelierStore.saveOrders(parsed.orders);
      }
      if (parsed.bespokeRequests && Array.isArray(parsed.bespokeRequests)) {
        atelierStore.saveBespokeRequests(parsed.bespokeRequests);
      }
      if (parsed.stylistBookings && Array.isArray(parsed.stylistBookings)) {
        atelierStore.saveStylistBookings(parsed.stylistBookings);
      }
      if (parsed.swatchOrders && Array.isArray(parsed.swatchOrders)) {
        atelierStore.saveSwatchOrders(parsed.swatchOrders);
      }
      return { success: true, message: 'Store database restored successfully from backup.' };
    } catch (err: any) {
      return { success: false, message: 'Invalid JSON backup file format.' };
    }
  },

  // Telemetry & Traffic Tracker
  trackWebsiteVisit: () => {
    const today = new Date().toISOString().split('T')[0];
    const trafficKey = `ochre_traffic_${today}`;
    const current = safeStorage.getItem<{ visits: number; views: number }>(trafficKey, { visits: 0, views: 0 });
    safeStorage.setItem(trafficKey, {
      visits: current.visits + 1,
      views: current.views + 1,
    });
  },

  trackPageView: () => {
    const today = new Date().toISOString().split('T')[0];
    const trafficKey = `ochre_traffic_${today}`;
    const current = safeStorage.getItem<{ visits: number; views: number }>(trafficKey, { visits: 1, views: 0 });
    safeStorage.setItem(trafficKey, {
      visits: current.visits,
      views: current.views + 1,
    });
  },

  // Sales & Revenue Graph Generation (7D, 30D, 90D, 365D)
  getDailySalesMetrics: (days = 30): DailySalesMetric[] => {
    const result: DailySalesMetric[] = [];
    const now = new Date();
    const liveOrders = Object.values(atelierStore.getOrders());
    const bespokeQuotes = atelierStore.getBespokeRequests();

    // Baseline seeds for realistic luxury atelier curve
    const daySeeds = [
      { baseGross: 245000, orders: 2, bespoke: 85000 },
      { baseGross: 185000, orders: 1, bespoke: 0 },
      { baseGross: 420000, orders: 3, bespoke: 195000 },
      { baseGross: 310000, orders: 2, bespoke: 120000 },
      { baseGross: 560000, orders: 4, bespoke: 240000 },
      { baseGross: 390000, orders: 2, bespoke: 145000 },
      { baseGross: 680000, orders: 5, bespoke: 310000 },
    ];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const shortDate = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      
      const seedIndex = (d.getDate() + d.getMonth() * 3) % daySeeds.length;
      const seed = daySeeds[seedIndex];
      const variation = 0.85 + ((d.getDate() * 7) % 35) / 100;
      
      let dayGross = Math.round(seed.baseGross * variation);
      let dayOrders = Math.max(1, Math.round(seed.orders * variation));
      let dayBespoke = Math.round(seed.bespoke * variation);

      // If it's today, merge with actual dynamic orders
      if (i === 0) {
        const liveTotal = liveOrders.reduce((sum, o) => {
          return sum + o.items.reduce((s, it) => s + it.priceINR * it.qty, 0);
        }, 0);
        if (liveTotal > 0) {
          dayGross = Math.max(dayGross, liveTotal);
          dayOrders = Math.max(dayOrders, liveOrders.length);
        }
      }

      const netSales = Math.round(dayGross / 1.18); // Exclude 18% GST for net
      const aov = dayOrders > 0 ? Math.round(dayGross / dayOrders) : 0;
      const storefrontRevenue = Math.max(0, dayGross - dayBespoke);

      result.push({
        date: dateStr,
        shortDate,
        grossSalesINR: dayGross,
        netSalesINR: netSales,
        ordersCount: dayOrders,
        aovINR: aov,
        bespokeRevenueINR: dayBespoke,
        storefrontRevenueINR: storefrontRevenue,
      });
    }

    return result;
  },

  // Website Visits & Views Graph Generation
  getDailyTrafficMetrics: (days = 30): DailyTrafficMetric[] => {
    const result: DailyTrafficMetric[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const shortDate = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

      // Realistic luxury traffic numbers
      const dayFactor = d.getDay() === 0 || d.getDay() === 6 ? 1.35 : 1.0; // Weekend surge
      const baseVisits = Math.round((1450 + ((d.getDate() * 47) % 650)) * dayFactor);
      const pageViews = Math.round(baseVisits * (3.8 + ((d.getDate() * 11) % 18) / 10));
      const uniqueVisitors = Math.round(baseVisits * 0.82);
      const bounceRatePercent = Number((34.2 + ((d.getDate() * 3) % 8)).toFixed(1));
      const cartAdditions = Math.round(baseVisits * 0.12);
      const conversions = Math.round(baseVisits * 0.024);
      const conversionRatePercent = Number(((conversions / baseVisits) * 100).toFixed(2));

      result.push({
        date: dateStr,
        shortDate,
        websiteVisits: baseVisits,
        pageViews,
        uniqueVisitors,
        bounceRatePercent,
        cartAdditions,
        conversions,
        conversionRatePercent,
      });
    }

    return result;
  },

  // Category Revenue Distribution
  getCategoryRevenueMetrics: (): CategoryRevenueMetric[] => {
    const catalog = atelierStore.getProducts();
    const liveOrders = Object.values(atelierStore.getOrders());

    const categoryMap: Record<string, { name: string; revenue: number; count: number; color: string }> = {
      living: { name: 'Living Room & Seating', revenue: 2450000, count: 18, color: '#C17D3C' },
      dining: { name: 'Dining Tables & Chairs', revenue: 1890000, count: 14, color: '#8B4513' },
      bedroom: { name: 'Bedroom & Solid Canopy Beds', revenue: 1540000, count: 9, color: '#2B2220' },
      office: { name: 'Study Desks & Credenzas', revenue: 980000, count: 7, color: '#5C4033' },
      'lighting-rugs': { name: 'Lighting & Wool Rugs', revenue: 520000, count: 12, color: '#D27D2D' },
      outdoor: { name: 'Teak Outdoor & Verandah', revenue: 410000, count: 4, color: '#A0522D' },
    };

    // Factor in live catalog prices
    liveOrders.forEach(o => {
      o.items.forEach(it => {
        const matchingProd = catalog.find(p => p.name === it.name);
        const cat = matchingProd ? matchingProd.category : 'living';
        if (categoryMap[cat]) {
          categoryMap[cat].revenue += it.priceINR * it.qty;
          categoryMap[cat].count += it.qty;
        }
      });
    });

    const totalRev = Object.values(categoryMap).reduce((s, c) => s + c.revenue, 0);

    return Object.entries(categoryMap).map(([catKey, data]) => ({
      category: catKey,
      name: data.name,
      revenueINR: data.revenue,
      ordersCount: data.count,
      percentage: Number(((data.revenue / totalRev) * 100).toFixed(1)),
      color: data.color,
    }));
  },

  // Traffic Source Acquisition Metrics
  getTrafficSources: (): TrafficSourceMetric[] => {
    return [
      { source: 'Architectural Digest & Luxury Portals', visits: 12450, percentage: 32, conversionRate: 3.8, revenueINR: 2840000 },
      { source: 'Direct High-Net-Worth Patrons', visits: 9800, percentage: 25, conversionRate: 4.6, revenueINR: 2310000 },
      { source: 'Google Organic (Solid Teak Furniture)', visits: 8600, percentage: 22, conversionRate: 2.9, revenueINR: 1650000 },
      { source: 'Instagram / Pinterest Atelier Showcase', visits: 5400, percentage: 14, conversionRate: 2.1, revenueINR: 890000 },
      { source: 'Interior Designer & Architect Referrals', visits: 2750, percentage: 7, conversionRate: 6.2, revenueINR: 1100000 },
    ];
  },

  // Comprehensive Financial Summary
  getFinancialSummary: (): FinancialSummary => {
    const sales = atelierStore.getDailySalesMetrics(30);
    const grossRevenueINR = sales.reduce((sum, d) => sum + d.grossSalesINR, 0);
    const totalOrders = sales.reduce((sum, d) => sum + d.ordersCount, 0);
    const bespokeRevenueINR = sales.reduce((sum, d) => sum + d.bespokeRevenueINR, 0);
    const netRevenueINR = Math.round(grossRevenueINR / 1.18);
    const gstCollectedINR = grossRevenueINR - netRevenueINR;
    const whiteGloveLogisticsINR = totalOrders * 4500;
    const averageOrderValueINR = totalOrders > 0 ? Math.round(grossRevenueINR / totalOrders) : 0;
    const projectedMonthEndINR = Math.round((grossRevenueINR / 30) * 31 * 1.12); // +12% growth pace

    return {
      grossRevenueINR,
      netRevenueINR,
      gstCollectedINR,
      whiteGloveLogisticsINR,
      totalOrders,
      averageOrderValueINR,
      bespokeRevenueINR,
      monthOverMonthGrowth: 28.4,
      projectedMonthEndINR,
    };
  },
};
