"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/config/site";

export function FloatingCallButton() {
  const { language, t } = useLanguage();
  const chatConfig = SITE_CONFIG.whatsappChat;

  if (!chatConfig || !chatConfig.enabled) {
    return null;
  }

  const rawPhone = chatConfig.phone || "919876543210";
  const cleanPhone = rawPhone.replace(/[^\d]/g, "");

  const greeting =
    language === "en"
      ? chatConfig.englishMessage || "Hello! I would like to connect with The Conclusive Indian team."
      : chatConfig.message || "नमस्ते! मैं The Conclusive Indian टीम से संपर्क करना चाहता/चाहती हूँ।";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(
    greeting
  )}`;

  const label =
    language === "en"
      ? chatConfig.englishLabel || "WhatsApp Chat"
      : chatConfig.label || "व्हाट्सएप चैट";

  return (
    <aside
      aria-label={t("व्हाट्सएप पर सहायता व चैट", "WhatsApp Help & Chat")}
      className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 transition-all duration-300"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-white select-none cursor-pointer"
        title={t("व्हाट्सएप पर तुरंत संदेश भेजें", "Send a message on WhatsApp")}
        aria-label={t("व्हाट्सएप पर तुरंत संदेश भेजें", "Send a message on WhatsApp")}
      >
        {/* Active Online Pulse Indicator */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>

        {/* WhatsApp Official Icon */}
        <svg
          className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 0C5.396 0 .016 5.38.016 12.015c0 2.115.552 4.179 1.6 5.995L.062 24l6.188-1.622c1.748.953 3.722 1.455 5.781 1.455 6.635 0 12.016-5.38 12.016-12.018C24.047 5.38 18.666 0 12.031 0zm0 21.984c-1.797 0-3.56-.484-5.1-1.398l-.366-.217-3.791.995 1.012-3.693-.238-.38a9.92 9.92 0 0 1-1.521-5.276c0-5.518 4.49-10.008 10.004-10.008 5.514 0 10.004 4.49 10.004 10.008 0 5.518-4.49 10.008-10.004 10.008zm5.483-7.514c-.301-.15-1.782-.88-2.058-.98-.276-.1-.477-.15-.678.15-.201.301-.78 0.98-.956 1.18-.176.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.635-.93-2.239-.245-.588-.494-.508-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.512 1.08 2.914 1.23 3.115c.15.201 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.229 1.379.197 1.899.119.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351z" />
        </svg>

        {/* WhatsApp Chat Label */}
        <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
          {label}
        </span>
      </a>
    </aside>
  );
}

// Export alias as well for clarity
export const FloatingWhatsAppButton = FloatingCallButton;
