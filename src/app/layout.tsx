import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/layout/ThemeProvider';
import { AnalyticsTracker } from '../components/shared/Analytics';
import { Ambient3DBackground } from '../components/ui/Ambient3DBackground';

// Load Inter for Sans interface typography
const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

// Load Outfit for editorial Serif/Display titles
const outfit = Outfit({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BikkoChain | Instant Crop Collateralized Loans for Smallholder Farmers',
  description: 'Enable smallholder cocoa and coffee farmers in Ghana to secure near-instant agricultural micro-loans using tokenized future harvests as collateral. Powered by the Lisk blockchain and Kotani Pay mobile money off-ramps.',
  keywords: [
    'BikkoChain',
    'agritech loans Ghana',
    'crop tokenization Lisk',
    'decentralized microfinance Africa',
    'Mobile Money lending',
    'cocoa harvest collateral RWA',
    'EVM lending escrow',
    'EUDR crop traceability blockchain'
  ],
  authors: [{ name: 'BikkoChain Team' }],
  metadataBase: new URL('https://bikkochain.org'),
  openGraph: {
    title: 'BikkoChain | Instant Crop Collateralized Loans for Smallholder Farmers',
    description: 'Empower farmers to secure instant micro-loans directly to their mobile money wallets using future crop harvests as collateral. Built on Lisk Network.',
    url: 'https://bikkochain.org',
    siteName: 'BikkoChain',
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikkoChain | Instant Crop Collateralized Loans',
    description: 'Empower farmers to secure instant micro-loans directly to their mobile money wallets using future crop harvests as collateral. Built on Lisk Network.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD metadata schema for trust and SEO validation
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    'name': 'BikkoChain',
    'description': 'Decentralized agricultural microfinance platform tokenizing future harvests as collateral on the Lisk blockchain.',
    'url': 'https://bikkochain.org',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Kumasi',
      'addressRegion': 'Ashanti Region',
      'addressCountry': 'GH'
    },
    'areaServed': 'Ghana',
    'feesAndCommissionsSpecification': 'Competitive 15% APY crop collateralized micro-loans'
  };

  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} min-h-full flex flex-col font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsTracker />
          <Ambient3DBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
