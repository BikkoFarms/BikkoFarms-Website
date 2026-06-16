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
  title: 'BikkoChain | Farm Loans in Minutes, Not Months',
  description: 'BikkoChain helps cocoa and coffee farmers in Ghana get fast, affordable loans using their harvest as security — no bank visits, no land deeds, just Mobile Money.',
  keywords: [
    'BikkoChain',
    'farm loans Ghana',
    'mobile money farming loan',
    'cocoa farmer credit Ghana',
    'agricultural microfinance Africa',
    'smallholder farmer loans',
    'farming cooperative finance',
    'instant farm loan Mobile Money'
  ],
  authors: [{ name: 'BikkoChain Team' }],
  metadataBase: new URL('https://bikkochain.org'),
  openGraph: {
    title: 'BikkoChain | Farm Loans in Minutes, Not Months',
    description: 'BikkoChain helps cocoa and coffee farmers in Ghana get fast, affordable loans using their harvest as security — sent straight to their Mobile Money wallet.',
    url: 'https://bikkochain.org',
    siteName: 'BikkoChain',
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikkoChain | Farm Loans in Minutes, Not Months',
    description: 'BikkoChain helps cocoa and coffee farmers in Ghana get fast, affordable loans using their harvest as security — sent straight to their Mobile Money wallet.',
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
    'description': 'Agricultural microfinance service helping cocoa and coffee farmers in Ghana access fast, affordable loans using their harvest as security.',
    'url': 'https://bikkochain.org',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Kumasi',
      'addressRegion': 'Ashanti Region',
      'addressCountry': 'GH'
    },
    'areaServed': 'Ghana',
    'feesAndCommissionsSpecification': 'Fair 15% interest rate on harvest-secured farm loans'
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
