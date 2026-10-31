/**
 * Admin Service Layer
 * Centralized API client for communicating with Gateway Admin Endpoints (/api/v1/admin/*).
 */

import { API_BASE_URL } from "@/lib/api";

const BASE_URL = API_BASE_URL || "http://localhost:8000/api/v1";

function getAuthHeaders(token?: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const activeToken =
    token || (typeof window !== "undefined" ? localStorage.getItem("tci_admin_token") : null);
  if (activeToken) {
    headers["Authorization"] = `Bearer ${activeToken}`;
  }
  return headers;
}

export const adminService = {
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "लॉगिन असफल रहा। कृपया ईमेल और पासवर्ड पुनः जांचें।");
    }
    return res.json();
  },

  async getMe(token?: string | null) {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getAuthHeaders(token),
    });
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  },

  // Articles
  async getArticles(params: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
  } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page.toString());
    if (params.limit) query.set("limit", params.limit.toString());
    if (params.category) query.set("category", params.category);
    if (params.status) query.set("status_filter", params.status);

    const res = await fetch(`${BASE_URL}/articles?${query.toString()}`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch articles");
    return res.json();
  },

  async createArticle(payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/articles`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "आर्टिकल प्रकाशित करने में त्रुटि हुई");
    }
    return res.json();
  },

  async updateArticle(id: string, payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/articles/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "आर्टिकल अपडेट करने में त्रुटि हुई");
    }
    return res.json();
  },

  async updateArticleStatus(id: string, status: string) {
    const res = await fetch(`${BASE_URL}/admin/articles/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },

  async deleteArticle(id: string) {
    const res = await fetch(`${BASE_URL}/admin/articles/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete article");
    return res.json();
  },

  // Breaking News
  async getBreakingNews() {
    const res = await fetch(`${BASE_URL}/breaking-news`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch breaking news");
    return res.json();
  },

  async createBreakingNews(payload: { title: string; slug: string; category?: string; is_urgent?: boolean }) {
    const res = await fetch(`${BASE_URL}/admin/breaking-news`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to add breaking news");
    return res.json();
  },

  async deleteBreakingNews(id: string) {
    const res = await fetch(`${BASE_URL}/admin/breaking-news/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete breaking news");
    return res.json();
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${BASE_URL}/categories`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  async createCategory(payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/categories`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },

  async updateCategory(id: string, payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/categories/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update category");
    return res.json();
  },

  async deleteCategory(id: string) {
    const res = await fetch(`${BASE_URL}/admin/categories/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete category");
    return res.json();
  },

  // Homepage Sections & Layout
  async getHomepageSections() {
    const res = await fetch(`${BASE_URL}/homepage/sections`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch homepage sections");
    return res.json();
  },

  async updateHomepageSection(id: string, payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/homepage/sections/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update homepage section");
    return res.json();
  },

  // Site Config
  async getSiteConfig() {
    const res = await fetch(`${BASE_URL}/site-config`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch site config");
    return res.json();
  },

  async updateSiteConfig(payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/site-config`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update site config");
    return res.json();
  },

  // Contact & Grievances
  async getFeedback(status?: string) {
    const url = status
      ? `${BASE_URL}/admin/contact/feedback?status_filter=${status}`
      : `${BASE_URL}/admin/contact/feedback`;
    const res = await fetch(url, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch contact feedback");
    return res.json();
  },

  async updateFeedbackStatus(ticketId: string, status: string, internalNotes?: string) {
    const res = await fetch(`${BASE_URL}/admin/contact/feedback/${ticketId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, internalNotes }),
    });
    if (!res.ok) throw new Error("Failed to update feedback status");
    return res.json();
  },

  // Media
  async getMedia() {
    const res = await fetch(`${BASE_URL}/media`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch media assets");
    return res.json();
  },

  async uploadMedia(formData: FormData) {
    const activeToken =
      typeof window !== "undefined" ? localStorage.getItem("tci_admin_token") : null;
    const headers: Record<string, string> = {};
    if (activeToken) {
      headers["Authorization"] = `Bearer ${activeToken}`;
    }
    const res = await fetch(`${BASE_URL}/media/upload`, {
      method: "POST",
      headers,
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload media");
    return res.json();
  },

  async deleteMedia(id: string) {
    const res = await fetch(`${BASE_URL}/admin/media/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete media asset");
    return res.json();
  },
};
