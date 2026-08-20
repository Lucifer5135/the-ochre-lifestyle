import React, { useState } from 'react';
import {
  Banknote,
  Receipt,
  Percent,
  Truck,
  TrendingUp,
  ShieldCheck,
  Download,
  Printer,
  Calendar,
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { atelierStore } from '../../lib/store';
import { FinancialSummary, OrderTrackInfo } from '../../types';

interface RevenueFinancialsViewProps {
  formatINR: (amount: number) => string;
}

export const RevenueFinancialsView: React.FC<RevenueFinancialsViewProps> = ({ formatINR }) => {
  const financialSummary: FinancialSummary = atelierStore.getFinancialSummary();
  const orders: Record<string, OrderTrackInfo> = atelierStore.getOrders();
  const orderList: OrderTrackInfo[] = Object.values(orders);

  const [filterPeriod, setFilterPeriod] = useState<'this-month' | 'last-quarter' | 'fy-current'>('this-month');
  const [searchTerm, setSearchTerm] = useState('');

  // Payment method breakdowns
  const paymentMethods = [
    { name: 'UPI & Instant Bank Transfer', share: 45, volumeINR: Math.round(financialSummary.grossRevenueINR * 0.45), icon: '⚡' },
    { name: 'Direct Net Banking (HDFC/ICICI/SBI)', share: 30, volumeINR: Math.round(financialSummary.grossRevenueINR * 0.30), icon: '🏦' },
    { name: 'Luxury Concierge & Amex Corporate', share: 15, volumeINR: Math.round(financialSummary.grossRevenueINR * 0.15), icon: '💳' },
    { name: 'Artisan Milestone Escrow (50-50 Split)', share: 10, volumeINR: Math.round(financialSummary.grossRevenueINR * 0.10), icon: '🛡️' },
  ];

  // Revenue by species
  const timberRevenue = [
    { species: '100% Kiln-Dried Plantation Teak', percent: 62, revenueINR: Math.round(financialSummary.grossRevenueINR * 0.62) },
    { species: 'Solid Indian Sheesham / Rosewood', percent: 24, revenueINR: Math.round(financialSummary.grossRevenueINR * 0.24) },
    { species: 'Solid European Ash & White Oak', percent: 14, revenueINR: Math.round(financialSummary.grossRevenueINR * 0.14) },
  ];

  // Filter orders for financial ledger
  const filteredOrders = orderList.filter((o) => {
    const q = searchTerm.toLowerCase();
    return (
      o.orderId.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.items.some((i) => i.name.toLowerCase().includes(q))
    );
  });

  // Export Financial Statement CSV
  const handleExportStatement = () => {
    const headers = ['Order ID', 'Patron Name', 'Order Date', 'Items Qty', 'Gross Total (INR)', 'GST 18% (INR)', 'Net Revenue (INR)', 'Status'];
    const rows = filteredOrders.map((o) => {
      const gross = o.items.reduce((s, it) => s + it.priceINR * it.qty, 0);
      const gst = Math.round(gross - gross / 1.18);
      const net = gross - gst;
      return [
        o.orderId,
        `"${o.customerName}"`,
        o.orderDate,
        o.items.reduce((s, it) => s + it.qty, 0),
        gross,
        gst,
        net,
        o.steps[o.currentStepIndex]?.title || 'In Production',
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the-ochre-financial-statement-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Financial Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#231B1A] p-6 rounded-2xl border border-amber-900/30">
        <div>
          <div className="flex items-center gap-2 text-[#C17D3C] text-xs font-semibold uppercase tracking-wider mb-1">
            <Receipt size={14} />
            <span>Executive Financial Desk & Treasury</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#FAF6F0] font-bold">
            Revenue, Tax (GST) & Profitability Summary
          </h2>
          <p className="text-xs text-[#D8CEBD] mt-1">
            Comprehensive audited ledger of gross receipts, 18% GST collections, logistics remittances, and month-end projections.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportStatement}
            className="flex items-center gap-2 px-4 py-2 bg-[#2B2220] hover:bg-[#3A2E2B] text-[#FAF6F0] border border-[#423430] rounded-xl text-xs font-medium transition-all cursor-pointer shadow-xs"
          >
            <Download size={14} className="text-[#C17D3C]" />
            <span>Export Financial Ledger (CSV)</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#C17D3C] hover:bg-[#A8652A] text-white rounded-xl text-xs font-medium transition-all cursor-pointer shadow-xs"
          >
            <Printer size={14} />
            <span>Print Financial Audit</span>
          </button>
        </div>
      </div>

      {/* 6 Key Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Gross Sales */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Total Gross Sales (Receipts)</span>
            <div className="p-2 bg-[#C17D3C]/10 text-[#C17D3C] rounded-lg">
              <Banknote size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {formatINR(financialSummary.grossRevenueINR)}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <TrendingUp size={13} />
              <span>+{financialSummary.monthOverMonthGrowth}% MoM growth velocity</span>
            </div>
          </div>
        </div>

        {/* Net Revenue */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Net Revenue (Excl. 18% GST)</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {formatINR(financialSummary.netRevenueINR)}
            </div>
            <div className="text-[11px] text-[#D8CEBD] mt-1">
              Direct timber craftsmanship & atelier realization
            </div>
          </div>
        </div>

        {/* GST 18% Collected */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>GST Collected (18% Statutory)</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Receipt size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {formatINR(financialSummary.gstCollectedINR)}
            </div>
            <div className="text-[11px] text-[#D8CEBD] mt-1">
              Ready for GSTR-1 & GSTR-3B tax filing
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Average Order Value (AOV)</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Percent size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {formatINR(financialSummary.averageOrderValueINR)}
            </div>
            <div className="text-[11px] text-[#D8CEBD] mt-1">
              Across {financialSummary.totalOrders} total completed orders
            </div>
          </div>
        </div>

        {/* Bespoke Custom Revenue */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Bespoke Studio Revenue</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight">
              {formatINR(financialSummary.bespokeRevenueINR)}
            </div>
            <div className="text-[11px] text-[#D8CEBD] mt-1">
              High-margin customized room dimensions
            </div>
          </div>
        </div>

        {/* Projected Month-End */}
        <div className="bg-[#231B1A] p-5 rounded-2xl border border-amber-900/20">
          <div className="flex items-center justify-between text-[#D8CEBD] text-xs">
            <span>Projected Month-End Run Rate</span>
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-serif text-[#FAF6F0] tracking-tight text-[#C17D3C]">
              {formatINR(financialSummary.projectedMonthEndINR)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              On track to exceed target by +14.2%
            </div>
          </div>
        </div>
      </div>

      {/* Row: Payment Gateways & Timber Species Realization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Channels */}
        <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20">
          <h3 className="text-base font-serif text-[#FAF6F0] font-bold mb-1 flex items-center gap-2">
            <CreditCard size={18} className="text-[#C17D3C]" />
            <span>Revenue by Payment Channel</span>
          </h3>
          <p className="text-xs text-[#D8CEBD] mb-4">
            Settlement breakdown across UPI, Net Banking, and Luxury Concierge gateways.
          </p>

          <div className="space-y-4">
            {paymentMethods.map((pm) => (
              <div key={pm.name} className="p-3 bg-[#1C1615] rounded-xl border border-[#3A2E2B] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#FAF6F0] font-medium flex items-center gap-2">
                    <span>{pm.icon}</span>
                    <span>{pm.name}</span>
                  </span>
                  <span className="font-mono text-[#C17D3C] font-semibold">{formatINR(pm.volumeINR)}</span>
                </div>
                <div className="w-full bg-[#2B2220] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#C17D3C] h-full rounded-full" style={{ width: `${pm.share}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#9E8E87]">
                  <span>{pm.share}% of total volume</span>
                  <span className="text-emerald-400">Zero settlement friction</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timber Species Share */}
        <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20">
          <h3 className="text-base font-serif text-[#FAF6F0] font-bold mb-1 flex items-center gap-2">
            <Building size={18} className="text-[#C17D3C]" />
            <span>Revenue by Solid Timber Species</span>
          </h3>
          <p className="text-xs text-[#D8CEBD] mb-4">
            Realized volume by raw lumber harvest (100% Solid species with 0% MDF).
          </p>

          <div className="space-y-4">
            {timberRevenue.map((tr) => (
              <div key={tr.species} className="p-3 bg-[#1C1615] rounded-xl border border-[#3A2E2B] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#FAF6F0] font-medium">{tr.species}</span>
                  <span className="font-mono text-[#C17D3C] font-semibold">{formatINR(tr.revenueINR)}</span>
                </div>
                <div className="w-full bg-[#2B2220] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${tr.percent}%`,
                      backgroundColor: tr.percent > 50 ? '#C17D3C' : tr.percent > 20 ? '#8B4513' : '#5C4033',
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#9E8E87]">
                  <span>{tr.percent}% contribution</span>
                  <span className="text-emerald-400">Seasoned to 8%-12% moisture</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction & Settlement Ledger Table */}
      <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-serif text-[#FAF6F0] font-bold flex items-center gap-2">
              <Receipt size={18} className="text-[#C17D3C]" />
              <span>Real-Time Financial Settlement Ledger</span>
            </h3>
            <p className="text-xs text-[#D8CEBD] mt-0.5">
              Live customer transaction receipts, GST splits, and logistics allowances.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-3 text-[#9E8E87]" />
            <input
              type="text"
              placeholder="Search by Order ID or Patron..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1C1615] border border-[#3A2E2B] rounded-xl pl-9 pr-3 py-2 text-xs text-[#FAF6F0] placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#D8CEBD]">
            <thead className="bg-[#1C1615] text-[#FAF6F0] uppercase tracking-wider font-semibold border-b border-[#3A2E2B]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Patron & Destination</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4 text-right">Gross Total (₹)</th>
                <th className="py-3 px-4 text-right">18% GST</th>
                <th className="py-3 px-4 text-right">Net Atelier Realization</th>
                <th className="py-3 px-4 text-center">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A2E2B]">
              {filteredOrders.map((order) => {
                const gross = order.items.reduce((s, it) => s + it.priceINR * it.qty, 0);
                const gst = Math.round(gross - gross / 1.18);
                const net = gross - gst;

                return (
                  <tr key={order.orderId} className="hover:bg-[#1C1615]/50 transition-colors">
                    <td className="py-3 px-4 font-mono">
                      <strong className="text-[#C17D3C] block">{order.orderId}</strong>
                      <span className="text-[11px] text-[#9E8E87]">{order.orderDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#FAF6F0]">{order.customerName}</div>
                      <div className="text-[11px] text-[#9E8E87] truncate max-w-xs">{order.deliveryAddress}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px]">{order.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#FAF6F0]">
                      {formatINR(gross)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-blue-400">
                      {formatINR(gst)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                      {formatINR(net)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Paid & Escrow Cleared
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
