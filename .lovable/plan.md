# DhakaStar — One-Page Premium Landing

The project is a TanStack Start + React + Tailwind app, so I'll implement the site as a single route (`src/routes/index.tsx`) rather than a standalone HTML file. All visuals, animations, and behavior from your spec will be preserved — just delivered through the existing stack (no routing, no extra pages, no nav).

## Scope (one page only)
- Hero with animated frost particles + gold pulse CTA
- Exactly 3 product cards (FrostMax 280L, CoolPro 350L, EliteFresh 450L)
- Product modal (details + Order Now)
- Order modal (Name, Phone, Address, Quantity, COD pre-selected, success state)
- Minimal footer with brand mark
- No admin, no login, no uploads, no payments beyond COD, no testimonials/stats/blog

## Design
- Palette tokens added to `src/styles.css` (oklch equivalents of #0A2B3D navy, #7BC5D3 ice blue, #D4AF37 gold, white)
- Fonts: Playfair Display (logo + headline) + Inter (body) via Google Fonts in `__root.tsx` head
- Glassmorphism cards (backdrop-blur, translucent white, gold border accent on hover)
- Hover: scale 1.02, elevated shadow, pointer cursor
- Icons: Font Awesome 6 via CDN (`fa-snowflake`, `fa-wind`, `fa-gem`, `fa-xmark`)
- Animations: fade-in + slide-up headline, floating frost particles (CSS keyframes on absolutely-positioned white dots), pulse on Order Now, modal scale-in
- Mobile: 3 cards → 1 column, modal full-width with padding

## Structure
```
src/routes/index.tsx       — single page: Hero, Products, Footer, Modals
src/styles.css             — add brand color tokens + frost/pulse keyframes
src/routes/__root.tsx      — add Google Fonts + Font Awesome <link> tags, update meta
```

## Modal behavior
- Local React state (`selectedProduct`, `orderOpen`, `submitted`)
- Click card → product modal; "Order Now" inside → swap to order modal
- Submit (no backend call) → show inline success "✅ Order placed! We will call you within 1 hour."
- Close via ✕ button, backdrop click, or Esc

## SEO
- Update head: title "DhakaStar — Luxury Cooling. Redefined.", matching description, og tags
- Single H1 = hero headline

## Out of scope (per your spec)
No backend, no Lovable Cloud, no extra routes, no testimonials/stats/blog sections.

Ready to build on approval.