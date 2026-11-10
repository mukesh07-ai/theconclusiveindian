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
  // --- Authentication & Client Account Management ---
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

  async changePassword(newPassword: string, oldPassword?: string) {
    const res = await fetch(`${BASE_URL}/auth/change-password`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ new_password: newPassword, old_password: oldPassword }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "पासवर्ड बदलने में त्रुटि हुई।");
    }
    return res.json();
  },

  async logout() {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
    } catch {
      // Ignore network errors on logout
    }
  },

  // --- User Accounts & RBAC ---
  async getUsers() {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async createUser(payload: {
    email: string;
    full_name: string;
    role: string;
    temporary_password?: string;
    must_change_password?: boolean;
    permissions?: string[];
  }) {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "उपयोगकर्ता खाता बनाने में त्रुटि हुई");
    }
    return res.json();
  },

  async updateUser(
    id: string,
    payload: {
      full_name?: string;
      email?: string;
      role?: string;
      is_active?: boolean;
      permissions?: string[];
    }
  ) {
    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "उपयोगकर्ता अपडेट करने में त्रुटि हुई");
    }
    return res.json();
  },

  async resetUserPassword(userId: string, temporaryPassword?: string) {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}/reset-password`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ temporary_password: temporaryPassword }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "पासवर्ड रीसेट करने में त्रुटि हुई");
    }
    return res.json();
  },

  async deleteUser(userId: string) {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "उपयोगकर्ता हटाने में त्रुटि हुई");
    }
    return res.json();
  },

  // --- Articles (News CMS) ---
  async getArticles(
    params: {
      page?: number;
      limit?: number;
      category?: string;
      status?: string;
      sort?: string;
    } = {}
  ) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page.toString());
    if (params.limit) query.set("limit", params.limit.toString());
    if (params.category) query.set("category", params.category);
    if (params.status) query.set("status_filter", params.status);
    if (params.sort) query.set("sort", params.sort);

    const res = await fetch(`${BASE_URL}/articles?${query.toString()}`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch articles");
    return res.json();
  },

  async getArticleBySlug(slug: string) {
    const res = await fetch(`${BASE_URL}/articles/${slug}`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Article not found");
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

  async updateArticleStatus(
    id: string,
    status: string,
    editorialNotes?: string,
    approvedBy?: string
  ) {
    const res = await fetch(`${BASE_URL}/admin/articles/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, editorial_notes: editorialNotes, approved_by: approvedBy }),
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

  // --- Breaking News ---
  async getBreakingNews() {
    const res = await fetch(`${BASE_URL}/breaking-news`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch breaking news");
    return res.json();
  },

  async createBreakingNews(payload: {
    title: string;
    slug: string;
    category?: string;
    is_urgent?: boolean;
  }) {
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

  // --- Categories & Tags ---
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

  // --- Dynamic Sections & Homepage ---
  async getHomepageSections() {
    const res = await fetch(`${BASE_URL}/homepage/sections`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch homepage sections");
    return res.json();
  },

  async createHomepageSection(payload: {
    sectionType: string;
    title: string;
    displayOrder?: number;
    isEnabled?: boolean;
    config?: Record<string, unknown>;
  }) {
    const res = await fetch(`${BASE_URL}/admin/homepage/sections`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create section");
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

  async deleteHomepageSection(id: string) {
    const res = await fetch(`${BASE_URL}/admin/homepage/sections/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete section");
    return res.json();
  },

  // --- Dynamic Pages ---
  async getPages() {
    const res = await fetch(`${BASE_URL}/pages`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch pages");
    return res.json();
  },

  async getPage(slug: string) {
    const res = await fetch(`${BASE_URL}/pages/${slug}`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Page not found");
    return res.json();
  },

  async createPage(payload: {
    slug: string;
    title: string;
    hindiTitle: string;
    contentMarkdown: string;
    metaDescription?: string;
  }) {
    const res = await fetch(`${BASE_URL}/admin/pages`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "पेज बनाने में त्रुटि हुई");
    }
    return res.json();
  },

  async updatePage(slug: string, payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/pages/${slug}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update page");
    return res.json();
  },

  async deletePage(slug: string) {
    const res = await fetch(`${BASE_URL}/admin/pages/${slug}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete page");
    return res.json();
  },

  // --- Dedicated Advertisement Management Module ---
  async getAds(params: { placement?: string; status?: string } = {}) {
    const query = new URLSearchParams();
    if (params.placement) query.set("placement", params.placement);
    if (params.status) query.set("status", params.status);

    const res = await fetch(`${BASE_URL}/admin/ads?${query.toString()}`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch advertisements");
    return res.json();
  },

  async createAd(payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/ads`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "विज्ञापन अभियान बनाने में त्रुटि हुई");
    }
    return res.json();
  },

  async updateAd(id: string, payload: Record<string, unknown>) {
    const res = await fetch(`${BASE_URL}/admin/ads/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "विज्ञापन अपडेट करने में त्रुटि हुई");
    }
    return res.json();
  },

  async toggleAdStatus(id: string, isActive: boolean) {
    const res = await fetch(`${BASE_URL}/admin/ads/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ isActive }),
    });
    if (!res.ok) throw new Error("Failed to update ad status");
    return res.json();
  },

  async deleteAd(id: string) {
    const res = await fetch(`${BASE_URL}/admin/ads/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete advertisement");
    return res.json();
  },

  // Public Ad Serving & Tracking
  async getActiveAdsForPlacement(placement: string) {
    try {
      const res = await fetch(`${BASE_URL}/ads?placement=${placement}`, {
        cache: "no-store",
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async trackAdImpression(id: string) {
    try {
      await fetch(`${BASE_URL}/ads/${id}/impression`, { method: "POST" });
    } catch {
      // Non-blocking
    }
  },

  // --- URL Redirects & Slug Management ---
  async getRedirects() {
    const res = await fetch(`${BASE_URL}/admin/redirects`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch redirects");
    return res.json();
  },

  async createRedirect(sourcePath: string, targetPath: string, statusCode: number = 301) {
    const res = await fetch(`${BASE_URL}/admin/redirects`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ sourcePath, targetPath, statusCode }),
    });
    if (!res.ok) throw new Error("Failed to create redirect");
    return res.json();
  },

  async deleteRedirect(id: string) {
    const res = await fetch(`${BASE_URL}/admin/redirects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete redirect");
    return res.json();
  },

  // --- Audit Logs ---
  async getAuditLogs(resourceType?: string, limit: number = 50) {
    const query = new URLSearchParams();
    if (resourceType) query.set("resource_type", resourceType);
    query.set("limit", limit.toString());

    const res = await fetch(`${BASE_URL}/admin/audit-logs?${query.toString()}`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch audit logs");
    return res.json();
  },

  // --- Navigation Menus ---
  async getNavigation() {
    const res = await fetch(`${BASE_URL}/navigation`, {
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch navigation");
    return res.json();
  },

  async createNavigationItem(payload: {
    menuLocation: string;
    label: string;
    href: string;
    displayOrder?: number;
    isActive?: boolean;
  }) {
    const res = await fetch(`${BASE_URL}/admin/navigation`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create navigation item");
    return res.json();
  },

  async updateNavigation(items: unknown[]) {
    const res = await fetch(`${BASE_URL}/admin/navigation`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error("Failed to update navigation");
    return res.json();
  },

  async deleteNavigationItem(id: string) {
    const res = await fetch(`${BASE_URL}/admin/navigation/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete navigation item");
    return res.json();
  },

  // --- Site Config ---
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

  // --- Contact & Grievances ---
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

  // --- Media Library ---
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
