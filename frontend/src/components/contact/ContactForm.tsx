"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  submitContactInquiry,
  ContactCategory,
  ContactSubmissionResult,
} from "@/services/contactService";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "general" as ContactCategory,
    subject: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContactSubmissionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await submitContactInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        category: formData.category,
        subject: formData.subject,
        message: formData.message,
        honeypot: formData.honeypot,
      });
      setResult(res);
    } catch {
      setResult({
        success: false,
        isDemo: false,
        message: "अनुरोध प्रेषित करने में तकनीकी समस्या आई। कृपया ईमेल द्वारा संपर्क करें।",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          संदेश या संपादकीय प्रतिक्रिया भेजें
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          नीचे दिया गया फॉर्म भविष्य के FastAPI बैकएंड के साथ सीधे एकीकृत होने के लिए तैयार है।
        </p>
      </div>

      {/* Honest Demo / Submission Status Alert */}
      {result && (
        <div
          role="status"
          aria-live="polite"
          className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
            result.success
              ? "bg-green-50 border-green-200 text-green-900"
              : result.isDemo
              ? "bg-blue-50 border-blue-200 text-blue-950"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          ) : result.isDemo ? (
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-bold text-sm mb-1">
              {result.success
                ? "संदेश प्रेषित हो गया!"
                : result.isDemo
                ? "डेमो मोड सूचना (Demo State - No Backend Active)"
                : "त्रुटि"}
            </p>
            <p>{result.message}</p>
            {result.ticketId && (
              <p className="mt-1 font-semibold">संदर्भ टिकट संख्या: {result.ticketId}</p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Anti-spam honeypot (invisible to humans, traps automated spam bots) */}
        <input
          type="text"
          name="b_honeypot"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-fullName" className="block text-xs font-bold text-gray-700 mb-1">
              पूरा नाम <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="आपका नाम..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 mb-1">
              ईमेल पता <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-700 mb-1">
              फ़ोन नंबर (वैकल्पिक)
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
            />
          </div>

          <div>
            <label htmlFor="contact-category" className="block text-xs font-bold text-gray-700 mb-1">
              संपर्क का विषय / श्रेणी <span className="text-red-500">*</span>
            </label>
            <select
              id="contact-category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as ContactCategory })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#233768]"
            >
              <option value="general">सामान्य पूछताछ (General Inquiry)</option>
              <option value="tip">समाचार टिप / ग्राउंड रिपोर्ट (News Tip)</option>
              <option value="editorial_correction">तथ्य सुधार अनुरोध (Fact Correction)</option>
              <option value="advertise">विज्ञापन एवं वाणिज्यिक (Advertising)</option>
              <option value="grievance">शिकायत निवारण (Grievance Redressal)</option>
              <option value="privacy">डेटा व गोपनीयता (Privacy / DPDP)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-xs font-bold text-gray-700 mb-1">
            विषय (Subject) <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="संदेश का मुख्य विषय..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 mb-1">
            संदेश / विस्तृत विवरण <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="कृपया अपना संदेश, समाचार संबंधी साक्ष्य अथवा संदर्भ विस्तार से लिखें..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
          />
        </div>

        {/* Privacy Notice */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-500 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
          <p>
            <strong>गोपनीयता सूचना:</strong> आपके द्वारा दी गई जानकारी का उपयोग केवल आपकी पूछताछ के उत्तर अथवा तथ्य जांच के लिए किया जाता है। हम आपकी जानकारी को किसी तीसरे पक्ष के साथ साझा या विक्रय नहीं करते हैं। विस्तृत जानकारी के लिए हमारी{" "}
            <Link href="/privacy-policy" className="text-[#233768] underline font-medium">
              गोपनीयता नीति
            </Link>{" "}
            देखें।
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 bg-[#233768] hover:bg-[#18274b] disabled:bg-gray-400 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? "प्रेषित किया जा रहा है..." : "संदेश प्रेषित करें"}</span>
        </button>
      </form>
    </div>
  );
}
