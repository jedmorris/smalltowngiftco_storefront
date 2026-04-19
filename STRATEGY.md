# Small Town Gift Co. — Master Strategy Document
**Brand:** itsmejessicajean / The Small Town Gift Co.
**Last Updated:** 2026-04-19
**Status:** Live on Vercel — [smalltowngiftco.vercel.app](https://smalltowngiftco.vercel.app)

---

## Mission
An online storefront for Jessica's gift brand — shirts, sweaters, and personalized items for bachelorette parties, weddings, Easter, and everyday gifting. The goal is a high-converting, brand-forward Shopify storefront that Jessica can manage through the Shopify admin while the custom Next.js frontend handles the customer experience.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Commerce | Shopify Hydrogen React + Storefront API | 2026.1.0 |
| Animation | Framer Motion | 12.34.0 |
| Icons | Lucide React | 0.563.0 |
| Toasts | Sonner | 2.0.7 |
| Error Monitoring | Sentry | 10.49.0 |
| Sanitization | isomorphic-dompurify | 3.1.0 |
| Hosting | Vercel | — |
| Source Control | GitHub | `jedmorris/smalltowngiftco_storefront` |

---

## Architecture Overview

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — providers, header, footer, analytics
│   ├── page.tsx                  # Homepage — hero, collections, bestsellers
│   ├── products/[handle]/        # Product detail pages (SSG + ISR)
│   ├── collections/[handle]/     # Collection pages with filtering/sorting/pagination
│   ├── cart/                     # Cart page
│   ├── wishlist/                 # Wishlist page
│   ├── search/                   # Search results
│   ├── account/                  # Login, register, forgot-password, dashboard
│   ├── contact/                  # Contact form
│   ├── about/, faq/, brand-guide/
│   ├── privacy/, terms/, shipping/, returns/
│   └── api/                      # Server-side API routes
│       ├── newsletter/           # Shopify customer creation with marketing opt-in
│       ├── contact/              # Contact form submissions
│       ├── reviews/              # Product review CRUD (GET/POST)
│       ├── search/               # Predictive search proxy
│       ├── collections/[handle]/ # Paginated collection products
│       └── revalidate/           # Shopify webhook → ISR revalidation
├── components/
│   ├── layout/                   # Header, Footer, MobileMenu, AnnouncementBar
│   ├── product/                  # ProductCard, ProductGallery, ProductInfo, ReviewSection, QuickViewModal, etc.
│   ├── cart/                     # CartDrawer, CartLineItem, CartSummary
│   ├── collection/               # FilterSidebar, CollectionSortDropdown
│   ├── home/                     # HeroBanner, FeaturedCollections, BestSellers, GuaranteeBanner
│   ├── account/                  # LoginForm, RegisterForm, AccountDashboard, AddressBook, OrderCard
│   ├── analytics/                # GoogleAnalytics, MetaPixel, SearchTracker
│   ├── seo/                      # JsonLd (Product, Collection, BreadcrumbList, Organization)
│   ├── ui/                       # Button, Badge, Price, SearchBar, CookieConsent, Skeleton, TextLogo
│   └── wishlist/                 # WishlistContent
├── context/                      # CartContext, AuthContext, WishlistContext, QuickViewContext
├── lib/
│   ├── shopify/                  # Client, queries, mutations, types, normalization
│   ├── analytics.ts              # GA4 + Meta Pixel e-commerce event helpers
│   ├── consent.ts                # Cookie consent pub/sub
│   ├── token-crypto.ts           # AES-GCM token encryption for auth
│   ├── sanitize.ts               # HTML sanitization
│   ├── sentry.ts                 # Sentry init helper
│   └── brand.ts                  # Brand constants
└── middleware.ts                 # Auth gate for /account/* routes
```

---

## Brand Identity

| Element | Value |
|---------|-------|
| Primary Font | Playfair Display (serif headings) |
| Body Font | Inter (sans-serif) |
| Gold | `#B8935A` |
| Espresso | `#3E2724` |
| Cream | `#FDF8F3` |
| Blush | `#FFFBF7` |
| Pink | `#F3D9CA` |
| Charcoal | `#2A2725` |
| Aesthetic | Editorial, warm, feminine, boutique |

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Yes | Shopify store domain |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Yes | Public Storefront API token |
| `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` | No | Server-side private token (faster, higher rate limits) |
| `SHOPIFY_REVALIDATION_SECRET` | Yes | HMAC validation for webhook revalidation |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Facebook/Meta Pixel ID |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry error monitoring DSN |

---

## Current Feature Status

### Fully Operational
- [x] Product catalog with dynamic pages (SSG + ISR @ 1hr)
- [x] Collection pages with filtering, sorting, cursor-based pagination
- [x] Shopping cart (Shopify Cart API, slide-out drawer)
- [x] Checkout redirect to Shopify hosted checkout
- [x] User authentication (register, login, forgot password)
- [x] Account dashboard with order history and address management
- [x] Wishlist (localStorage, client-side)
- [x] Product quick view modal with focus trap
- [x] Search with predictive autocomplete (debounced, keyboard nav)
- [x] Newsletter signup (creates Shopify customer with marketing opt-in)
- [x] Contact form (server-side API route)
- [x] Product reviews (server-side API, stored in `.tmp/reviews.json`)
- [x] Product recommendations via Shopify `productRecommendations` query
- [x] SEO — sitemap, robots.txt, Open Graph, canonical URLs, JSON-LD (Product, Organization, BreadcrumbList)
- [x] GA4 e-commerce events (view_item, add_to_cart, begin_checkout, search)
- [x] Meta Pixel integration (consent-gated)
- [x] Cookie consent banner
- [x] Security headers (CSP enforced, HSTS, X-Frame-Options, etc.)
- [x] Auth middleware protecting `/account/*` routes
- [x] PWA manifest
- [x] Skip-to-content link, keyboard gallery nav, ARIA attributes
- [x] Sentry error monitoring (client + server + edge)
- [x] On-demand ISR via Shopify webhooks (`/api/revalidate`)
- [x] Responsive design (mobile, tablet, desktop)

### Partially Functional
- [ ] Reviews — working but stored in flat file (`.tmp/reviews.json`), not a real database
- [ ] Wishlist — client-side only (localStorage), doesn't sync to customer account
- [ ] Contact form — logs to server console, no email delivery service connected
- [ ] Newsletter — creates Shopify customer but no automated email flows (Klaviyo/Mailchimp not connected)
- [ ] Analytics — events fire but no GA4 property or Meta Pixel ID configured in env vars yet
- [ ] Sentry — SDK installed but no DSN configured in env vars yet

---

## Backlog

### High Priority — Revenue & Conversion
| # | Task | Impact | Effort | Notes |
|---|------|--------|--------|-------|
| B-1 | **Connect email service (Klaviyo or Mailchimp)** | High | Medium | Replace newsletter API with Klaviyo list subscribe. Enable abandoned cart, welcome series, post-purchase flows. |
| B-2 | **Connect contact form to email delivery** | Medium | Low | Use Resend or SendGrid to actually deliver contact submissions to Jessica's inbox. |
| B-3 | **Configure GA4 property & set env var** | High | Low | Create GA4 property in Google Analytics, add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to Vercel. |
| B-4 | **Configure Meta Pixel & set env var** | High | Low | Create pixel in Meta Business Manager, add `NEXT_PUBLIC_META_PIXEL_ID` to Vercel. |
| B-5 | **Configure Sentry project & set env var** | Medium | Low | Create free Sentry project, add `NEXT_PUBLIC_SENTRY_DSN` to Vercel. |
| B-6 | **Add purchase/thank-you tracking** | High | Medium | Fire GA4 `purchase` event and Meta `Purchase` event on Shopify order confirmation. Requires Shopify checkout extensibility or post-purchase redirect. |
| B-7 | **UTM parameter tracking** | Medium | Low | Persist UTM params through checkout for attribution reporting. |

### Medium Priority — User Experience
| # | Task | Impact | Effort | Notes |
|---|------|--------|--------|-------|
| B-8 | **Migrate reviews to a database** | Medium | Medium | Move from `.tmp/reviews.json` to Supabase or PlanetScale. Add review moderation, verified buyer badges. |
| B-9 | **Sync wishlist to customer account** | Low | Medium | Store wishlist server-side via Shopify metafields or custom API so it persists across devices. |
| B-10 | **Back-in-stock notifications** | Medium | Medium | Capture email on sold-out products, notify when restocked via Klaviyo. |
| B-11 | **Product variant images** | Low | Low | Auto-switch gallery image when a color/variant is selected. |
| B-12 | **Recently viewed products** | Low | Low | Track in localStorage, show carousel on product pages and homepage. |
| B-13 | **Size guide / measurement chart** | Medium | Low | Add modal or accordion section on applicable product pages. |
| B-14 | **Gift wrapping option** | Low | Medium | Add cart-level toggle for gift wrapping with custom note. |

### Low Priority — Technical & Polish
| # | Task | Impact | Effort | Notes |
|---|------|--------|--------|-------|
| B-15 | **Automated testing** | Medium | High | Add Vitest for unit tests on context providers, utilities, API routes. Playwright for critical user flows (add to cart → checkout). |
| B-16 | **Lighthouse CI / performance budget** | Low | Low | Add Lighthouse CI to GitHub Actions. Track Core Web Vitals per deploy. |
| B-17 | **Dark mode** | Low | Medium | Respect `prefers-color-scheme`. Add toggle in header. |
| B-18 | **i18n / multi-language** | Low | High | Only if expanding beyond English-speaking markets. |
| B-19 | **Customer photos in reviews** | Low | Medium | Allow image uploads in review form. Store in Shopify Files or S3. |
| B-20 | **A/B testing framework** | Low | Medium | Integrate Vercel Edge Config or LaunchDarkly for homepage hero, CTA copy experiments. |
| B-21 | **Structured data for reviews** | Medium | Low | Add `AggregateRating` and `Review` schema to product JSON-LD once reviews are in a real database. |
| B-22 | **Instagram feed embed** | Low | Low | Show Jessica's latest IG posts on homepage or about page. |
| B-23 | **Loyalty / rewards program** | Medium | High | Points-based system for repeat purchases. Smile.io or custom. |
| B-24 | **Shipping rate calculator** | Low | Medium | Show estimated shipping cost on product/cart pages before checkout. |
| B-25 | **Order tracking page** | Low | Medium | Custom `/account/orders/[id]` page with real-time tracking via Shopify fulfillment API. |

### Infrastructure
| # | Task | Impact | Effort | Notes |
|---|------|--------|--------|-------|
| B-26 | **Custom domain setup** | High | Low | Point `smalltowngiftco.com` to Vercel. Configure DNS, SSL auto-provisions. |
| B-27 | **Shopify webhook registration** | Medium | Low | Register `products/update` and `collections/update` webhooks in Shopify admin pointing to `/api/revalidate`. |
| B-28 | **Rate limiting on API routes** | Low | Low | Add Vercel Edge rate limiting or `next-rate-limit` to `/api/contact`, `/api/reviews`, `/api/newsletter`. |
| B-29 | **CSRF protection on forms** | Low | Medium | Add CSRF tokens to contact and review forms. |
| B-30 | **Staging environment** | Low | Low | Create Vercel preview branch for testing before production deploys. |

---

## Deployment

**Production Pipeline:**
1. Push to `master` branch on GitHub
2. Vercel auto-deploys from `master`
3. Build: `next build` (Turbopack)
4. ISR pages revalidate hourly + on-demand via Shopify webhooks

**Vercel Project:** `smalltowngiftco`
**GitHub Repo:** `jedmorris/smalltowngiftco_storefront`

---

## Shopify Store

| Detail | Value |
|--------|-------|
| Store Domain | `knk1ka-kt.myshopify.com` |
| Storefront API Version | `2025-01` |
| Products managed in | Shopify Admin |
| Checkout hosted by | Shopify |
| Customer accounts | Shopify Customer API |

---

## Commit History

| Hash | Description |
|------|-------------|
| `40ac7cc` | Add analytics, reviews API, search autocomplete, pagination, Sentry, a11y, and cleanup |
| `0261327` | Update brand palette: remove forest green, add espresso brown, warm-shift all colors |
| `fcec12b` | Redesign site with editorial aesthetic: text logo, cleaner borders, more whitespace |
| `d186552` | Fix Vercel deployment crash: use static env var access for client-side inlining |
| `e887f26` | Harden app for production: security, error handling, TypeScript, SEO, a11y, UX |
| `e5f311c` | Add wishlist, quick view, filtering, accounts, reviews, legal pages, and polish |
| `ea26ea1` | Connected Shopify API |
| `210138a` | Framework phases 1–5 |
| `ec22973` | Initial project |

---

## Key Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02 | Next.js 16 + React 19 | Latest stable with App Router, server components, Turbopack |
| 2026-02 | Shopify Storefront API (not Buy SDK) | Full control over UI/UX, better SEO, custom checkout redirect |
| 2026-02 | Tailwind v4 (PostCSS plugin) | No config file needed, inline `@theme`, future-proof |
| 2026-02 | Editorial aesthetic | Jessica wanted warm, feminine, boutique feel — not generic Shopify theme |
| 2026-04 | Reviews as flat-file API | MVP approach — works for low volume. Migrate to DB when review count grows. |
| 2026-04 | Sentry over LogRocket | Free tier sufficient, lighter weight, no session replay needed yet |
| 2026-04 | CSP enforced (not report-only) | Site is stable enough post-hardening. Reduces XSS surface. |
| 2026-04 | Removed Modal webhook scaffolding | Was unused boilerplate from initial setup. Simplifies codebase. |

---

## Next Steps (Recommended Order)

1. **B-3 + B-4 + B-5** — Configure GA4, Meta Pixel, and Sentry (15 min total, just env vars)
2. **B-26** — Point custom domain to Vercel
3. **B-27** — Register Shopify webhooks for ISR
4. **B-1** — Connect Klaviyo for email marketing flows
5. **B-2** — Connect contact form to email delivery
6. **B-6** — Add purchase event tracking

---

*This is a working document. Update it whenever the project state changes.*
