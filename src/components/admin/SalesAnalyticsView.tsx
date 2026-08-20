import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Eye,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Layers,
  Sparkles,
  Download,
  Filter,
  CheckCircle2,
  MousePointerClick
} from 'lucide-react';
import { atelierStore } from '../../lib/store';
import { DailySalesMetric, DailyTrafficMetric, CategoryRevenueMetric, TrafficSourceMetric } from '../../types';

interface SalesAnalyticsViewProps {
  formatINR: (amount: number) => string;
}

export const SalesAnalyticsView: React.FC<SalesAnalyticsViewProps> = ({ formatINR }) => {
  const [timeRange, setTimeRange] = useState<7 | 30 | 90 | 365>(30);
  const [activeMetric, setActiveMetric] = useState<'gross' | 'orders' | 'aov'>('gross');
  const [trafficMetric, setTrafficMetric] = useState<'both' | 'visits' | 'views'>('both');

  const salesData: DailySalesMetric[] = atelierStore.getDailySalesMetrics(timeRange);
  const trafficData: DailyTrafficMetric[] = atelierStore.getDailyTrafficMetrics(timeRange);
  const categoryData: CategoryRevenueMetric[] = atelierStore.getCategoryRevenueMetrics();
  const trafficSources: TrafficSourceMetric[] = atelierStore.getTrafficSources();

  // Aggregate totals
  const totalGrossINR = salesData.reduce((acc, d) => acc + d.grossSalesINR, 0);
  const totalOrders = salesData.reduce((acc, d) => acc + d.ordersCount, 0);
  const avgAOV = totalOrders > 0 ? Math.round(totalGrossINR / totalOrders) : 0;

  const totalVisits = trafficData.reduce((acc, d) => acc + d.websiteVisits, 0);
  const totalPageViews = trafficData.reduce((acc, d) => acc + d.pageViews, 0);
  const totalConversions = trafficData.reduce((acc, d) => acc + d.conversions, 0);
  const avgConversionRate = totalVisits > 0 ? ((totalConversions / totalVisits) * 100).toFixed(2) : '0';
  const totalCartAdditions = trafficData.reduce((acc, d) => acc + d.cartAdditions, 0);

  // Export Analytics CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Gross Sales (INR)', 'Net Sales (INR)', 'Orders', 'AOV (INR)', 'Website Visits', 'Page Views', 'Conversions'];
    const rows = salesData.map((s, idx) => {
      const t = trafficData[idx] || { websiteVisits: 0, pageViews: 0, conversions: 0 };
      return [s.date, s.grossSalesINR, s.netSalesINR, s.ordersCount, s.aovINR, t.websiteVisits, t.pageViews, t.conversions];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the-ochre-sales-analytics-${timeRange}d.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Range Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#231B1A] p-6 rounded-2xl border border-amber-900/30">
        <div>
          <div className="flex items-center gap-2 text-[#C17D3C] text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles size={14} />
            <span>Executive Performance Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#FAF6F0] font-bold">
            Sales, Website Traffic & Conversion Graphs
          </h2>
          <p className="text-xs text-[#D8CEBD] mt-1">
            Real-time telemetry showing customer buying trends, website traffic sessions, page views, and category volume.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-[#1C1615] p-1 rounded-xl border border-[#3A2E2B] flex items-center gap-1">
            {([7, 30, 90, 365] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  timeRange === r
                    ? 'bg-[#C17D3C] text-white shadow-sm'
                    : 'text-[#D8CEBD] hover:text-white hover:bg-[#2B2220]'
                }`}
              >
                {r === 365 ? '1 Year' : `${r} Days`}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#2B2220] hover:bg-[#3A2E2B] text-[#FAF6F0] border border-[#423430] rounded-xl text-xs font-medium transition-all cursor-pointer shadow-xs"
            title="Download full analytics dataset as CSV"
          >
            <Download size={14} className="text-[#C17D3C]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20 hover:border-[#C17D3C]/40 transition-all">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Gross Sales ({timeRange}D)</span>
            <div className="p-2 bg-[#C17D3C]/10 text-[#C17D3C] rounded-lg">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {formatINR(totalGrossINR)}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <ArrowUpRight size={13} />
              <span>+24.8% vs previous period</span>
            </div>
          </div>
        </div>

        {/* Website Visits */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20 hover:border-[#C17D3C]/40 transition-all">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Website Visits ({timeRange}D)</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {totalVisits.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <ArrowUpRight size={13} />
              <span>+18.2% new visitors</span>
            </div>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20 hover:border-[#C17D3C]/40 transition-all">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Page Views ({timeRange}D)</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Eye size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {totalPageViews.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#D8CEBD] mt-1">
              Avg. <strong>{(totalPageViews / totalVisits).toFixed(1)}</strong> views / session
            </div>
          </div>
        </div>

        {/* Orders & Conversion */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20 hover:border-[#C17D3C]/40 transition-all">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Orders & Conversion</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {totalOrders} Orders <span className="text-xs font-normal text-[#C17D3C]">({avgConversionRate}%)</span>
            </div>
            <div className="text-[11px] text-[#D8CEBD] mt-1">
              AOV: <strong>{formatINR(avgAOV)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* GRAPH 1: Primary Sales & Orders Trend AreaChart */}
      <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-serif text-[#FAF6F0] font-bold flex items-center gap-2">
              <TrendingUp size={18} className="text-[#C17D3C]" />
              <span>Sales Revenue & Orders Velocity Timeline</span>
            </h3>
            <p className="text-xs text-[#D8CEBD] mt-0.5">
              Daily gross sales, bespoke custom commissions, and orders volume trajectory.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#1C1615] p-1 rounded-xl border border-[#3A2E2B]">
            <button
              onClick={() => setActiveMetric('gross')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeMetric === 'gross'
                  ? 'bg-[#C17D3C] text-white'
                  : 'text-[#D8CEBD] hover:text-white'
              }`}
            >
              Gross Sales (₹)
            </button>
            <button
              onClick={() => setActiveMetric('orders')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeMetric === 'orders'
                  ? 'bg-[#C17D3C] text-white'
                  : 'text-[#D8CEBD] hover:text-white'
              }`}
            >
              Order Count
            </button>
            <button
              onClick={() => setActiveMetric('aov')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeMetric === 'aov'
                  ? 'bg-[#C17D3C] text-white'
                  : 'text-[#D8CEBD] hover:text-white'
              }`}
            >
              Avg Order Value
            </button>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C17D3C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#C17D3C" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorBespoke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D27D2D" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#D27D2D" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A2E2B" opacity={0.5} />
              <XAxis
                dataKey="shortDate"
                stroke="#9E8E87"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#9E8E87"
                fontSize={11}
                tickLine={false}
                tickFormatter={(value) => {
                  if (activeMetric === 'orders') return `${value}`;
                  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
                  return `₹${value}`;
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1615',
                  borderColor: '#C17D3C',
                  borderRadius: '12px',
                  color: '#FAF6F0',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
                formatter={(value: any, name: any) => {
                  if (name === 'Orders Count') return [`${value} Orders`, name];
                  return [formatINR(Number(value)), name];
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#D8CEBD', paddingTop: '10px' }} />

              {activeMetric === 'gross' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="grossSalesINR"
                    name="Total Gross Sales"
                    stroke="#C17D3C"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorGross)"
                  />
                  <Area
                    type="monotone"
                    dataKey="bespokeRevenueINR"
                    name="Bespoke Custom Quotes"
                    stroke="#E6953B"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBespoke)"
                  />
                </>
              )}

              {activeMetric === 'orders' && (
                <Area
                  type="monotone"
                  dataKey="ordersCount"
                  name="Orders Count"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                />
              )}

              {activeMetric === 'aov' && (
                <Area
                  type="monotone"
                  dataKey="aovINR"
                  name="Average Order Value"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorGross)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRAPH 2: Website Visits vs Page Views Composed Chart */}
      <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-serif text-[#FAF6F0] font-bold flex items-center gap-2">
              <Eye size={18} className="text-blue-400" />
              <span>Website Visits & Page Views Telemetry</span>
            </h3>
            <p className="text-xs text-[#D8CEBD] mt-0.5">
              Dual-metric analysis comparing high-intent showroom visitors vs catalogue engagement depth.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#1C1615] p-1 rounded-xl border border-[#3A2E2B]">
            <button
              onClick={() => setTrafficMetric('both')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                trafficMetric === 'both' ? 'bg-blue-600 text-white' : 'text-[#D8CEBD] hover:text-white'
              }`}
            >
              Visits & Views
            </button>
            <button
              onClick={() => setTrafficMetric('visits')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                trafficMetric === 'visits' ? 'bg-blue-600 text-white' : 'text-[#D8CEBD] hover:text-white'
              }`}
            >
              Visits Only
            </button>
            <button
              onClick={() => setTrafficMetric('views')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                trafficMetric === 'views' ? 'bg-blue-600 text-white' : 'text-[#D8CEBD] hover:text-white'
              }`}
            >
              Page Views Only
            </button>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A2E2B" opacity={0.5} />
              <XAxis dataKey="shortDate" stroke="#9E8E87" fontSize={11} tickLine={false} />
              <YAxis stroke="#9E8E87" fontSize={11} tickLine={false} tickFormatter={(v) => v.toLocaleString('en-IN')} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1615',
                  borderColor: '#3B82F6',
                  borderRadius: '12px',
                  color: '#FAF6F0',
                  fontSize: '12px',
                }}
                formatter={(value: any, name: any) => [`${Number(value).toLocaleString('en-IN')}`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#D8CEBD', paddingTop: '10px' }} />

              {(trafficMetric === 'both' || trafficMetric === 'views') && (
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  name="Page Views"
                  stroke="#A855F7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              )}

              {(trafficMetric === 'both' || trafficMetric === 'visits') && (
                <Area
                  type="monotone"
                  dataKey="websiteVisits"
                  name="Website Visits"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row: Category Breakdown & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Sales Distribution */}
        <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif text-[#FAF6F0] font-bold flex items-center gap-2 mb-1">
              <Layers size={18} className="text-[#C17D3C]" />
              <span>Sales by Furniture Category</span>
            </h3>
            <p className="text-xs text-[#D8CEBD] mb-4">
              Revenue distribution across Living, Dining, Bedroom, Study, and Lighting.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="revenueINR"
                  nameKey="name"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1615',
                    borderColor: '#C17D3C',
                    borderRadius: '12px',
                    color: '#FAF6F0',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [formatINR(Number(value)), 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#3A2E2B]">
            {categoryData.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between p-2 rounded-lg bg-[#1C1615]/70">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-[#FAF6F0] truncate">{cat.name}</span>
                </div>
                <span className="font-mono text-[#C17D3C] font-semibold">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources & Customer Acquisition */}
        <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif text-[#FAF6F0] font-bold flex items-center gap-2 mb-1">
              <MousePointerClick size={18} className="text-emerald-400" />
              <span>Traffic Acquisition Channels</span>
            </h3>
            <p className="text-xs text-[#D8CEBD] mb-4">
              Where your high-value furniture buyers originate and convert.
            </p>
          </div>

          <div className="space-y-3.5 my-auto">
            {trafficSources.map((src) => (
              <div key={src.source} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#FAF6F0] font-medium">{src.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#9E8E87]">{src.visits.toLocaleString('en-IN')} visits</span>
                    <span className="text-emerald-400 font-semibold">{src.conversionRate}% conv.</span>
                    <span className="font-mono text-[#C17D3C] font-semibold">{formatINR(src.revenueINR)}</span>
                  </div>
                </div>
                <div className="w-full bg-[#1C1615] rounded-full h-2 overflow-hidden border border-[#3A2E2B]">
                  <div
                    className="bg-[#C17D3C] h-full rounded-full transition-all duration-500"
                    style={{ width: `${src.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#1C1615] rounded-xl border border-[#3A2E2B] text-xs text-[#D8CEBD] flex items-center justify-between mt-4">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400" />
              Highest ROI: <strong>Architectural Digest & Interior Designer Referrals</strong>
            </span>
            <span className="text-[#C17D3C] font-semibold font-mono">6.2% Max Conv</span>
          </div>
        </div>
      </div>
    </div>
  );
};
