# The Conclusive Indian (द कन्क्लूसिव इंडियन)
> **"निष्पक्ष • निर्भीक • निर्णायक"**  
> A high-performance, modern Hindi digital news publication frontend built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 📖 Overview

**The Conclusive Indian (द कन्क्लूसिव इंडियन)** is a production-quality digital news platform designed specifically for Indian journalism and Hindi readership. It balances editorial density with modern web typography, fast static prerendering, mobile-first responsive interactions, bilingual search capabilities, and accessible component design.

The platform is designed with a **cleanly decoupled data provider layer** (`src/lib/api.ts`), enabling a seamless, zero-UI-refactor transition from local mock data to a future **Python (FastAPI) + MySQL** microservices backend.

---

## 🎨 Visual Identity & Design System

The visual design draws from leading Indian digital news standards (e.g. *The Sachpatra* and national news portals) while significantly elevating whitespace, typography, visual hierarchy, and performance:

| Token | Hex Value | Role & Usage |
|---|---|---|
| **Primary Navy** | `#233768` | Masthead, desktop navigation bar, section headers, badges |
| **Breaking News Red** | `#E52532` | Breaking news ticker, live indicators, urgent flash alerts, accent highlights |
| **Dark Editorial Text** | `#20242C` | Article titles, headlines, primary body copy |
| **Secondary Text** | `#6B7280` | Timestamps, author bylines, captions, metadata |
| **Page Background** | `#FFFFFF` | Primary reading canvas |
| **Section Background** | `#F5F6F8` | Trending blocks, opinion sections, sidebars, footer |
| **Borders & Dividers** | `#E5E7EB` | Card dividers, grid separators, table borders |

### Typography
- **Primary Devanagari:** `Noto Sans Devanagari` (loaded via `next/font/google` with optimal font-display and preconnect).
- **English / System Fallback:** Clean sans-serif hierarchy for numerals, timestamps, and English metadata.
- **Dynamic Body Scaling:** Article reading page features interactive font-size adjusters (`A-`, `A`, `A+`) preserving reader comfort.

---

## 🚀 Key Features

### 1. Global Navigation & Header
- **Desktop Masthead:** Utility row with Hindi live date (`मंगलवार, 20 अक्टूबर 2026`), edition selector, e-paper link, social channels, centered publication brand, and search trigger.
- **Category Bar:** Navy `#233768` bar with active route highlighting for 12 core categories:
  *होम, देश, राजनीति, विदेश, राज्य, व्यापार, खेल, मनोरंजन, तकनीक, शिक्षा & रोजगार, कृषि, स्वास्थ्य*
- **Mobile Masthead (Compact Indian News Portal Style):**
  - Left-aligned brand logo with Hindi tagline.
  - Right-aligned search icon and animated hamburger button.
  - Horizontally scrollable category strip with subtle dividers and touch scroll momentum.
  - Full-screen slide-in drawer with quick category access, editorial links, and contact options.

### 2. Live Breaking-News Ticker
- `#E52532` Red alert banner with pulsing live broadcast indicator.
- Multiple headlines with automated rotation, manual next/previous navigation controls, and pause/resume button.
- Accessible keyboard and reduced-motion compliant.
- Direct linking to the respective article details.

### 3. Editorial Homepage Layout
- **Hero Featured Grid:** Main lead story with high-resolution image and overlay badge, flanked by 2 secondary featured cards and a real-time latest bulletin list.
- **Latest News Feed:** Chronological news stream with interactive **"और खबरें लोड करें" (Load More)** client pagination.
- **Trending News (ट्रेंडिंग स्टोरीज़):** Visual ranking (01 to 05) with hot-story badges.
- **Category-Wise News Sections:** Varied editorial layouts for *देश (National)*, *राजनीति (Politics)*, *व्यापार (Business)*, and *खेल (Sports)* with direct *"सभी खबरें"* category links.
- **वीडियो बुलेटिन (Video News):** Compact video cards with thumbnail overlays, play badges, and duration chips.
- **फोटो गैलरी (Photo Stories):** High-impact visual stories with photo count indicators.
- **संपादकीय एवं विचार (Opinions & Editorials):** Distinct tinted background featuring senior columnists, editorial perspectives, and author avatars.

