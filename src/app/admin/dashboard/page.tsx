'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Phone, Mail, MapPin, Calendar, Download,
  Search, RefreshCw, LogOut, Sprout, FileSpreadsheet,
  FileText, Filter, ChevronLeft, ChevronRight, TrendingUp,
  UserCheck, Loader2, X, Trash2, Printer, CheckCircle, Clock,
  AlertOctagon, Eye, ExternalLink, Send
} from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  role: string;
  region: string | null;
  status: string;
  createdAt: string;
}

interface StatItem {
  role?: string;
  status?: string;
  region?: string | null;
  _count: {
    role?: number;
    status?: number;
    region?: number;
  };
}

interface ApiResponse {
  entries: WaitlistEntry[];
  total: number;
  page: number;
  pages: number;
  stats: StatItem[];
  statusStats: StatItem[];
  regionStats: StatItem[];
}

const ROLE_LABELS: Record<string, string> = {
  farmer: 'Farmer',
  coop: 'Co-op Leader',
  partner: 'Partner / Supporter',
};

const ROLE_COLORS: Record<string, string> = {
  farmer: 'bg-brand-green-500/15 text-brand-green-600 dark:text-brand-green-400 border-brand-green-500/20',
  coop: 'bg-brand-amber-500/15 text-brand-amber-600 dark:text-brand-amber-500 border-brand-amber-500/20',
  partner: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/20',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  contacted: 'Contacted',
  approved: 'Approved',
  rejected: 'Archived',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-neutral-border/60 text-text-secondary border-neutral-border',
  contacted: 'bg-brand-amber-500/10 text-brand-amber-600 dark:text-brand-amber-500 border-brand-amber-500/20',
  approved: 'bg-brand-green-500/10 text-brand-green-600 dark:text-brand-green-400 border-brand-green-500/20',
  rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = React.useState<ApiResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [exporting, setExporting] = React.useState<string | null>(null);
  const [reportDate, setReportDate] = React.useState('');

  React.useEffect(() => {
    setReportDate(new Date().toLocaleString('en-GB'));
  }, []);
  
  // Selection drawer state
  const [selectedEntry, setSelectedEntry] = React.useState<WaitlistEntry | null>(null);
  const [updatingStatus, setUpdatingStatus] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const searchRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchData = React.useCallback(async (p: number, s: string, role: string, region: string, statusVal: string) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(p), limit: '50' });
      if (s) params.set('search', s);
      if (role) params.set('role', role);
      if (region) params.set('region', region);
      if (statusVal) params.set('status', statusVal);
      
      const res = await fetch(`/api/admin/waitlist?${params}`);
      if (res.status === 401) { router.push('/admin'); return; }
      if (!res.ok) throw new Error('Failed to load data.');
      const json: ApiResponse = await res.json();
      setData(json);

      // Keep selection up-to-date if active
      if (selectedEntry) {
        const matching = json.entries.find((e) => e.id === selectedEntry.id);
        if (matching) setSelectedEntry(matching);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load.');
    } finally {
      setLoading(false);
    }
  }, [router, selectedEntry]);

  React.useEffect(() => {
    fetchData(page, search, roleFilter, regionFilter, statusFilter);
  }, [page, roleFilter, regionFilter, statusFilter, fetchData]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setPage(1);
      fetchData(1, value, roleFilter, regionFilter, statusFilter);
    }, 400);
  };

  const handleStatusChange = async (entryId: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch('/api/admin/waitlist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entryId, status: newStatus }),
      });
      if (!res.ok) throw new Error('Update status failed.');
      fetchData(page, search, roleFilter, regionFilter, statusFilter);
    } catch {
      alert('Failed to update status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this signup? This action cannot be undone.')) return;
    setDeletingId(entryId);
    try {
      const res = await fetch(`/api/admin/waitlist?id=${entryId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Deletion failed.');
      setSelectedEntry(null);
      fetchData(page, search, roleFilter, regionFilter, statusFilter);
    } catch {
      alert('Failed to delete entry.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExport = async (format: 'csv' | 'excel' | 'json') => {
    setExporting(format);
    try {
      const res = await fetch(`/api/admin/export?format=${format}`);
      if (!res.ok) throw new Error('Export failed.');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bikkochain-waitlist.${format === 'excel' ? 'xlsx' : format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  // Helper stats aggregates
  const totalFarmers = data?.stats.find((s) => s.role === 'farmer')?._count.role ?? 0;
  const totalCoops = data?.stats.find((s) => s.role === 'coop')?._count.role ?? 0;
  const totalPartners = data?.stats.find((s) => s.role === 'partner')?._count.role ?? 0;

  const pendingCount = data?.statusStats.find((s) => s.status === 'pending')?._count.status ?? 0;
  const contactedCount = data?.statusStats.find((s) => s.status === 'contacted')?._count.status ?? 0;
  const approvedCount = data?.statusStats.find((s) => s.status === 'approved')?._count.status ?? 0;

  return (
    <div className="min-h-screen bg-neutral-bg text-text-primary print:bg-white print:text-black">
      
      {/* Top Nav Bar */}
      <header className="sticky top-0 z-40 bg-neutral-card/90 backdrop-blur-md border-b border-neutral-border px-6 py-4 flex items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-green-600 flex items-center justify-center text-white shadow-md shadow-brand-green-600/20">
            <Sprout className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary leading-none">BikkoChain Admin</h1>
            <p className="text-[10px] text-text-muted mt-0.5 font-mono">Waitlist Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Export / Print Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-neutral-border rounded-lg hover:border-brand-green-500/40 hover:text-brand-green-600 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>
            {(['csv', 'excel'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleExport(fmt)}
                disabled={!!exporting}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-neutral-border rounded-lg hover:border-brand-green-500/40 hover:text-brand-green-600 transition-all disabled:opacity-50 cursor-pointer"
              >
                {exporting === fmt ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : fmt === 'csv' ? (
                  <FileText className="w-3.5 h-3.5" />
                ) : (
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                )}
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchData(page, search, roleFilter, regionFilter, statusFilter)}
            className="w-9 h-9 flex items-center justify-center border border-neutral-border rounded-lg hover:border-brand-green-500/40 transition-colors cursor-pointer"
            aria-label="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-green-500' : 'text-text-secondary'}`} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Printable Report Header */}
      <div className="hidden print:block mb-8 border-b border-black pb-4">
        <h1 className="text-2xl font-bold font-serif text-black">BikkoChain — Waitlist Registrants Export Report</h1>
        <p className="text-xs text-neutral-600 mt-1">Generated: {reportDate}</p>
        <p className="text-xs text-neutral-600">Total signups recorded: {data?.total ?? '—'}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 print:py-0 print:space-y-4">

        {/* Summary Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4">
          {[
            {
              label: 'Total Signups',
              value: data?.total ?? '—',
              icon: Users,
              color: 'text-text-primary',
              bg: 'bg-neutral-card',
            },
            {
              label: 'Pending Approval',
              value: pendingCount || '—',
              icon: Clock,
              color: 'text-brand-amber-500',
              bg: 'bg-brand-amber-500/5',
            },
            {
              label: 'Contacted',
              value: contactedCount || '—',
              icon: Phone,
              color: 'text-sky-500',
              bg: 'bg-sky-500/5',
            },
            {
              label: 'Approved Access',
              value: approvedCount || '—',
              icon: CheckCircle,
              color: 'text-brand-green-500',
              bg: 'bg-brand-green-500/5',
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`${stat.bg} border border-neutral-border rounded-2xl p-5 flex flex-col gap-3 print:border-neutral-300 print:bg-white`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider print:text-neutral-500">{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color} print:text-black`} />
                </div>
                <p className={`text-3xl font-serif font-bold ${stat.color} print:text-black`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Horizontal Progress breakdown bars */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
            {/* Roles card */}
            <div className="bg-neutral-card border border-neutral-border rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Signups by Role</h3>
              <div className="space-y-3">
                {[
                  { key: 'farmer', label: 'Farmers', count: totalFarmers, color: 'bg-brand-green-500' },
                  { key: 'coop', label: 'Co-op Leaders', count: totalCoops, color: 'bg-brand-amber-500' },
                  { key: 'partner', label: 'Partners', count: totalPartners, color: 'bg-sky-500' }
                ].map((roleObj) => {
                  const percent = data.total > 0 ? (roleObj.count / data.total) * 100 : 0;
                  return (
                    <div key={roleObj.key} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-text-secondary">{roleObj.label}</span>
                        <span className="text-text-primary">{roleObj.count} ({percent.toFixed(0)}%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-bg border border-neutral-border rounded-full overflow-hidden">
                        <div className={`h-full ${roleObj.color}`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Regions list breakdown */}
            <div className="bg-neutral-card border border-neutral-border rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Top Regions</h3>
              <div className="space-y-3 max-h-[145px] overflow-y-auto pr-1">
                {data.regionStats.length === 0 ? (
                  <p className="text-xs text-text-muted py-2">No regional data recorded yet.</p>
                ) : (
                  data.regionStats.map((regObj) => {
                    const count = regObj._count.region ?? 0;
                    const name = regObj.region ?? 'Unknown / Not specified';
                    const percent = data.total > 0 ? (count / data.total) * 100 : 0;
                    return (
                      <div key={name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-text-secondary truncate max-w-[200px]">{name}</span>
                          <span className="text-text-primary">{count} ({percent.toFixed(0)}%)</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-bg border border-neutral-border rounded-full overflow-hidden">
                          <div className="h-full bg-brand-green-600" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search Panel */}
        <div className="bg-neutral-card border border-neutral-border rounded-2xl p-5 space-y-4 print:hidden">
          <div className="flex flex-wrap gap-3 items-end">
            
            {/* Search input */}
            <div className="flex-grow min-w-[200px]">
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Name, email, or phone…"
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-none focus:border-brand-green-500 transition-colors placeholder:text-text-muted"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(''); handleSearchChange(''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div className="min-w-[140px]">
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Pipeline Status</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-none focus:border-brand-green-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Archived</option>
                </select>
              </div>
            </div>

            {/* Role filter */}
            <div className="min-w-[140px]">
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Role</label>
              <div className="relative flex">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <select
                  value={roleFilter}
                  onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-none focus:border-brand-green-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="">All Roles</option>
                  <option value="farmer">Farmers</option>
                  <option value="coop">Co-op Leaders</option>
                  <option value="partner">Partners</option>
                </select>
              </div>
            </div>

            {/* Region filter */}
            <div className="min-w-[160px]">
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Region</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <select
                  value={regionFilter}
                  onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-none focus:border-brand-green-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="">All Regions</option>
                  <option>Ashanti Region</option>
                  <option>Western Region</option>
                  <option>Eastern Region</option>
                  <option>Central Region</option>
                  <option>Brong-Ahafo Region</option>
                  <option>Northern Region</option>
                  <option>Other Region</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result count & reset */}
          {data && (
            <p className="text-xs text-text-muted">
              Showing <span className="font-semibold text-text-secondary">{data.entries.length}</span> of{' '}
              <span className="font-semibold text-text-secondary">{data.total}</span> results
              {(search || roleFilter || regionFilter || statusFilter) && (
                <button
                  onClick={() => { setSearch(''); setRoleFilter(''); setRegionFilter(''); setStatusFilter(''); setPage(1); }}
                  className="ml-2 text-brand-green-500 hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </p>
          )}
        </div>

        {/* Layout Wrapper for Table & Details flyout sidebar */}
        <div className="flex gap-6 items-start">
          
          {/* Main List Table */}
          <div className="flex-grow bg-neutral-card border border-neutral-border rounded-2xl overflow-hidden shadow-xs print:border-none print:shadow-none">
            {error ? (
              <div className="p-12 text-center text-red-400 text-sm">{error}</div>
            ) : loading && !data ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-green-500 mx-auto" />
                <p className="text-sm text-text-muted mt-4">Loading waitlist database…</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-border bg-neutral-bg/60 print:bg-white print:border-black">
                        <th className="text-left px-6 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider print:text-black">Name</th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider print:text-black">Contact Details</th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider print:text-black">Role</th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider print:text-black">Region</th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider print:text-black">Status</th>
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider print:text-black">Joined</th>
                        <th className="text-right px-6 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider print:hidden">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y divide-neutral-border/50 print:divide-neutral-300 ${loading ? 'opacity-50' : ''}`}>
                      {(data?.entries ?? []).length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-text-muted text-sm">
                            No matching signups found.
                          </td>
                        </tr>
                      ) : (
                        (data?.entries ?? []).map((entry) => (
                          <tr
                            key={entry.id}
                            onClick={() => setSelectedEntry(entry)}
                            className={`hover:bg-neutral-bg/40 transition-colors group cursor-pointer ${
                              selectedEntry?.id === entry.id ? 'bg-neutral-bg' : ''
                            }`}
                          >
                            <td className="px-6 py-4 font-semibold text-text-primary print:text-black">{entry.name}</td>
                            <td className="px-4 py-4 space-y-1">
                              {entry.phone && (
                                <div className="flex items-center gap-1.5 text-text-secondary text-xs print:text-black">
                                  <Phone className="w-3 h-3 text-text-muted print:hidden" />
                                  {entry.phone}
                                </div>
                              )}
                              {entry.email && (
                                <div className="flex items-center gap-1.5 text-text-secondary text-xs print:text-black">
                                  <Mail className="w-3 h-3 text-text-muted print:hidden" />
                                  {entry.email}
                                </div>
                              )}
                              {!entry.phone && !entry.email && (
                                <span className="text-text-muted text-xs">No contact details</span>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${ROLE_COLORS[entry.role] ?? 'bg-neutral-border/40 text-text-muted border-neutral-border'} print:border-neutral-400 print:text-black print:bg-white`}>
                                {ROLE_LABELS[entry.role] ?? entry.role}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              {entry.region ? (
                                <div className="flex items-center gap-1.5 text-xs text-text-secondary print:text-black">
                                  <MapPin className="w-3 h-3 text-text-muted flex-shrink-0 print:hidden" />
                                  {entry.region}
                                </div>
                              ) : (
                                <span className="text-text-muted text-xs">—</span>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${STATUS_COLORS[entry.status] ?? STATUS_COLORS.pending} print:border-neutral-400 print:text-black print:bg-white`}>
                                {STATUS_LABELS[entry.status] ?? entry.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5 text-xs text-text-secondary print:text-black">
                                <Calendar className="w-3 h-3 text-text-muted print:hidden" />
                                {new Date(entry.createdAt).toLocaleDateString('en-GB', {
                                  day: '2-digit', month: 'short', year: 'numeric',
                                })}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right print:hidden" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedEntry(entry)}
                                  className="p-1.5 border border-neutral-border rounded-lg hover:border-brand-green-500/40 text-text-secondary hover:text-brand-green-600 transition-all cursor-pointer"
                                  title="View details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEntry(entry.id)}
                                  disabled={deletingId === entry.id}
                                  className="p-1.5 border border-red-500/10 rounded-lg hover:border-red-500/40 text-red-400 hover:bg-red-500/5 transition-all cursor-pointer disabled:opacity-50"
                                  title="Delete signup"
                                >
                                  {deletingId === entry.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className={`md:hidden divide-y divide-neutral-border/50 print:hidden ${loading ? 'opacity-50' : ''}`}>
                  {(data?.entries ?? []).length === 0 ? (
                    <div className="p-8 text-center text-text-muted text-sm">No signups found.</div>
                  ) : (
                    (data?.entries ?? []).map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => setSelectedEntry(entry)}
                        className={`p-5 space-y-3 cursor-pointer transition-colors ${
                          selectedEntry?.id === entry.id ? 'bg-neutral-bg' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-text-primary text-sm">{entry.name}</h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border flex-shrink-0 ${STATUS_COLORS[entry.status] ?? STATUS_COLORS.pending}`}>
                            {STATUS_LABELS[entry.status] ?? entry.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs text-text-secondary">
                          {entry.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-text-muted" />{entry.phone}</div>}
                          {entry.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-text-muted" />{entry.email}</div>}
                          {entry.region && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-text-muted" />{entry.region}</div>}
                        </div>
                        <div className="flex items-center justify-between gap-4 pt-2 border-t border-neutral-border/40 text-[10px]">
                          <span className={`px-2 py-0.5 rounded-full font-bold border ${ROLE_COLORS[entry.role]}`}>
                            {ROLE_LABELS[entry.role] ?? entry.role}
                          </span>
                          <span className="text-text-muted">
                            {new Date(entry.createdAt).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {data && data.pages > 1 && (
                  <div className="px-6 py-4 border-t border-neutral-border/50 flex items-center justify-between gap-4 print:hidden">
                    <p className="text-xs text-text-muted">
                      Page {data.page} of {data.pages}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="w-9 h-9 flex items-center justify-center border border-neutral-border rounded-lg disabled:opacity-40 hover:border-brand-green-500/40 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                        disabled={page === data.pages}
                        className="w-9 h-9 flex items-center justify-center border border-neutral-border rounded-lg disabled:opacity-40 hover:border-brand-green-500/40 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Flyout Panel (Selected Entry details CRM workflow) */}
          {selectedEntry && (
            <div className="w-[360px] flex-shrink-0 bg-neutral-card border border-neutral-border rounded-2xl shadow-lg p-6 space-y-6 sticky top-24 print:hidden animate-in fade-in slide-in-from-right-4 duration-200">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-border/60">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-text-primary leading-tight">{selectedEntry.name}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${ROLE_COLORS[selectedEntry.role]}`}>
                    {ROLE_LABELS[selectedEntry.role] ?? selectedEntry.role}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="w-7 h-7 rounded-full bg-neutral-bg border border-neutral-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Management Selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider">Pipeline Status</label>
                <div className="relative">
                  <select
                    value={selectedEntry.status}
                    disabled={updatingStatus}
                    onChange={(e) => handleStatusChange(selectedEntry.id, e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-none focus:border-brand-green-500 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <option value="pending">⏳ Pending Review</option>
                    <option value="contacted">📞 Contacted Lead</option>
                    <option value="approved">✅ Approved Access</option>
                    <option value="rejected">📁 Archived / Junk</option>
                  </select>
                  {updatingStatus && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-4 h-4 animate-spin text-brand-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information Details */}
              <div className="space-y-4">
                <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider">Contact Details</label>
                <div className="space-y-3">
                  {selectedEntry.phone ? (
                    <div className="flex items-center justify-between gap-2 p-3 bg-neutral-bg rounded-xl border border-neutral-border/40">
                      <div className="min-w-0">
                        <p className="text-[10px] text-text-muted uppercase font-bold font-mono">Mobile</p>
                        <p className="text-sm font-semibold text-text-primary truncate">{selectedEntry.phone}</p>
                      </div>
                      <a
                        href={`https://wa.me/${selectedEntry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedEntry.name)}%2C%20this%20is%20the%20BikkoChain%20team%20reaching%20out%20about%20your%20waitlist%20signup%21`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-green-500/10 text-brand-green-600 dark:text-brand-green-400 hover:bg-brand-green-500/20 text-xs font-bold rounded-lg transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        WhatsApp
                      </a>
                    </div>
                  ) : (
                    <p className="text-xs text-text-muted italic">No mobile phone listed</p>
                  )}

                  {selectedEntry.email ? (
                    <div className="flex items-center justify-between gap-2 p-3 bg-neutral-bg rounded-xl border border-neutral-border/40">
                      <div className="min-w-0">
                        <p className="text-[10px] text-text-muted uppercase font-bold font-mono">Email</p>
                        <p className="text-sm font-semibold text-text-primary truncate">{selectedEntry.email}</p>
                      </div>
                      <a
                        href={`mailto:${selectedEntry.email}?subject=BikkoChain%20Waitlist%20Updates&body=Hello%20${encodeURIComponent(selectedEntry.name)}%2C%0A%0AThank%20you%20for%20joining%20the%20BikkoChain%20waitlist.%20We%20will%20reach%20out%20as%20soon%20as%20access%20is%20available%20in%20your%20region.`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 text-xs font-bold rounded-lg transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        Email
                      </a>
                    </div>
                  ) : (
                    <p className="text-xs text-text-muted italic">No email address listed</p>
                  )}

                  <div className="p-3 bg-neutral-bg rounded-xl border border-neutral-border/40 space-y-1">
                    <p className="text-[10px] text-text-muted uppercase font-bold font-mono">Region</p>
                    <p className="text-sm font-semibold text-text-primary">{selectedEntry.region ?? 'Unknown Region'}</p>
                  </div>

                  <div className="p-3 bg-neutral-bg rounded-xl border border-neutral-border/40 space-y-1">
                    <p className="text-[10px] text-text-muted uppercase font-bold font-mono">Signed up</p>
                    <p className="text-xs text-text-secondary">
                      {new Date(selectedEntry.createdAt).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions inside details */}
              <div className="pt-4 border-t border-neutral-border/60">
                <button
                  onClick={() => handleDeleteEntry(selectedEntry.id)}
                  className="w-full flex items-center justify-center gap-2 h-10 border border-red-500/20 text-red-500 hover:bg-red-500/5 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Signup Records
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
