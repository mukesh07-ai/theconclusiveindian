# The Conclusive Indian — Frontend

Production-ready Next.js frontend for **The Conclusive Indian (द कन्क्लूसिव इंडियन)**, a modern Hindi digital news publication.

## 🌟 Brand Identity & Visual System
- **Colors**:
  - Deep Navy Blue (`#263565`) — Primary Brand
  - Strong Red (`#E01F26`) — Breaking News & Category Accents
  - Pink (`#E91E63`) — Floating Call Action Button
  - Crisp White & Light Gray Neutral Borders
- **Typography**: `Noto Sans Devanagari` + `Inter` fallbacks
- **Logo**: Extracted & derived from the official brand master logo (`logo.jpeg`), scaled with `object-contain` for both desktop masthead and compact mobile header.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Installation
Run from within the `frontend/` directory:
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the next available port) to view the application.

### Production Build & Typecheck
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📁 Directory Structure
```
frontend/
├── public/                 # Static brand assets (derived from master logo.jpeg)
│   ├── logo.jpeg           # Master original asset (preserved)
│   ├── logo.png            # Trimmed crisp logo (789x264, object-contain)
│   ├── logo-transparent.png# Transparent logo variant
│   ├── logo-mark.png       # 512x512 emblem mark
│   ├── favicon.ico         # Multi-size favicon
│   ├── icon.png            # 512x512 PWA browser icon
│   ├── apple-icon.png      # 180x180 Apple touch icon
│   ├── og-image.jpg        # 1200x630 OpenGraph social sharing card
│   └── placeholder-news.jpg# 800x450 fallback editorial thumbnail
├── src/
│   ├── app/                # Next.js App Router (routes & pages)
│   │   ├── layout.tsx      # Root layout (fonts, header, ticker, footer, floating call)
│   │   ├── page.tsx        # Mobile-refined homepage
│   │   ├── globals.css     # Design tokens & Devanagari typography
│   │   ├── not-found.tsx   # 404 handler
│   │   ├── news/[slug]/    # Full article detail route
│   │   ├── category/[slug]/# Category listing route
│   │   ├── search/         # Search results route
│   │   ├── about/          # Editorial team & masthead
│   │   ├── contact/        # Contact details & feedback form
│   │   ├── privacy-policy/ # Legal terms & privacy
│   │   └── editorial-policy/# Fact-checking, corrections, ethics
│   ├── components/
│   │   ├── common/         # SiteLogo, FloatingCallButton, ImageWithFallback, Badge
│   │   ├── layout/         # SiteHeader, BreakingNewsTicker, SiteFooter, SearchModal, MobileDrawer
│   │   └── news/           # FeaturedNewsGrid, FeaturedStoryLead, NewsCard, LatestNewsList, etc.
│   ├── config/             # Publication config & categories (site.ts)
│   ├── data/               # Realistic Hindi mock data for articles & multimedia
│   ├── lib/                # API client abstraction, date formatting, search utils
│   └── types/              # TypeScript models for articles, categories, authors
├── .env.example            # Environment variables template
├── next.config.ts          # Turbopack & remote image configurations
├── tsconfig.json           # Path aliases (@/* -> ./src/*)
└── README.md
```

## 🔌 Future FastAPI & MySQL Integration
The frontend data access is centralized in `src/lib/api.ts` with typed functions:
- `getFeaturedArticles()`
- `getLatestArticles(page, limit)`
- `getArticleBySlug(slug)`
- `getArticlesByCategory(slug, page, limit)`
- `searchArticles(query)`

When connecting to the future Python FastAPI backend:
1. Configure `NEXT_PUBLIC_API_BASE_URL` in `.env.local` (e.g., `http://localhost:8000/api/v1`).
2. `src/lib/api.ts` is already prepared to route to `fetch()` calls once the live endpoints exist.