### 4. Article Detail Experience (`/news/[slug]`)
- Semantic HTML (`<article>`, `<h1>`, `<header>`, `<footer>`).
- Hierarchical breadcrumbs (`होम > राजनीति > आर्टिकल`).
- Author byline with profile image, role, and dual Hindi timestamps (प्रकाशित व अपडेटेड).
- **Interactive Reading Tools:** Font size switch (`छोटा`, `सामान्य`, `बड़ा`), print page, and one-tap social sharing (WhatsApp direct share, X / Twitter, Facebook, and Native Clipboard Copy with toast notification).
- High-res hero image with photo credit and caption.
- Rich typography with lead paragraphs, blockquotes, section headings, key takeaway callouts, and article tags.
- Sidebar with trending stories, sticky newsletter signup, and standardized ad units (`300x250`, `300x600`).
- **Schema.org `NewsArticle` JSON-LD** embedded for rich search engine snippets.

### 5. Category Hubs (`/category/[slug]`)
- Dedicated dynamic landing page for all 12 categories with custom Devanagari titles and descriptions.
- Lead featured article for the category followed by a 3-column responsive grid.
- Interactive Load More pagination and related category tags.
- Fallback 404 state for non-existent categories.

### 6. Bilingual Search Engine (`/search?q=...`)
- Header search modal and dedicated full-page search results view.
- **Bilingual Normalizer:** Strips Hindi and English punctuation, diacritics, and handles case-insensitivity.
- **Relevance Scoring:** Computes match scores across title (weight 10), tags (weight 6), category (weight 5), excerpt (weight 3), and article body.
- Real-time category filtering and query statistics counter.

### 7. Secondary Institutional Pages
- `/about` — Editorial mission, founding principles, leadership team, and ethical standards.
- `/contact` — Headquarters address, editorial desk phone/email, interactive feedback form, and mandatory **Grievance Redressal Officer (शिकायत निवारण अधिकारी)** details under India's IT (Intermediary Guidelines and Digital Media Ethics Code) Rules.
- `/editorial-policy` — Fact-checking guidelines, corrections policy, anonymous sources protocol, conflict of interest, and AI usage ethics.
- `/privacy-policy` — Data protection, cookie policy, analytics, user rights under DPDP Act.
- `/not-found` — Custom 404 page with quick navigation back to home and top categories.

---

## 🛠️ Project Structure

