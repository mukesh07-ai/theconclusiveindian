# REST API Contract Specification (v1)

This specification defines the contract between the **Next.js Frontend** and the future **Python FastAPI Backend**.

**Base URL:** `http://localhost:8000/api/v1` (configurable via `NEXT_PUBLIC_API_BASE_URL`)  
**Format:** `application/json; charset=utf-8`

---

## 1. Categories

### `GET /categories`
Retrieve all active news categories.

**Response `200 OK`:**
```json
[
  {
    "id": "cat-national",
    "name": "देश",
    "englishName": "National",
    "slug": "national",
    "description": "राष्ट्रीय और सामरिक महत्व के प्रमुख समाचार",
    "color": "#1E3A8A",
    "order": 1
  }
]
```

### `GET /categories/{slug}`
Retrieve a category by slug.

---

## 2. Breaking News

### `GET /breaking-news`
Retrieve current live ticker headlines.

**Response `200 OK`:**
```json
[
  {
    "id": "bn-1",
    "title": "चंबल अभयारण्य में डॉल्फिन और घड़ियाल संरक्षण को मिली नई रफ्तार",
    "slug": "chambal-revival-gharial-dolphin-sanctuary-report",
    "category": "देश",
    "timestamp": "अभी-अभी",
    "isUrgent": true
  }
]
```

---

## 3. Articles

### `GET /articles`
List articles with pagination and filtering.

**Query Parameters:**
- `page` (int, default: 1)
- `limit` (int, default: 10)
- `category` (string, optional) — Category slug
- `tag` (string, optional)
- `sort` (string, optional: `latest` | `trending`)

**Response `200 OK`:**
```json
{
  "data": [
    {
      "id": "art-1",
      "title": "चंबल अभयारण्य का कायाकल्प: घड़ियाल और डॉल्फिन संरक्षण",
      "englishTitle": "Chambal Sanctuary Revival",
      "slug": "chambal-revival-gharial-dolphin-sanctuary-report",
      "excerpt": "मध्य प्रदेश, राजस्थान और उत्तर प्रदेश की सीमा पर बहने वाली चंबल नदी...",
      "content": "विस्तृत रिपोर्ट...",
      "featuredImage": "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      "imageAlt": "चंबल नदी में घड़ियाल",
      "imageCaption": "चंबल नदी तट पर संरक्षण केंद्र",
      "imageCredit": "द कन्क्लूसिव इंडियन",
      "category": {
        "id": "cat-national",
        "name": "देश",
        "englishName": "National",
        "slug": "national"
      },
      "author": {
        "id": "auth-1",
        "name": "राघवेंद्र शुक्ल",
        "slug": "raghavendra-shukla",
        "role": "विशेष संवाददाता (पर्यावरण)"
      },
      "publishedAt": "2026-10-21T06:30:00Z",
      "updatedAt": "2026-10-21T08:00:00Z",
      "status": "published",
      "tags": ["चंबल", "घड़ियाल", "पर्यावरण"],
      "isBreaking": true,
      "isFeatured": true,
      "isTrending": false,
      "viewCount": 18450,
      "readTimeMinutes": 5
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "hasMore": true
}
```

### `GET /articles/featured`
Get lead and secondary featured stories for homepage hero.

### `GET /articles/trending`
Get top stories ranked by view count and recency.

### `GET /articles/{slug}`
Get full article details by slug.

### `GET /articles/{slug}/related`
Get related stories for sidebar/footer recommendations.

---

## 4. Search

### `GET /search`
Bilingual search across articles.

**Query Parameters:**
- `q` (string, required) — Search query (Hindi or English)
- `category` (string, optional) — Filter by category slug
- `page` (int, default: 1)
- `limit` (int, default: 10)

---

## 5. Multimedia & Opinions

### `GET /multimedia/videos`
Get curated video bulletins.

### `GET /multimedia/photos`
Get high-impact photo gallery stories.

### `GET /multimedia/opinions`
Get opinion and editorial column articles.

---

## 6. Feedback & Redressal

### `POST /contact/feedback`
Submit reader grievance or editorial inquiry.

**Request Body:**
```json
{
  "fullName": "राम कुमार",
  "email": "ram@example.com",
  "phone": "+91 98765 43210",
  "category": "editorial_correction",
  "subject": "तथ्यात्मक सुधार का अनुरोध",
  "message": "आर्टिकल में उल्लिखित वर्ष 2024 के स्थान पर 2025 होना चाहिए..."
}
```
