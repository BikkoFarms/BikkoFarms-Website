/**
 * Design Tokens for BikkoChain
 * Acts as the single source of truth for design styles across marketing and product.
 */

export const tokens = {
  colors: {
    dark: {
      background: '#040604',       // Deep Forest Obsidian
      cardBackground: '#0b0f0c',   // Dark Charcoal with subtle green tint
      border: '#161e18',           // Low-contrast green border
      textPrimary: '#fafaf9',      // Soft Alabaster
      textSecondary: '#a3a3a3',    // Warm Muted Gray
      textMuted: '#525252',        // Slate Muted
    },
    light: {
      background: '#FAF9F6',       // Warm Organic Sand White
      cardBackground: '#ffffff',   // Pure White
      border: '#e7e5e4',           // Stone Muted
      textPrimary: '#1c1917',      // Deep Stone Charcoal
      textSecondary: '#57534e',    // Muted Stone Gray
      textMuted: '#a8a29e',        // Light Stone Muted
    },
    brand: {
      // Emerald Crop Green
      green50: '#f0fdf4',
      green100: '#dcfce7',
      green500: '#16a34a',
      green600: '#15803d',
      green700: '#166534',
      green900: '#14532d',
      
      // Warm Earth Cocoa
      amber50: '#fffbeb',
      amber100: '#fef3c7',
      amber500: '#d97706',
      amber600: '#b45309',
      amber700: '#92400e',
      
      // Lisk Blockchain Highlights
      liskBlue: '#0ea5e9',
      liskCyan: '#06b6d4',
    }
  },
  
  typography: {
    fontSans: 'var(--font-sans, "Inter", sans-serif)',
    fontSerif: 'var(--font-serif, "Outfit", serif)',
    
    sizes: {
      hero: 'clamp(2.5rem, 5vw, 4.5rem)',      // Responsively scaled heading
      sectionTitle: 'clamp(2rem, 4vw, 3rem)',
      subtitle: 'clamp(1.125rem, 2vw, 1.5rem)',
      body: '1rem',
      caption: '0.875rem',
      metrics: 'clamp(2.5rem, 6vw, 4rem)',
    },
    
    weights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  
  spacing: {
    containerPadding: 'clamp(1rem, 5vw, 6rem)',
    sectionGap: 'clamp(4rem, 10vw, 8rem)',
    cardPadding: '2rem',
    gapSm: '0.75rem',
    gapMd: '1.5rem',
    gapLg: '3rem',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  
  shadows: {
    soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    medium: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
    glowGreen: '0 0 30px -5px rgba(22, 163, 74, 0.15)',
    glowBlue: '0 0 30px -5px rgba(14, 165, 233, 0.15)',
  },
  
  animations: {
    durationFast: '150ms',
    durationNormal: '300ms',
    durationSlow: '600ms',
    springProps: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
  
  zIndex: {
    base: '0',
    header: '50',
    modal: '100',
    popover: '60',
  }
};
