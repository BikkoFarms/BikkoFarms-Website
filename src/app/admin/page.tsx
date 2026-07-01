'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sprout, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.error ?? 'Login failed. Check your password.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-brand-green-500/8 glow-blur pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-green-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-green-600/30">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-text-primary">BikkoChain Admin</h1>
            <p className="text-sm text-text-secondary mt-1">Waitlist Management Dashboard</p>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-neutral-card border border-neutral-border rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-brand-green-500" />
            <span className="text-sm font-semibold text-text-secondary">Secure Access</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full h-11 px-4 pr-11 rounded-xl bg-neutral-bg border border-neutral-border text-sm text-text-primary focus:outline-none focus:border-brand-green-500 transition-colors placeholder:text-text-muted"
                  aria-label="Admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 font-semibold bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full h-11 bg-brand-green-600 hover:bg-brand-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Access restricted to authorised BikkoChain staff.
        </p>
      </div>
    </div>
  );
}
