import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | BikkoChain',
  description: 'BikkoChain Waitlist Management Dashboard — restricted access.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
