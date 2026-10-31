/**
 * Contact Service Boundary
 * Interfaces with future Python FastAPI backend endpoint: POST /contact/feedback
 * Cleanly separates presentation from networking and enforces truthful status handling.
 */

import { API_BASE_URL, isLiveApiEnabled } from "@/lib/api";

export type ContactCategory =
  | "general"
  | "tip"
  | "editorial_correction"
  | "advertise"
  | "grievance"
  | "privacy";

export interface ContactSubmissionPayload {
  fullName: string;
  email: string;
  phone?: string;
  category: ContactCategory;
  subject: string;
  message: string;
  honeypot?: string; // Anti-spam field
}

export interface ContactSubmissionResult {
  success: boolean;
  isDemo: boolean;
  message: string;
  ticketId?: string;
  error?: string;
}

export async function submitContactInquiry(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResult> {
  // 1. Client-side honeypot spam check: if filled, silently discard
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      success: false,
      isDemo: true,
      message: "अनुरोध अमान्य पाया गया। कृपया पुनः प्रयास करें।",
    };
  }

  // 2. If Live FastAPI backend is configured and enabled:
  if (isLiveApiEnabled) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullName: payload.fullName.trim(),
          email: payload.email.trim(),
          phone: payload.phone?.trim() || undefined,
          category: payload.category,
          subject: payload.subject.trim(),
          message: payload.message.trim(),
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        return {
          success: false,
          isDemo: false,
          message:
            errJson.detail ||
            "सर्वर पर संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।",
          error: `HTTP ${response.status}`,
        };
      }

      const data = await response.json().catch(() => ({}));
      return {
        success: true,
        isDemo: false,
        message: "आपका संदेश संपादकीय डेस्क को सफलतापूर्वक प्रेषित कर दिया गया है।",
        ticketId: data.ticketId || data.id,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Network error";
      return {
        success: false,
        isDemo: false,
        message:
          "नेटवर्क कनेक्शन उपलब्ध नहीं है। कृपया इंटरनेट अथवा ईमेल के माध्यम से संपर्क करें।",
        error: errorMsg,
      };
    }
  }

  // 3. Honest Demo / Offline state when live FastAPI backend is not yet active:
  // Strictly adhering to prompt requirement: Do NOT pretend messages were delivered!
  return {
    success: false,
    isDemo: true,
    message:
      "डेमो मोड (Demo Mode): वर्तमान में लाइव बैकएंड एपीआई सक्रिय नहीं है। यह संदेश किसी वास्तविक इनबॉक्स या डेटाबेस में सहेजा नहीं गया है। वास्तविक पूछताछ या समाचार टिप हेतु कृपया हमारे आधिकारिक ईमेल contact@theconclusiveindian.in पर लिखें।",
  };
}
