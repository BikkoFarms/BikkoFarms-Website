'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Phone, Mail, MapPin, Calendar, Download,
  Search, RefreshCw, LogOut, Sprout, FileSpreadsheet,
  FileText, Filter, ChevronLeft, ChevronRight, TrendingUp,
  UserCheck, Loader2, X
} from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  role: string;
  region: string | null;
  createdAt: string;
}

interface ApiResponse {
  entries: WaitlistEntry[];
  total: number;
  page: number;
  pages: number;
  stats: { role: string; _count: { role: number } }[];
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

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = React.useState<ApiResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('');
  const [exporting, setExporting] = React.useState<string | null>(null);
  const searchRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchData = React.useCallback(async (p: number, s: string, role: string, region: string) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(p), limit: '50' });
      if (s) params.set('search', s);
      if (role) params.set('role', role);
      if (region) params.set('region', region);
      const res = await fetch(`/api/admin/waitlist?${params}`);
      if (res.status === 401) { router.push('/admin'); return; }
      if (!res.ok) throw new Error('Failed to load data.');
      const json: ApiResponse = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    fetchData(page, search, roleFilter, regionFilter);
  }, [page, roleFilter, regionFilter, fetchData]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setPage(1);
      fetchData(1, value, roleFilter, regionFilter);
    }, 400);
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

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  const totalFarmers = data?.stats.find((s) => s.role === 'farmer')?._count.role ?? 0;
  const totalCoops = data?.stats.find((s) => s.role === 'coop')?._count.role ?? 0;
  const totalPartners = data?.stats.find((s) => s.role === 'partner')?._count.role ?? 0;

  return (
    <div className="min-h-screen bg-neutral-bg text-text-primary">
      {/* Top Nav Bar */}
      <header className="sticky top-0 z-40 bg-neutral-card/90 backdrop-blur-md border-b border-neutral-border px-6 py-4 flex items-center justify-between gap-4">
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
          {/* Export Buttons */}
          <div className="hidden sm:flex items-center gap-2">
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
            onClick={() => fetchData(page, search, roleFilter, regionFilter)}
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Total Signups',
              value: data?.total ?? '—',
              icon: Users,
              color: 'text-text-primary',
              bg: 'bg-neutral-card',
            },
            {
              label: 'Farmers',
              value: totalFarmers || '—',
              icon: Sprout,
              color: 'text-brand-green-500',
              bg: 'bg-brand-green-500/5',
            },
            {
              label: 'Co-op Leaders',
              value: totalCoops || '—',
              icon: UserCheck,
              color: 'text-brand-amber-500',
              bg: 'bg-brand-amber-500/5',
            },
            {
              label: 'Partners',
              value: totalPartners || '—',
              icon: TrendingUp,
              color: 'text-sky-500',
              bg: 'bg-sky-500/5',
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`${stat.bg} border border-neutral-border rounded-2xl p-5 flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className={`text-3xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filters & Search */}
        <div className="bg-neutral-card border border-neutral-border rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap gap-3 items-end">
            {/* Search */}
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

            {/* Role filter */}
            <div className="min-w-[160px]">
              <label className="block text-xs font-semibold text-text-muted mb-1.5">Role</label>
              <div className="relative">
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
            <div className="min-w-[180px]">
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

            {/* Mobile export */}
            <div className="flex sm:hidden items-center gap-2 ml-auto">
              <button onClick={() => handleExport('csv')} disabled={!!exporting} className="flex items-center gap-1.5 px-3 py-2 h-10 text-xs font-semibold border border-neutral-border rounded-xl hover:border-brand-green-500/40 transition-all cursor-pointer disabled:opacity-50">
                <Download className="w-3.5 h-3.5" />CSV
              </button>
              <button onClick={() => handleExport('excel')} disabled={!!exporting} className="flex items-center gap-1.5 px-3 py-2 h-10 text-xs font-semibold border border-neutral-border rounded-xl hover:border-brand-green-500/40 transition-all cursor-pointer disabled:opacity-50">
                <FileSpreadsheet className="w-3.5 h-3.5" />XLS
              </button>
            </div>
          </div>

          {/* Result count */}
          {data && (
            <p className="text-xs text-text-muted">
              Showing <span className="font-semibold text-text-secondary">{data.entries.length}</span> of{' '}
              <span className="font-semibold text-text-secondary">{data.total}</span> results
              {(search || roleFilter || regionFilter) && (
                <button
                  onClick={() => { setSearch(''); setRoleFilter(''); setRegionFilter(''); setPage(1); }}
                  className="ml-2 text-brand-green-500 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </p>
          )}
        </div>

        {/* Table */}
        <div className="bg-neutral-card border border-neutral-border rounded-2xl overflow-hidden">
          {error ? (
            <div className="p-12 text-center text-red-400 text-sm">{error}</div>
          ) : loading && !data ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand-green-500 mx-auto" />
              <p className="text-sm text-text-muted mt-4">Loading waitlist…</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-border bg-neutral-bg/60">
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">Name</th>
                      <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">Contact</th>
                      <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">Role</th>
                      <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">Region</th>
                      <th className="text-left px-4 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-neutral-border/50 ${loading ? 'opacity-50' : ''}`}>
                    {(data?.entries ?? []).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-text-muted text-sm">
                          No entries found.
                        </td>
                      </tr>
                    ) : (
                      (data?.entries ?? []).map((entry) => (
                        <tr key={entry.id} className="hover:bg-neutral-bg/40 transition-colors group">
                          <td className="px-6 py-4 font-semibold text-text-primary">{entry.name}</td>
                          <td className="px-4 py-4 space-y-1">
                            {entry.phone && (
                              <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                                <Phone className="w-3 h-3 text-text-muted" />
                                {entry.phone}
                              </div>
                            )}
                            {entry.email && (
                              <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                                <Mail className="w-3 h-3 text-text-muted" />
                                {entry.email}
                              </div>
                            )}
                            {!entry.phone && !entry.email && (
                              <span className="text-text-muted text-xs">No contact</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${ROLE_COLORS[entry.role] ?? 'bg-neutral-border/40 text-text-muted border-neutral-border'}`}>
                              {ROLE_LABELS[entry.role] ?? entry.role}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {entry.region ? (
                              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                                <MapPin className="w-3 h-3 text-text-muted flex-shrink-0" />
                                {entry.region}
                              </div>
                            ) : (
                              <span className="text-text-muted text-xs">—</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                              <Calendar className="w-3 h-3 text-text-muted" />
                              {new Date(entry.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short', year: 'numeric',
                              })}
                            </div>
                            <p className="text-[10px] text-text-muted mt-0.5 pl-4.5">
                              {new Date(entry.createdAt).toLocaleTimeString('en-GB', {
                                hour: '2-digit', minute: '2-digit',
                              })}
                            </p>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className={`md:hidden divide-y divide-neutral-border/50 ${loading ? 'opacity-50' : ''}`}>
                {(data?.entries ?? []).length === 0 ? (
                  <div className="p-8 text-center text-text-muted text-sm">No entries found.</div>
                ) : (
                  (data?.entries ?? []).map((entry) => (
                    <div key={entry.id} className="p-5 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-text-primary text-sm">{entry.name}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border flex-shrink-0 ${ROLE_COLORS[entry.role] ?? 'bg-neutral-border/40 text-text-muted border-neutral-border'}`}>
                          {ROLE_LABELS[entry.role] ?? entry.role}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-text-secondary">
                        {entry.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-text-muted" />{entry.phone}</div>}
                        {entry.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-text-muted" />{entry.email}</div>}
                        {entry.region && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-text-muted" />{entry.region}</div>}
                        <div className="flex items-center gap-1.5 text-text-muted"><Calendar className="w-3 h-3" />{new Date(entry.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {data && data.pages > 1 && (
                <div className="px-6 py-4 border-t border-neutral-border/50 flex items-center justify-between gap-4">
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

      </div>
    </div>
  );
}
