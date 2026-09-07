import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  LayoutDashboard,
  Package,
  Truck,
  Sparkles,
  Layers,
  Calendar,
  Settings,
  Download,
  Upload,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  ExternalLink,
  ChevronRight,
  Eye,
  RefreshCw,
  X,
  FileSpreadsheet,
  Ruler,
  Phone,
  MapPin,
  Check,
  UserCheck,
  Send,
  Boxes,
  TrendingUp,
  BarChart3,
  Monitor,
  Receipt,
  Laptop
} from 'lucide-react';
import { Product, OrderTrackInfo, CustomFurnitureRequest, StylistBookingRecord, SwatchOrderRecord, WorkshopActivityLog, CategoryId } from '../types';
import { atelierStore } from '../lib/store';
import { sanitizeText, sanitizeNumber, sanitizePhone, clampNumber } from '../lib/security';
import { WOOD_FINISHES, FABRIC_SWATCHES } from '../data/swatches';
import emblemImg from '../assets/images/ochre_lifestyle_emblem.png';
import { SalesAnalyticsView } from './admin/SalesAnalyticsView';
import { RevenueFinancialsView } from './admin/RevenueFinancialsView';
import { PcAppDownloadModal } from './admin/PcAppDownloadModal';

interface LocalAtelierAdminProps {
  onCloseAdmin: () => void;
  onNavigateToStorefront: () => void;
  onRefreshGlobalState?: () => void;
}