```
theconclusiveindian/
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── layout.tsx                     # Root layout, Noto Sans Devanagari, Metadata
│   │   ├── page.tsx                       # Complete editorial homepage
│   │   ├── globals.css                    # Tailwind CSS v4 design tokens & utilities
│   │   ├── news/
│   │   │   └── [slug]/page.tsx            # Article detail page + NewsArticle JSON-LD
│   │   ├── category/
│   │   │   └── [slug]/page.tsx            # Category hub template
│   │   ├── search/
│   │   │   └── page.tsx                   # Bilingual search results page
│   │   ├── about/page.tsx                 # About Us page
│   │   ├── contact/page.tsx               # Contact & Grievance Redressal page
│   │   ├── editorial-policy/page.tsx      # Editorial & Fact-Checking policy
│   │   ├── privacy-policy/page.tsx        # Privacy policy (DPDP compliant)
│   │   └── not-found.tsx                  # Custom 404 error page
│   │
│   ├── components/
│   │   ├── common/                        # Reusable atomic UI components
│   │   │   ├── SiteLogo.tsx               # Scalable publication logo
│   │   │   ├── ImageWithFallback.tsx      # Next.js Image with broken URL fallback
│   │   │   ├── Badge.tsx                  # Category & status badges
│   │   │   ├── SocialShare.tsx            # WhatsApp, X, Facebook, Copy link
│   │   │   └── AdPlaceholder.tsx          # Standard IAB ad placeholders
│   │   │
│   │   ├── layout/                        # Global chrome components
│   │   │   ├── SiteHeader.tsx             # Responsive header orchestrator
│   │   │   ├── TopUtilityBar.tsx          # Desktop date & edition bar
│   │   │   ├── BreakingNewsTicker.tsx     # Red ticker with rotation controls
│   │   │   ├── MobileDrawer.tsx           # Mobile slide-out navigation
│   │   │   ├── SearchModal.tsx            # Quick popup search dialog
│   │   │   └── SiteFooter.tsx             # Complete news portal footer
│   │   │
│   │   └── news/                          # Editorial content components
│   │       ├── FeaturedStoryLead.tsx      # Hero lead article with badge overlay
│   │       ├── FeaturedNewsGrid.tsx       # 3-column hero news layout
│   │       ├── NewsCard.tsx               # Standard, compact & horizontal cards
│   │       ├── LatestNewsList.tsx         # Chronological list with Load More
│   │       ├── TrendingNews.tsx           # Ranked 01-05 hot stories
│   │       ├── CategoryNewsSection.tsx    # Category blocks with varied layouts
│   │       ├── VideoNewsSection.tsx       # Multimedia video grid
│   │       ├── PhotoGallerySection.tsx    # High-impact photo gallery
│   │       ├── OpinionSection.tsx         # Editorial columns with author avatars
│   │       ├── ArticleHeader.tsx          # Breadcrumbs, H1, byline, share tools
│   │       ├── ArticleContent.tsx         # Resizable article body & callouts
│   │       ├── ArticleSidebar.tsx         # Sticky ad units & trending feed
│   │       └── RelatedStories.tsx         # Grid of related category stories
│   │
│   ├── config/
│   │   └── site.ts                        # Central publication configuration & categories
│   │
│   ├── data/                              # Local mock data
│   │   ├── mockArticles.ts                # 21 realistic Hindi news articles
│   │   ├── mockAuthors.ts                 # Editorial team profiles & bios
│   │   ├── mockBreakingNews.ts            # Flash breaking news items
│   │   └── mockMultimedia.ts              # Video bulletins & photo galleries
│   │
│   ├── lib/
│   │   ├── api.ts                         # Decoupled Data Provider (Mock <-> FastAPI)
│   │   ├── dateFormat.ts                  # Hindi date & relative time formatters
│   │   └── search.ts                      # Bilingual search & relevance ranker
│   │
│   └── types/
│       └── news.ts                        # Strict TypeScript models
│
├── public/                                # Static assets
├── next.config.ts                         # Next.js configuration (remote image patterns)
├── tsconfig.json                          # TypeScript configuration
└── package.json
```

---

## 🔌 Future Backend Integration Guide (Python FastAPI + MySQL)

The frontend is architected to switch from local mock data to your **Python FastAPI + MySQL** backend with **zero modifications to React components**.

### 1. Centralized Data Layer (`src/lib/api.ts`)
All components consume news data via helper functions in `src/lib/api.ts`:
- `getFeaturedArticles()`
- `getLatestArticles(page, limit)`
- `getTrendingArticles(limit)`
- `getArticleBySlug(slug)`
- `getArticlesByCategory(categorySlug, page, limit)`
- `searchArticles(query, categorySlug)`
- `getBreakingNews()`
- `getVideoStories()`
- `getPhotoStories()`
- `getOpinionArticles()`
- `getCategories()`

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```bash
# Set your FastAPI base endpoint URL:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Toggle between mock data (false) and live FastAPI server (true):
NEXT_PUBLIC_USE_LIVE_API=false
```

### 3. FastAPI Endpoint Contracts
Your FastAPI backend should implement the following REST endpoints returning JSON matching `src/types/news.ts`:

