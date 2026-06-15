# Skill Manual: Landing Page Design

Guidelines and code conventions for implementing highly premium, high-converting marketing UI.

---

## 🎯 Purpose
To guide the creation of the public-facing portal for BikkoChain, ensuring it is visually breathtaking (wow factor), highly interactive, mobile-responsive, and optimized for fast loading even in low-bandwidth regions (e.g. rural Ghana).

---

## 💡 Best Practices

* **Curated Harmonious Colors:** Avoid generic primary/secondary colors. Use a premium, organic palette: deep jungle greens, earthy clays, warm harvest golds, and charcoal-graphite for contrast.
* **Modern Typography:** Pair high-end serif titles (e.g., *Outfit*, *Playfair*) with clean, highly readable body sans-serif fonts (e.g., *Inter*).
* **Interactivity & Micro-animations:** Employ CSS transitions and Framer Motion for scroll-linked fades, button hover scales, and hover states.
* **Asset Optimization:** Always use optimized WebP/SVG files. Never load raw PNGs/JPEGs. Use responsive image components (`next/image`) with correct `sizes` properties.

---

## 🛑 Constraints

* **Strict Tailwind v4 / Vanilla CSS:** Avoid custom arbitrary Tailwind values where possible; define design system tokens inside the theme configuration.
* **Layout Responsiveness:** The UI must be fully fluid from 320px up to 1920px widths. Check column wrapping, overflow behaviors, and padding on mobile widths.
* **Bundle Budget:** Minimize external JS libraries to maintain sub-second page loads on slow networks (3G/4G).

---

## 📐 Code Conventions

* **Server vs Client Components:** Keep pages as React Server Components (RSC) to maximize static rendering speeds. Extract client-side animations, forms, and accordions into small `"use client"` leaf components.
* **Semantic Structure:** Always wrap top-level layout sections in `<header>`, `<main>`, `<section>`, and `<footer>` tags. Ensure heading tags (`<h1>` to `<h6>`) nest sequentially.

---

## ⚠️ Common Pitfalls

* **Font Layout Shift (CLS):** Ensure local fallbacks are active while Google Fonts load.
* **Heavy Animations:** Using resource-intensive JS animation loops that drain mobile batteries and cause stuttering. Use GPU-accelerated CSS properties (`transform`, `opacity`).
* **Broken Image Alt Texts:** Missing or generic `alt` attributes on images, degrading SEO and accessibility.

---

## ✅ Acceptance Criteria

1. **Lighthouse Score:** 90+ across Performance, Accessibility, Best Practices, and SEO.
2. **Device Responsiveness:** Pixel-perfect layout across iPhone, Android, tablets, and standard desktop screens.
3. **No Unstyled Content (FOUC):** Style tags load instantly; page contains zero flickering or layout shifts.