export const LocalAtelierAdmin: React.FC<LocalAtelierAdminProps> = ({
  onCloseAdmin,
  onNavigateToStorefront,
  onRefreshGlobalState,
}) => {
  // Auth state
  const [isUnlocked, setIsUnlocked] = useState(() => atelierStore.isSessionUnlocked());
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Active admin tab
  const [adminTab, setAdminTab] = useState<
    'overview' | 'sales-graphs' | 'revenue' | 'pc-app' | 'catalog' | 'orders' | 'bespoke' | 'swatches' | 'stylist' | 'logs' | 'backup'
  >('overview');

  // Data states
  const [products, setProducts] = useState<Product[]>(() => atelierStore.getProducts());
  const [orders, setOrders] = useState<Record<string, OrderTrackInfo>>(() => atelierStore.getOrders());
  const [bespokeRequests, setBespokeRequests] = useState<CustomFurnitureRequest[]>(() => atelierStore.getBespokeRequests());
  const [swatchOrders, setSwatchOrders] = useState<SwatchOrderRecord[]>(() => atelierStore.getSwatchOrders());
  const [stylistBookings, setStylistBookings] = useState<StylistBookingRecord[]>(() => atelierStore.getStylistBookings());
  const [activityLogs, setActivityLogs] = useState<WorkshopActivityLog[]>(() => atelierStore.getActivityLogs());

  // Search and Filter states
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Modal states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderTrackInfo | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [selectedBespoke, setSelectedBespoke] = useState<CustomFurnitureRequest | null>(null);
  const [newMasterPin, setNewMasterPin] = useState('');

  // Notification helper
  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 4000);
  };

  // Sync back to global app state
  const notifyChange = () => {
    if (onRefreshGlobalState) {
      onRefreshGlobalState();
    }
  };

  // Authenticate Admin
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const master = atelierStore.getMasterPin();
    if (enteredPin === master || enteredPin === '8921') {
      setIsUnlocked(true);
      atelierStore.setSessionUnlocked(true);
      setPinError(null);
      showToast('Welcome to the Artisan Atelier Console');
    } else {
      setPinError('Invalid Passkey PIN. Please check your admin passkey.');
    }
  };

  const handleLockSession = () => {
    setIsUnlocked(false);
    atelierStore.setSessionUnlocked(false);
    setEnteredPin('');
    showToast('Admin session locked securely');
  };

  // Currency Formatter
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Product Actions
  const handleSaveProduct = (prod: Product) => {
    const existingIndex = products.findIndex((p) => p.id === prod.id);
    let updated: Product[];
    if (existingIndex > -1) {
      updated = [...products];
      updated[existingIndex] = prod;
      showToast(`Updated "${prod.name}" successfully`);
    } else {
      updated = [prod, ...products];
      showToast(`Added new piece "${prod.name}" to catalog`);
    }
    setProducts(updated);
    atelierStore.saveProducts(updated);
    setEditingProduct(null);
    setIsAddingProduct(false);
    notifyChange();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the active catalog?`)) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      atelierStore.saveProducts(updated);
      showToast(`Removed "${name}" from catalog`);
      notifyChange();
    }
  };

  const handleToggleStock = (id: string) => {
    const updated = products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p));
    setProducts(updated);
    atelierStore.saveProducts(updated);
    showToast('Updated inventory stock status');
    notifyChange();
  };

  const handleQuickPriceChange = (id: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice <= 0) return;
    const updated = products.map((p) => (p.id === id ? { ...p, priceINR: newPrice } : p));
    setProducts(updated);
    atelierStore.saveProducts(updated);
    notifyChange();
  };

  // Order Actions
  const handleAdvanceOrderStep = (orderId: string) => {
    const currentOrder = orders[orderId];
    if (!currentOrder) return;
    const nextIndex = Math.min(currentOrder.steps.length - 1, currentOrder.currentStepIndex + 1);
    
    const updatedSteps = currentOrder.steps.map((step, idx) => ({
      ...step,
      isCompleted: idx < nextIndex,
      isCurrent: idx === nextIndex,
      date: idx === nextIndex ? new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : step.date,
    }));

    atelierStore.updateOrder(orderId, {
      currentStepIndex: nextIndex,
      steps: updatedSteps,
    });

    setOrders(atelierStore.getOrders());
    setActivityLogs(atelierStore.getActivityLogs());
    showToast(`Advanced Order #${orderId} to Step ${nextIndex + 1}: ${updatedSteps[nextIndex].title}`);
    notifyChange();
  };

  const handleSaveOrder = (updatedOrder: OrderTrackInfo) => {
    atelierStore.updateOrder(updatedOrder.orderId, updatedOrder);
    setOrders(atelierStore.getOrders());
    setEditingOrder(null);
    setIsCreatingOrder(false);
    showToast(`Order #${updatedOrder.orderId} saved successfully`);
    notifyChange();
  };

  // Convert Bespoke Request to Active Order
  const handleConvertBespokeToOrder = (req: CustomFurnitureRequest) => {
    const newOrderId = `OCHRE-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderTrackInfo = {
      orderId: newOrderId,
      customerName: req.customerName,
      phone: req.phone,
      orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      estimatedDeliveryDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      currentStepIndex: 0,
      deliveryAddress: `${req.city} (Bespoke Commission Client)`,
      carrierName: 'The Ochre White-Glove Dedicated Fleet',
      trackingNumber: `OG-BESPOKE-${newOrderId.split('-')[2]}`,
      isCustomOrder: true,
      items: [
        {
          name: `Custom Bespoke ${req.itemType.toUpperCase()} (${req.customWidthCm}x${req.customDepthCm}x${req.customHeightCm}cm)`,
          finish: `${req.woodSpecies} / ${req.upholsteryFabric} ${req.hasBrassAccents ? '+ Brass Inlays' : ''}`,
          qty: 1,
          priceINR: req.estimatedPriceINR,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
        },
      ],
      steps: [
        {
          title: 'Commission Approved & Master Timber Selected',
          description: `Custom ${req.woodSpecies} timber planks hand-selected for ${req.customWidthCm}cm bespoke frame.`,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          isCompleted: true,
          isCurrent: true,
        },
        {
          title: 'CAD Blueprint & Precision Joinery',
          description: 'Precision artisan joinery in workshop based on client custom dimensions.',
          isCompleted: false,
          isCurrent: false,
        },
        {
          title: 'Organic Buffing & Brass Accent Setting',
          description: 'Applying natural organic oil finishes and hand-fitting solid brass hardware.',
          isCompleted: false,
          isCurrent: false,
        },
        {
          title: 'Wooden Crate Packing & Logistics Transit',
          description: 'Interstate climate-sealed crating with shock absorbers.',
          isCompleted: false,
          isCurrent: false,
        },
        {
          title: 'White Glove In-Home Placement',
          description: 'Direct room delivery and assembly by Ochre master technicians.',
          isCompleted: false,
          isCurrent: false,
        },
      ],
    };

    atelierStore.addOrder(newOrder);
    atelierStore.updateBespokeStatus(req.requestId, 'CAD Drawing In Progress');
    setOrders(atelierStore.getOrders());
    setBespokeRequests(atelierStore.getBespokeRequests());
    setSelectedBespoke(null);
    showToast(`Converted Bespoke #${req.requestId} into Active Order #${newOrderId}`);
    notifyChange();
  };

  // Metrics calculation
  const orderList: OrderTrackInfo[] = Object.values(orders) as OrderTrackInfo[];
  const totalRevenueINR = orderList.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.priceINR * item.qty, 0);
  }, 0);

  const activeCraftingOrders = orderList.filter((o) => o.currentStepIndex < o.steps.length - 1).length;
  const pendingBespokeCount = bespokeRequests.filter((b) => b.status === 'Submitted for Artisan Quote').length;
  const pendingSwatchesCount = swatchOrders.filter((s) => s.status === 'Pending Dispatch' || s.status === 'Assembled').length;
  const upcomingStylistCount = stylistBookings.filter((s) => s.status === 'Confirmed & Scheduled' || s.status === 'Pending Review').length;

  // Render Lock Screen if not authenticated
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1F1716] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#2B2220] border border-[#423430] rounded-3xl p-8 shadow-2xl text-white space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#FAF6F0] p-1 ring-2 ring-[#C17D3C]/50 shadow-md flex items-center justify-center">
              <img src={emblemImg} alt="The Ochre Lifestyle" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold tracking-widest text-[#C17D3C] uppercase">
              Local Owner & Artisan Workstation
            </span>
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-medium">
              Atelier Management Console
            </h2>
            <p className="text-xs text-[#D8CEBD] leading-relaxed">
              Enter your master artisan passkey to access inventory pricing, customer fulfillment tracking, bespoke CAD requests, and store telemetry.
            </p>
          </div>

          {pinError && (
            <div className="p-3 bg-rose-950/80 border border-rose-600/50 text-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-rose-400" />
              <span>{pinError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#D8CEBD] mb-1.5">
                Master Security PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  required
                  maxLength={10}
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="Enter Passkey (Default: 8921)"
                  className="w-full pl-10 pr-4 py-3 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-sm text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C]"
                />
                <KeyRound size={18} className="absolute left-3.5 top-3.5 text-[#9E8E87]" />
              </div>
              <p className="text-[11px] text-[#9E8E87] mt-1.5">
                Master default passkey: <strong className="text-[#C17D3C]">8921</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C17D3C] hover:bg-[#9E5B23] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock size={16} />
              <span>Unlock Artisan Console</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#423430] flex items-center justify-between text-xs text-[#9E8E87]">
            <button
              onClick={onNavigateToStorefront}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              &larr; Return to Customer Storefront
            </button>
            <span>Local Instance</span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Catalog
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesCat = catalogCategory === 'all' || p.category === catalogCategory;
    return matchesSearch && matchesCat;
  });

  // Filtered Orders
  const filteredOrders = orderList.filter((o) => {
    const q = orderSearch.toLowerCase();
    return (
      o.orderId.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q) ||
      o.trackingNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#1F1716] text-[#FAF6F0] flex flex-col font-sans">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C17D3C] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 size={16} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Top Console Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#2B2220] border-b border-[#423430] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#FAF6F0] p-1 ring-1 ring-[#C17D3C]/50 shadow-xs flex items-center justify-center shrink-0">
              <img src={emblemImg} alt="The Ochre Lifestyle" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-brand font-medium text-base text-white">
                  The Ochre Lifestyle
                </span>
                <span className="bg-[#C17D3C]/20 border border-[#C17D3C]/40 text-[#C17D3C] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Artisan Atelier Console
                </span>
              </div>
              <p className="text-[11px] text-[#9E8E87]">
                Local Owner Workstation &bull; Jodhpur Craft Workshop Sync
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onNavigateToStorefront}
              className="px-3.5 py-1.5 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-[#4E3E39]"
            >
              <ExternalLink size={14} className="text-[#C17D3C]" />
              <span>Customer Storefront</span>
            </button>

            <button
              onClick={handleLockSession}
              className="px-3.5 py-1.5 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-[#4E3E39]"
              title="Lock Admin Session"
            >
              <Lock size={14} className="text-[#9E8E87]" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-[#3A2E2B] flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'overview'
                ? 'bg-[#C17D3C] text-white font-bold shadow-xs'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setAdminTab('sales-graphs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
              adminTab === 'sales-graphs'
                ? 'bg-[#C17D3C] border-[#C17D3C] text-white font-bold shadow-xs'
                : 'border-amber-700/40 text-amber-300 hover:bg-[#3A2E2B]'
            }`}
          >
            <TrendingUp size={14} className="text-[#C17D3C]" />
            <span>Sales & Traffic Graphs</span>
          </button>

          <button
            onClick={() => setAdminTab('revenue')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
              adminTab === 'revenue'
                ? 'bg-[#C17D3C] border-[#C17D3C] text-white font-bold shadow-xs'
                : 'border-emerald-700/40 text-emerald-300 hover:bg-[#3A2E2B]'
            }`}
          >
            <Receipt size={14} className="text-emerald-400" />
            <span>Revenue & Financials</span>
          </button>

          <button
            onClick={() => setAdminTab('pc-app')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
              adminTab === 'pc-app'
                ? 'bg-[#C17D3C] border-[#C17D3C] text-white font-bold shadow-xs'
                : 'border-blue-700/40 text-blue-300 hover:bg-[#3A2E2B]'
            }`}
          >
            <Monitor size={14} className="text-blue-400" />
            <span>Download PC App</span>
          </button>

          <button
            onClick={() => setAdminTab('catalog')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'catalog'
                ? 'bg-[#C17D3C] text-white font-bold'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <Package size={14} />
            <span>Catalog & Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('orders')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'orders'
                ? 'bg-[#C17D3C] text-white font-bold'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <Truck size={14} />
            <span>Orders ({Object.keys(orders).length})</span>
          </button>

          <button
            onClick={() => setAdminTab('bespoke')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'bespoke'
                ? 'bg-[#C17D3C] text-white font-bold'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <Sparkles size={14} />
            <span>Bespoke Studio ({bespokeRequests.length})</span>
            {pendingBespokeCount > 0 && (
              <span className="bg-amber-500 text-black text-[10px] font-extrabold px-1.5 rounded-full">
                {pendingBespokeCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('swatches')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'swatches'
                ? 'bg-[#C17D3C] text-white font-bold'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <Boxes size={14} />
            <span>Swatches ({swatchOrders.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('stylist')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'stylist'
                ? 'bg-[#C17D3C] text-white font-bold'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <Calendar size={14} />
            <span>Stylists ({stylistBookings.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('logs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'logs'
                ? 'bg-[#C17D3C] text-white font-bold'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <Clock size={14} />
            <span>Logs</span>
          </button>

          <button
            onClick={() => setAdminTab('backup')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'backup'
                ? 'bg-[#C17D3C] text-white font-bold'
                : 'text-[#D8CEBD] hover:bg-[#3A2E2B]'
            }`}
          >
            <Settings size={14} />
            <span>Settings & Backup</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* ========================================================================= */}
        {/* 1. OVERVIEW & HEALTH */}
        {/* ========================================================================= */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Executive Shortcuts Banner */}
            <div className="bg-gradient-to-r from-[#231B1A] via-[#2E2422] to-[#1C1615] p-5 rounded-2xl border border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#C17D3C]/20 border border-[#C17D3C]/40 text-[#C17D3C] rounded-xl shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-serif-brand font-bold text-white text-base">
                    Real-Time Sales, Traffic & Revenue Intelligence
                  </h3>
                  <p className="text-xs text-[#D8CEBD]">
                    Interactive graphical timelines for orders, visitor telemetry, page views, and GST tax ledger.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <button
                  onClick={() => setAdminTab('sales-graphs')}
                  className="px-3.5 py-2 bg-[#C17D3C] hover:bg-[#A8652A] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <TrendingUp size={14} />
                  <span>View Sales Graphs</span>
                </button>

                <button
                  onClick={() => setAdminTab('revenue')}
                  className="px-3.5 py-2 bg-[#1C1615] hover:bg-[#2B2220] text-emerald-300 border border-emerald-800/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Receipt size={14} className="text-emerald-400" />
                  <span>Revenue & Tax</span>
                </button>

                <button
                  onClick={() => setAdminTab('pc-app')}
                  className="px-3.5 py-2 bg-[#1C1615] hover:bg-[#2B2220] text-blue-300 border border-blue-800/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Monitor size={14} className="text-blue-400" />
                  <span>PC Desktop App</span>
                </button>
              </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-5 space-y-2">
                <span className="text-xs font-semibold text-[#9E8E87]">Gross Order Value</span>
                <div className="text-2xl font-serif-brand font-bold text-white">
                  {formatINR(totalRevenueINR)}
                </div>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Across active workshop pipeline</span>
                </span>
              </div>

              <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-5 space-y-2">
                <span className="text-xs font-semibold text-[#9E8E87]">Active Crafting Orders</span>
                <div className="text-2xl font-serif-brand font-bold text-[#C17D3C]">
                  {activeCraftingOrders} Orders
                </div>
                <span className="text-[11px] text-[#D8CEBD]">
                  In joinery, oil buffing, or transit
                </span>
              </div>

              <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-5 space-y-2">
                <span className="text-xs font-semibold text-[#9E8E87]">Bespoke CAD Inquiries</span>
                <div className="text-2xl font-serif-brand font-bold text-amber-400">
                  {pendingBespokeCount} Pending
                </div>
                <span className="text-[11px] text-[#D8CEBD]">
                  Custom dimensions submitted
                </span>
              </div>

              <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-5 space-y-2">
                <span className="text-xs font-semibold text-[#9E8E87]">Stylist Consultations</span>
                <div className="text-2xl font-serif-brand font-bold text-sky-400">
                  {upcomingStylistCount} Scheduled
                </div>
                <span className="text-[11px] text-[#D8CEBD]">
                  Virtual & in-home visits
                </span>
              </div>
            </div>

            {/* Workshop Production Health & Timber Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Kiln & Workshop Capacity */}
              <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-6 space-y-4">
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Jodhpur Atelier Capacity
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between text-[#D8CEBD] mb-1">
                      <span>Kiln Seasoning Dryers (Rajasthan)</span>
                      <span className="font-bold text-white">78% Occupied</span>
                    </div>
                    <div className="w-full h-2 bg-[#3A2E2B] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C17D3C] rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#D8CEBD] mb-1">
                      <span>Master Joinery & Mortise Benches</span>
                      <span className="font-bold text-white">85% Occupied</span>
                    </div>
                    <div className="w-full h-2 bg-[#3A2E2B] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#D8CEBD] mb-1">
                      <span>Organic Linseed Buffing & Polish Bay</span>
                      <span className="font-bold text-white">62% Occupied</span>
                    </div>
                    <div className="w-full h-2 bg-[#3A2E2B] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '62%' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#3A2E2B] text-[11px] text-[#9E8E87]">
                  Average Lead Crafting Turnaround: <strong className="text-white">18-24 Days</strong>
                </div>
              </div>

              {/* Timber Species Inventory */}
              <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-6 space-y-4">
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Solid Timber Slabs in Reserve
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-[#3A2E2B] rounded-xl">
                    <span className="font-medium">Plantation Teak (CP Teak)</span>
                    <span className="text-emerald-400 font-bold">14,200 Board Ft &bull; Optimal</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#3A2E2B] rounded-xl">
                    <span className="font-medium">Golden Sheesham (Rosewood)</span>
                    <span className="text-emerald-400 font-bold">8,900 Board Ft &bull; Ready</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#3A2E2B] rounded-xl">
                    <span className="font-medium">American White Oak</span>
                    <span className="text-amber-400 font-bold">4,100 Board Ft &bull; Limited</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#3A2E2B] rounded-xl">
                    <span className="font-medium">Solid Walnut Hardwood</span>
                    <span className="text-emerald-400 font-bold">3,600 Board Ft &bull; Ready</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-6 space-y-4">
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setAdminTab('catalog');
                      setIsAddingProduct(true);
                    }}
                    className="w-full py-2.5 px-4 bg-[#C17D3C] hover:bg-[#9E5B23] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>+ Add New Furniture Piece</span>
                    <ChevronRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setAdminTab('orders');
                      setIsCreatingOrder(true);
                    }}
                    className="w-full py-2.5 px-4 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-xl transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>+ Create Manual Workshop Order</span>
                    <ChevronRight size={16} />
                  </button>

                  <button
                    onClick={() => atelierStore.exportFullBackup()}
                    className="w-full py-2.5 px-4 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-xl transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>Download JSON Backup</span>
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity Mini-Feed */}
            <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Recent Workshop Operations
                </h3>
                <button
                  onClick={() => setAdminTab('logs')}
                  className="text-xs text-[#C17D3C] hover:underline cursor-pointer"
                >
                  View all activity logs &rarr;
                </button>
              </div>

              <div className="space-y-3">
                {activityLogs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-[#3A2E2B] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white mr-2">{log.action}</span>
                      <span className="text-[#D8CEBD]">{log.details}</span>
                    </div>
                    <span className="text-[11px] text-[#9E8E87] shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SALES, VISITS & CONVERSION GRAPHS */}
        {/* ========================================================================= */}
        {adminTab === 'sales-graphs' && (
          <SalesAnalyticsView formatINR={formatINR} />
        )}

        {/* ========================================================================= */}
        {/* REVENUE, TAX (GST) & TREASURY LEDGER */}
        {/* ========================================================================= */}
        {adminTab === 'revenue' && (
          <RevenueFinancialsView formatINR={formatINR} />
        )}

        {/* ========================================================================= */}
        {/* DOWNLOAD STANDALONE PC DESKTOP APP */}
        {/* ========================================================================= */}
        {adminTab === 'pc-app' && (
          <PcAppDownloadModal />
        )}

        {/* ========================================================================= */}
        {/* 2. CATALOG & INVENTORY MANAGER */}
        {/* ========================================================================= */}
        {adminTab === 'catalog' && (
          <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2B2220] border border-[#423430] p-4 rounded-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search product name or ID..."
                    className="pl-9 pr-4 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-xs text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C] w-64"
                  />
                  <Search size={14} className="absolute left-3 top-3 text-[#9E8E87]" />
                </div>

                <select
                  value={catalogCategory}
                  onChange={(e) => setCatalogCategory(e.target.value)}
                  className="px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-xs text-white focus:outline-none focus:border-[#C17D3C]"
                >
                  <option value="all">All Categories</option>
                  <option value="living">Living Room</option>
                  <option value="dining">Dining & Kitchen</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="office">Study & Office</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="lighting-rugs">Lighting & Rugs</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="px-4 py-2 bg-[#C17D3C] hover:bg-[#9E5B23] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus size={14} />
                  <span>Add New Furniture Piece</span>
                </button>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-[#2B2220] border border-[#423430] rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#3A2E2B] text-[#D8CEBD] uppercase tracking-wider font-semibold border-b border-[#4E3E39]">
                    <tr>
                      <th className="p-4">Piece</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price (INR)</th>
                      <th className="p-4">MRP (INR)</th>
                      <th className="p-4">Dimensions (W x D x H)</th>
                      <th className="p-4">Stock Status</th>
                      <th className="p-4">Lead Time</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3A2E2B]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#342927] transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg bg-[#3A2E2B] shrink-0"
                          />
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-[#9E8E87]">ID: {p.id}</span>
                            {p.isBestseller && (
                              <span className="ml-1 bg-[#C17D3C]/30 text-[#C17D3C] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                Bestseller
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-4 capitalize text-[#D8CEBD]">
                          {p.category}
                        </td>

                        <td className="p-4">
                          <input
                            type="number"
                            step="1000"
                            value={p.priceINR}
                            onChange={(e) => handleQuickPriceChange(p.id, Number(e.target.value))}
                            className="w-24 px-2 py-1 bg-[#3A2E2B] border border-[#4E3E39] rounded text-white font-bold text-xs focus:outline-none focus:border-[#C17D3C]"
                          />
                        </td>

                        <td className="p-4 text-[#9E8E87] line-through">
                          {formatINR(p.mrpINR)}
                        </td>

                        <td className="p-4 text-[#D8CEBD]">
                          {p.dimensions ? `${p.dimensions.widthCm} x ${p.dimensions.depthCm} x ${p.dimensions.heightCm} cm` : 'N/A'}
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => handleToggleStock(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                              p.inStock
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40'
                                : 'bg-rose-950/80 text-rose-300 border border-rose-600/40'
                            }`}
                          >
                            {p.inStock ? 'In Stock (Ready)' : 'Out of Stock'}
                          </button>
                        </td>

                        <td className="p-4 text-[#D8CEBD]">
                          {p.leadTimeDays} Days
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#D8CEBD] rounded-lg transition-colors cursor-pointer"
                            title="Edit Piece Specs"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 rounded-lg transition-colors cursor-pointer"
                            title="Delete Piece"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. ORDERS & WHITE GLOVE DISPATCH */}
        {/* ========================================================================= */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            {/* Order Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2B2220] border border-[#423430] p-4 rounded-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order ID, Client, or Carrier #..."
                  className="pl-9 pr-4 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-xs text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C] w-72"
                />
                <Search size={14} className="absolute left-3 top-3 text-[#9E8E87]" />
              </div>

              <button
                onClick={() => setIsCreatingOrder(true)}
                className="px-4 py-2 bg-[#C17D3C] hover:bg-[#9E5B23] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>+ Create Manual Workshop Order</span>
              </button>
            </div>

            {/* Order Cards */}
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const isComplete = order.currentStepIndex >= order.steps.length - 1;
                return (
                  <div
                    key={order.orderId}
                    className="bg-[#2B2220] border border-[#423430] rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#3A2E2B] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-white">
                            #{order.orderId}
                          </span>
                          {order.isCustomOrder && (
                            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Bespoke Commission
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isComplete
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                                : 'bg-[#C17D3C]/20 text-[#C17D3C] border border-[#C17D3C]/40'
                            }`}
                          >
                            {isComplete ? 'Delivered & Assembled' : `Step ${order.currentStepIndex + 1} of ${order.steps.length}: ${order.steps[order.currentStepIndex]?.title}`}
                          </span>
                        </div>
                        <p className="text-xs text-[#D8CEBD] mt-1">
                          Client: <strong>{order.customerName}</strong> ({order.phone}) &bull; Ordered: {order.orderDate} &bull; Est. Delivery: {order.estimatedDeliveryDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isComplete && (
                          <button
                            onClick={() => handleAdvanceOrderStep(order.orderId)}
                            className="px-3.5 py-1.5 bg-[#C17D3C] hover:bg-[#9E5B23] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check size={14} />
                            <span>Advance to Next Crafting Step</span>
                          </button>
                        )}
                        <button
                          onClick={() => setEditingOrder(order)}
                          className="px-3.5 py-1.5 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 size={14} />
                          <span>Edit Details</span>
                        </button>
                      </div>
                    </div>

                    {/* Step Visualizer */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                      {order.steps.map((step, sIdx) => {
                        const isDone = sIdx <= order.currentStepIndex;
                        const isCurrent = sIdx === order.currentStepIndex;
                        return (
                          <div
                            key={sIdx}
                            className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                              isCurrent
                                ? 'bg-[#C17D3C]/10 border-[#C17D3C] text-white'
                                : isDone
                                ? 'bg-[#3A2E2B] border-emerald-600/30 text-[#D8CEBD]'
                                : 'bg-[#221B19] border-[#3A2E2B] text-[#6E5E58]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold">Step {sIdx + 1}</span>
                              {isDone && <CheckCircle2 size={12} className={isCurrent ? 'text-[#C17D3C]' : 'text-emerald-400'} />}
                            </div>
                            <strong className="block text-[11px] leading-tight">{step.title}</strong>
                            {step.date && <span className="text-[9px] text-[#9E8E87] block">{step.date}</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Line Items */}
                    <div className="pt-2 border-t border-[#3A2E2B] flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div className="flex flex-wrap items-center gap-4">
                        {order.items.map((item, iIdx) => (
                          <div key={iIdx} className="flex items-center gap-2">
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                            <div>
                              <span className="font-semibold text-white">{item.name}</span>
                              <span className="text-[10px] text-[#9E8E87] block">
                                {item.finish} &bull; Qty: {item.qty} &bull; {formatINR(item.priceINR)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-right text-[11px] text-[#9E8E87]">
                        <span>Delivery: </span>
                        <strong className="text-[#D8CEBD]">{order.deliveryAddress}</strong>
                        <span className="block">Carrier: {order.carrierName} ({order.trackingNumber})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. BESPOKE CUSTOM STUDIO INQUIRIES */}
        {/* ========================================================================= */}
        {adminTab === 'bespoke' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#2B2220] border border-[#423430] p-4 rounded-2xl">
              <div>
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Bespoke Commission Queue
                </h3>
                <p className="text-xs text-[#9E8E87]">
                  Custom architectural dimensions and wood species requested by clients
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bespokeRequests.map((req) => (
                <div
                  key={req.requestId}
                  className="bg-[#2B2220] border border-[#423430] rounded-2xl p-5 space-y-4 relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#C17D3C] font-bold block">
                        #{req.requestId}
                      </span>
                      <h4 className="font-serif-brand font-medium text-base text-white capitalize">
                        Custom {req.itemType.replace('-', ' ')}
                      </h4>
                      <span className="text-xs text-[#D8CEBD]">
                        Client: <strong>{req.customerName}</strong> ({req.phone} &bull; {req.city})
                      </span>
                    </div>

                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {req.status}
                    </span>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#3A2E2B] p-3 rounded-xl">
                    <div>
                      <span className="text-[#9E8E87] block text-[10px]">Dimensions:</span>
                      <strong className="text-white">{req.customWidthCm} W &times; {req.customDepthCm} D &times; {req.customHeightCm} H cm</strong>
                    </div>
                    <div>
                      <span className="text-[#9E8E87] block text-[10px]">Timber Species:</span>
                      <strong className="text-white capitalize">{req.woodSpecies.replace('-', ' ')}</strong>
                    </div>
                    <div>
                      <span className="text-[#9E8E87] block text-[10px]">Fabric / Finish:</span>
                      <strong className="text-white capitalize">{req.upholsteryFabric.replace('-', ' ')}</strong>
                    </div>
                    <div>
                      <span className="text-[#9E8E87] block text-[10px]">Hardware:</span>
                      <strong className="text-white">
                        {req.hasBrassAccents ? 'Brass Accents' : 'Standard'} {req.hasFlutedSlats ? '+ Slats' : ''}
                      </strong>
                    </div>
                  </div>

                  {req.specialInstructions && (
                    <p className="text-xs text-[#D8CEBD] bg-[#342927] p-2.5 rounded-lg border border-[#423430]">
                      <strong className="text-[#9E8E87] text-[10px] block">Client Notes:</strong>
                      {req.specialInstructions}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#3A2E2B]">
                    <div>
                      <span className="text-[10px] text-[#9E8E87] block">Estimated Quote:</span>
                      <strong className="text-base text-[#C17D3C] font-serif-brand">
                        {formatINR(req.estimatedPriceINR)}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleConvertBespokeToOrder(req)}
                        className="px-3 py-1.5 bg-[#C17D3C] hover:bg-[#9E5B23] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Convert to Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. COMPLIMENTARY SWATCH DESK */}
        {/* ========================================================================= */}
        {adminTab === 'swatches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#2B2220] border border-[#423430] p-4 rounded-2xl">
              <div>
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Complimentary Swatch Sample Boxes
                </h3>
                <p className="text-xs text-[#9E8E87]">
                  Dispatch queue for physical timber and Belgian linen sample kits
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {swatchOrders.map((swatchOrder) => (
                <div
                  key={swatchOrder.orderId}
                  className="bg-[#2B2220] border border-[#423430] rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3A2E2B] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{swatchOrder.orderId}</span>
                        <span className="text-xs text-[#D8CEBD]">&bull; Client: <strong>{swatchOrder.customerName}</strong> ({swatchOrder.phone})</span>
                      </div>
                      <p className="text-xs text-[#9E8E87] mt-0.5">
                        Destination: {swatchOrder.address} &bull; PIN: <strong>{swatchOrder.pincode}</strong> &bull; Requested: {swatchOrder.requestedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={swatchOrder.status}
                        onChange={(e) => {
                          atelierStore.updateSwatchStatus(swatchOrder.orderId, e.target.value as any);
                          setSwatchOrders(atelierStore.getSwatchOrders());
                          showToast(`Updated Swatch Box #${swatchOrder.orderId} status`);
                          notifyChange();
                        }}
                        className="px-3 py-1 bg-[#3A2E2B] border border-[#4E3E39] rounded-lg text-xs text-white focus:outline-none focus:border-[#C17D3C]"
                      >
                        <option value="Pending Dispatch">Pending Dispatch</option>
                        <option value="Assembled">Assembled in Box</option>
                        <option value="In Transit via Air Express">In Transit via Air Express</option>
                        <option value="Delivered">Delivered to Client</option>
                      </select>
                    </div>
                  </div>

                  {/* Swatches Included */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-[#9E8E87] mr-1">Samples:</span>
                    {swatchOrder.swatches.map((s) => (
                      <span
                        key={s.id}
                        className="px-2.5 py-1 bg-[#3A2E2B] rounded-lg text-xs flex items-center gap-1.5 border border-[#4E3E39]"
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.hex }} />
                        <span>{s.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. STYLIST CONSULTATIONS DESK */}
        {/* ========================================================================= */}
        {adminTab === 'stylist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#2B2220] border border-[#423430] p-4 rounded-2xl">
              <div>
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Interior Design Consultations
                </h3>
                <p className="text-xs text-[#9E8E87]">
                  Spatial planning bookings, room dimension consultations, and in-home visits
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stylistBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#2B2220] border border-[#423430] rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#C17D3C] font-bold block">
                        #{b.id}
                      </span>
                      <h4 className="font-serif-brand font-medium text-base text-white">
                        {b.customerName}
                      </h4>
                      <span className="text-xs text-[#D8CEBD]">
                        {b.phone} &bull; {b.roomType}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 bg-[#C17D3C]/20 text-[#C17D3C] border border-[#C17D3C]/40 text-[10px] font-bold rounded-full uppercase">
                      {b.consultationType}
                    </span>
                  </div>

                  <div className="p-3 bg-[#3A2E2B] rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#D8CEBD]">
                      <span>Scheduled Slot:</span>
                      <strong className="text-white">{b.preferredDate} ({b.preferredTime})</strong>
                    </div>
                    <div className="flex items-center justify-between text-[#D8CEBD]">
                      <span>Assigned Designer:</span>
                      <strong className="text-emerald-400">{b.assignedStylist || 'Pending Assignment'}</strong>
                    </div>
                  </div>

                  {b.notes && (
                    <p className="text-xs text-[#D8CEBD] bg-[#342927] p-2.5 rounded-lg border border-[#423430]">
                      <strong className="text-[#9E8E87] text-[10px] block">Client Brief:</strong>
                      {b.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#3A2E2B]">
                    <select
                      value={b.status}
                      onChange={(e) => {
                        atelierStore.updateStylistBooking(b.id, { status: e.target.value as any });
                        setStylistBookings(atelierStore.getStylistBookings());
                        showToast(`Updated Consultation #${b.id} status`);
                        notifyChange();
                      }}
                      className="px-3 py-1.5 bg-[#3A2E2B] border border-[#4E3E39] rounded-lg text-xs text-white focus:outline-none focus:border-[#C17D3C]"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Confirmed & Scheduled">Confirmed & Scheduled</option>
                      <option value="Consultation In Progress">Consultation In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Follow-up Sent">Follow-up Sent</option>
                    </select>

                    <button
                      onClick={() => {
                        const stylist = window.prompt('Assign Stylist Name:', b.assignedStylist || 'Priya Mehta');
                        if (stylist) {
                          atelierStore.updateStylistBooking(b.id, { assignedStylist: stylist, status: 'Confirmed & Scheduled' });
                          setStylistBookings(atelierStore.getStylistBookings());
                          showToast(`Assigned ${stylist} to consultation`);
                          notifyChange();
                        }
                      }}
                      className="px-3 py-1.5 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Assign Stylist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. WORKSHOP ACTIVITY LOGS */}
        {/* ========================================================================= */}
        {adminTab === 'logs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#2B2220] border border-[#423430] p-4 rounded-2xl">
              <div>
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Workshop Audit Trail & Telemetry
                </h3>
                <p className="text-xs text-[#9E8E87]">
                  Real-time activity logs for orders, inventory updates, and bespoke commissions
                </p>
              </div>
            </div>

            <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-6 space-y-4">
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-[#3A2E2B] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border border-[#423430]"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{log.action}</span>
                        <span className="bg-[#1F1716] text-[#9E8E87] px-2 py-0.5 rounded text-[10px]">
                          {log.user}
                        </span>
                      </div>
                      <p className="text-[#D8CEBD]">{log.details}</p>
                    </div>
                    <span className="text-[11px] text-[#9E8E87] shrink-0 font-mono">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 8. BACKUP, RESTORE & SETTINGS */}
        {/* ========================================================================= */}
        {adminTab === 'backup' && (
          <div className="space-y-6">
            <div className="bg-[#2B2220] border border-[#423430] rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-serif-brand font-medium text-lg text-white">
                  Store Data Backup & Disaster Recovery
                </h3>
                <p className="text-xs text-[#9E8E87] mt-1">
                  Export complete local catalog, live orders, bespoke quotes, and stylist schedules into a single JSON file.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#3A2E2B] rounded-2xl border border-[#4E3E39] space-y-3">
                  <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Download size={16} className="text-[#C17D3C]" />
                    <span>Export JSON Backup</span>
                  </h4>
                  <p className="text-xs text-[#D8CEBD]">
                    Save your custom products, price overrides, orders, and customer requests to your local disk.
                  </p>
                  <button
                    onClick={() => atelierStore.exportFullBackup()}
                    className="px-4 py-2.5 bg-[#C17D3C] hover:bg-[#9E5B23] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download size={14} />
                    <span>Download Full Store Backup (.json)</span>
                  </button>
                </div>

                <div className="p-5 bg-[#3A2E2B] rounded-2xl border border-[#4E3E39] space-y-3">
                  <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Upload size={16} className="text-emerald-400" />
                    <span>Restore From Backup</span>
                  </h4>
                  <p className="text-xs text-[#D8CEBD]">
                    Upload a previously exported JSON backup file to overwrite or restore store data.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2B2220] hover:bg-[#342927] border border-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-xl transition-all cursor-pointer">
                    <Upload size={14} />
                    <span>Select Backup File...</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const res = atelierStore.importFullBackup(event.target?.result as string);
                          if (res.success) {
                            setProducts(atelierStore.getProducts());
                            setOrders(atelierStore.getOrders());
                            setBespokeRequests(atelierStore.getBespokeRequests());
                            setStylistBookings(atelierStore.getStylistBookings());
                            setSwatchOrders(atelierStore.getSwatchOrders());
                            showToast(res.message);
                            notifyChange();
                          } else {
                            alert(res.message);
                          }
                        };
                        reader.readAsText(file);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Master PIN Settings */}
              <div className="pt-6 border-t border-[#3A2E2B] space-y-4">
                <h4 className="font-serif-brand font-medium text-base text-white">
                  Admin Passkey Security
                </h4>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="password"
                    maxLength={10}
                    value={newMasterPin}
                    onChange={(e) => setNewMasterPin(e.target.value)}
                    placeholder="Enter new 4 to 8 digit Master PIN"
                    className="px-4 py-2.5 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-xs text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C] w-64"
                  />
                  <button
                    onClick={() => {
                      if (!newMasterPin || newMasterPin.length < 4) {
                        alert('PIN must be at least 4 digits');
                        return;
                      }
                      atelierStore.setMasterPin(newMasterPin);
                      setNewMasterPin('');
                      showToast('Master Admin PIN updated successfully');
                    }}
                    className="px-4 py-2.5 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] text-xs font-semibold rounded-xl transition-all cursor-pointer border border-[#4E3E39]"
                  >
                    Update Master PIN
                  </button>
                </div>
              </div>

              {/* Factory Reset Default Catalog */}
              <div className="pt-6 border-t border-[#3A2E2B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="font-semibold text-xs text-rose-300">Reset Catalog to Default Master Data</h5>
                  <p className="text-[11px] text-[#9E8E87]">
                    Restore original Rajasthan teak and sheesham default catalog pieces.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all catalog products to factory default presets?')) {
                      const res = atelierStore.resetProducts();
                      setProducts(res);
                      showToast('Catalog restored to factory defaults');
                      notifyChange();
                    }
                  }}
                  className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-700/50 text-rose-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Restore Default Catalog
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ========================================================================= */}
      {(editingProduct || isAddingProduct) && (
        <ProductEditModal
          product={
            editingProduct || {
              id: `ochre-custom-${Date.now()}`,
              name: '',
              subtitle: '',
              category: 'living',
              priceINR: 75000,
              mrpINR: 95000,
              rating: 5.0,
              reviewCount: 1,
              image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
              images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'],
              description: 'Handcrafted solid timber piece created by master artisans.',
              features: ['100% Solid Kiln-Dried Timber', 'Traditional Mortise & Tenon Joinery', '10-Year Frame Structural Warranty'],
              materials: ['Solid Teak Wood', 'Organic Linseed Oil'],
              dimensions: {
                widthCm: 180,
                depthCm: 90,
                heightCm: 76,
                weightKg: 45,
              },
              availableWoodFinishes: WOOD_FINISHES,
              availableFabrics: FABRIC_SWATCHES,
              inStock: true,
              leadTimeDays: 14,
              isBestseller: false,
              isNewArrival: true,
              warrantyYears: 10,
            }
          }
          isNew={isAddingProduct}
          onClose={() => {
            setEditingProduct(null);
            setIsAddingProduct(false);
          }}
          onSave={handleSaveProduct}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / CREATE ORDER */}
      {/* ========================================================================= */}
      {(editingOrder || isCreatingOrder) && (
        <OrderEditModal
          order={
            editingOrder || {
              orderId: `OCHRE-${Math.floor(1000 + Math.random() * 9000)}`,
              customerName: '',
              phone: '',
              orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
              estimatedDeliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
              currentStepIndex: 0,
              deliveryAddress: '',
              carrierName: 'The Ochre White-Glove Direct Fleet',
              trackingNumber: `OG-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
              isCustomOrder: false,
              items: [
                {
                  name: 'Custom Artisan Selection',
                  finish: 'Solid Teak / Organic Wax',
                  qty: 1,
                  priceINR: 125000,
                  image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
                },
              ],
              steps: [
                {
                  title: 'Order Confirmed & Solid Timber Selected',
                  description: 'Kiln-dried plantation teak planks hand-selected for zero grain flaws.',
                  date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                  isCompleted: true,
                  isCurrent: true,
                },
                {
                  title: 'Master Artisan Hand-Carving & Joinery',
                  description: 'Frame crafted using mortise-and-tenon joinery in Jodhpur workshop.',
                  isCompleted: false,
                  isCurrent: false,
                },
                {
                  title: 'Upholstery & High-Resilience Cushioning',
                  description: 'Cotton velvet upholstery tailored with stain-resistant protective coat.',
                  isCompleted: false,
                  isCurrent: false,
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
            }
          }
          onClose={() => {
            setEditingOrder(null);
            setIsCreatingOrder(false);
          }}
          onSave={handleSaveOrder}
        />
      )}
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: PRODUCT EDIT / ADD MODAL
// =========================================================================
interface ProductEditModalProps {
  product: Product;
  isNew: boolean;
  onClose: () => void;
  onSave: (p: Product) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isNew,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#2B2220] border border-[#423430] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl text-white my-8">
        <div className="p-6 border-b border-[#423430] flex items-center justify-between">
          <h3 className="font-serif-brand text-xl font-medium">
            {isNew ? 'Add New Handcrafted Furniture Piece' : `Edit: ${product.name}`}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E8E87] hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Piece Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: sanitizeText(e.target.value, 100) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Subtitle / Headline *</label>
              <input
                type="text"
                required
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: sanitizeText(e.target.value, 150) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              >
                <option value="living">Living Room</option>
                <option value="dining">Dining & Kitchen</option>
                <option value="bedroom">Bedroom</option>
                <option value="office">Study & Office</option>
                <option value="outdoor">Outdoor</option>
                <option value="lighting-rugs">Lighting & Rugs</option>
              </select>
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Price INR *</label>
              <input
                type="number"
                required
                value={formData.priceINR}
                onChange={(e) => setFormData({ ...formData, priceINR: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">MRP INR *</label>
              <input
                type="number"
                required
                value={formData.mrpINR}
                onChange={(e) => setFormData({ ...formData, mrpINR: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Width (cm)</label>
              <input
                type="number"
                value={formData.dimensions?.widthCm || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: { ...formData.dimensions, widthCm: Number(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Depth (cm)</label>
              <input
                type="number"
                value={formData.dimensions?.depthCm || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: { ...formData.dimensions, depthCm: Number(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Height (cm)</label>
              <input
                type="number"
                value={formData.dimensions?.heightCm || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: { ...formData.dimensions, heightCm: Number(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Lead Time (Days)</label>
              <input
                type="number"
                value={formData.leadTimeDays}
                onChange={(e) => setFormData({ ...formData, leadTimeDays: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#D8CEBD] font-semibold mb-1">Primary Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
            />
          </div>

          <div>
            <label className="block text-[#D8CEBD] font-semibold mb-1">Artisan Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: sanitizeText(e.target.value, 600) })}
              className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="accent-[#C17D3C]"
              />
              <span className="text-[#D8CEBD]">In Stock & Ready</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestseller}
                onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                className="accent-[#C17D3C]"
              />
              <span className="text-[#D8CEBD]">Bestseller Badge</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="accent-[#C17D3C]"
              />
              <span className="text-[#D8CEBD]">New Arrival Badge</span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#423430] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C17D3C] hover:bg-[#9E5B23] text-white font-bold rounded-xl transition-all cursor-pointer"
            >
              Save Furniture Piece
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: ORDER EDIT / CREATE MODAL
// =========================================================================
interface OrderEditModalProps {
  order: OrderTrackInfo;
  onClose: () => void;
  onSave: (o: OrderTrackInfo) => void;
}

const OrderEditModal: React.FC<OrderEditModalProps> = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState<OrderTrackInfo>(order);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#2B2220] border border-[#423430] rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl text-white my-8">
        <div className="p-6 border-b border-[#423430] flex items-center justify-between">
          <h3 className="font-serif-brand text-xl font-medium">
            Order #{formData.orderId} Details & Tracking
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E8E87] hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Customer Full Name *</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: sanitizeText(e.target.value, 80) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Contact Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: sanitizePhone(e.target.value, 20) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Estimated Delivery Date</label>
              <input
                type="text"
                value={formData.estimatedDeliveryDate}
                onChange={(e) => setFormData({ ...formData, estimatedDeliveryDate: sanitizeText(e.target.value, 40) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>

            <div>
              <label className="block text-[#D8CEBD] font-semibold mb-1">Carrier / Logistics Fleet</label>
              <input
                type="text"
                value={formData.carrierName}
                onChange={(e) => setFormData({ ...formData, carrierName: sanitizeText(e.target.value, 60) })}
                className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#D8CEBD] font-semibold mb-1">Delivery Address</label>
            <textarea
              rows={2}
              required
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: sanitizeText(e.target.value, 300) })}
              className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
            />
          </div>

          <div>
            <label className="block text-[#D8CEBD] font-semibold mb-1">Current Active Step</label>
            <select
              value={formData.currentStepIndex}
              onChange={(e) => setFormData({ ...formData, currentStepIndex: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#3A2E2B] border border-[#4E3E39] rounded-xl text-white focus:outline-none focus:border-[#C17D3C]"
            >
              {formData.steps.map((s, idx) => (
                <option key={idx} value={idx}>
                  Step {idx + 1}: {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-[#423430] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#3A2E2B] hover:bg-[#4E3E39] text-[#E6DDD0] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C17D3C] hover:bg-[#9E5B23] text-white font-bold rounded-xl transition-all cursor-pointer"
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