#### Article Object Schema:
```json
{
  "id": "art-001",
  "title": "संसद का बजट सत्र: वित्त मंत्री ने पेश किया आर्थिक सर्वेक्षण, 7.2% विकास दर का अनुमान",
  "slug": "parliament-budget-session-economic-survey-presented",
  "excerpt": "संसद में पेश आर्थिक सर्वेक्षण में चालू वित्त वर्ष में भारतीय अर्थव्यवस्था की रफ्तार 7.2 प्रतिशत रहने का अनुमान जताया गया है।",
  "content": "<p>पूर्ण आलेख पाठ...</p>",
  "featuredImage": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
  "imageAlt": "संसद भवन नई दिल्ली",
  "imageCredit": "पीटीआई / फाइल फोटो",
  "imageCaption": "संसद के बजट सत्र के दौरान संसद भवन का दृश्य।",
  "category": {
    "id": "cat-pol",
    "name": "राजनीति",
    "slug": "politics",
    "description": "संसद, चुनाव और राष्ट्रीय राजनीति की खबरें"
  },
  "author": {
    "id": "auth-01",
    "name": "राजेश शर्मा",
    "slug": "rajesh-sharma",
    "role": "वरिष्ठ राजनीतिक संपादक",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    "bio": "द कन्क्लूसिव इंडियन के वरिष्ठ राजनीतिक संपादक।"
  },
  "publishedAt": "2026-10-20T10:30:00Z",
  "updatedAt": "2026-10-20T11:45:00Z",
  "isBreaking": true,
  "isFeatured": true,
  "isTrending": true,
  "views": 48250,
  "readTimeMinutes": 4,
  "tags": ["बजट 2026", "संसद", "आर्थिक सर्वेक्षण"]
}
```

#### Required API Routes:
| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/v1/articles/featured` | Returns hero featured articles | `limit=5` |
| `GET` | `/api/v1/articles/latest` | Returns paginated latest news | `page=1&limit=10` |
| `GET` | `/api/v1/articles/trending` | Top read/trending stories | `limit=5` |
| `GET` | `/api/v1/articles/{slug}` | Single article by unique slug | — |
| `GET` | `/api/v1/articles/category/{slug}` | Paginated category feed | `page=1&limit=12` |
| `GET` | `/api/v1/articles/search` | Full-text bilingual search | `q=...&category=...` |
| `GET` | `/api/v1/breaking-news` | Live breaking news ticker items | — |
| `GET` | `/api/v1/multimedia/videos` | Video news bulletins | `limit=4` |
| `GET` | `/api/v1/multimedia/photos` | Photo galleries | `limit=4` |
| `GET` | `/api/v1/opinions` | Editorial & op-ed articles | `limit=3` |
| `GET` | `/api/v1/categories` | All active site categories | — |

### 4. Switching `src/lib/api.ts` to Live Mode
When your FastAPI backend is up, simply update the fetch functions in `src/lib/api.ts`:
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
const USE_LIVE_API = process.env.NEXT_PUBLIC_USE_LIVE_API === "true";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (USE_LIVE_API) {
    const res = await fetch(`${API_BASE}/articles/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  }
  // Local mock fallback
  return mockArticles.find((a) => a.slug === slug) || null;
}
```

---

## 💻 Development & Deployment Commands

### Prerequisites
- Node.js 18.17+ or 20.x
- npm, yarn, or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
# Or specify a custom port:
npm run dev -- -p 3005
```
Open [http://localhost:3005](http://localhost:3005) in your browser.

### 3. Run Linter & Type Check
```bash
npm run lint
```
*(Runs Next.js ESLint and TypeScript checks across all components and routes)*

### 4. Build for Production
```bash
npm run build
```
*(Prerenders all static routes, categories, and dynamic news articles into optimized static HTML/JSON)*

### 5. Start Production Server
```bash
npm start
```

---

## 📱 Responsive Testing Viewports Verified

The application has been tested and verified across standard mobile and desktop viewports:
- **320px & 375px (Compact Mobile):** Zero horizontal overflow, single-column stacked layout, touch-friendly tap targets (>44px), horizontally scrollable category strip with dividers.
- **390px & 430px (Standard / Large Mobile):** High-density hero card with bottom gradient headline overlay, quick breaking ticker, readable Hindi typography.
- **768px (Tablet):** 2-column content grid, compact tablet masthead, responsive ad units.
- **1024px & 1440px+ (Desktop & Wide):** Centered max-width editorial container, full navy category bar with live utility row, 3-column hero layout with latest bulletin sidebar, sticky reading sidebar on article pages.

---

## ⚖️ Legal & Compliance
- **IT Rules Compliance:** Contains designated Grievance Redressal Officer contact information under India's Digital Media Ethics Code.
- **DPDP Act (2023):** Transparent privacy policy and user data disclosures.
- **Press Council of India Guidelines:** Standardized editorial, corrections, and fact-checking policies.
