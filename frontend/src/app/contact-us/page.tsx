import { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: `संपर्क करें (Contact Us) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की संपादकीय, विधिक, तथ्य-जांच, विज्ञापन और शिकायत निवारण टीम से संपर्क करें। प्रधान कार्यालय पता, फोन, ईमेल और हेल्पलाइन।`,
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: `संपर्क करें - ${SITE_CONFIG.name}`,
    description: `संपादकीय सुझाव, समाचार की सूचना, तथ्य सुधार अनुरोध, विज्ञापन या कानूनी शिकायत निवारण हेतु संपर्क करें।`,
    url: `${SITE_CONFIG.url}/contact-us`,
    type: "website",
  },
};

export default function ContactUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `संपर्क करें (Contact Us) - ${SITE_CONFIG.name}`,
    description: "संपादकीय सुझाव, समाचार टिप, विज्ञापन और शिकायत निवारण हेतु आधिकारिक संपर्क सूत्र",
    url: `${SITE_CONFIG.url}/contact-us`,
    mainEntity: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.contactEmail,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.pin,
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#233768] hover:underline">
            होम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">संपर्क करें</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            संपर्क करें (Contact Us)
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            संपादकीय सुझाव, समाचार की सूचना (News Tip), तथ्य सुधार अनुरोध, विज्ञापन या कानूनी शिकायत निवारण हेतु हमसे जुड़ें।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Bureau & Grievance Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F5F6F8] p-6 rounded-2xl border border-gray-200 space-y-5">
              <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-300">
                प्रधान कार्यालय (Headquarters Bureau)
              </h2>

              <div className="flex items-start gap-3 text-xs text-gray-700">
                <MapPin className="w-4 h-4 text-[#E52532] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">{SITE_CONFIG.name}</p>
                  <p>{SITE_CONFIG.address.street}</p>
                  <p>
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} - {SITE_CONFIG.address.pin}
                  </p>
                  <p>{SITE_CONFIG.address.country}</p>
                  <span className="text-[11px] text-amber-800 block mt-1">
                    (पता सत्यापन लंबित - {SITE_CONFIG.businessVerification.isAddressVerified ? "सत्यापित" : "कॉन्फ़िगरेशन प्लेसहोल्डर"})
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-gray-700">
                <Mail className="w-4 h-4 text-[#233768] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>
                    <span className="font-semibold text-gray-900 block">संपादकीय डेस्क:</span>
                    <a
                      href={`mailto:${SITE_CONFIG.editorialEmail}`}
                      className="text-[#233768] hover:underline"
                    >
                      {SITE_CONFIG.editorialEmail}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">सामान्य एवं व्यावसायिक संपर्क:</span>
                    <a
                      href={`mailto:${SITE_CONFIG.contactEmail}`}
                      className="text-[#233768] hover:underline"
                    >
                      {SITE_CONFIG.contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-700">
                <Phone className="w-4 h-4 text-[#233768] shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">हेल्पलाइन फोन:</p>
                  <span>{SITE_CONFIG.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-700">
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">संपादकीय डेस्क समय:</p>
                  <span>सोमवार - शनिवार: प्रातः 09:00 से सायं 08:00 IST</span>
                </div>
              </div>
            </div>

            {/* Grievance Redressal Card */}
            <div id="grievance" className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 space-y-3 text-xs">
              <h3 className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                शिकायत निवारण अधिकारी (Grievance Officer)
              </h3>
              <p className="text-amber-900 leading-relaxed">
                सूचना प्रौद्योगिकी नियम 2021 के नियम 11 के तहत किसी भी प्रकाशित सामग्री, डिजिटल आचार संहिता या तथ्य पर आपत्ति दर्ज करने हेतु हमारे नामित अधिकारी से संपर्क करें:
              </p>
              <div className="text-amber-950 font-medium space-y-1 pt-1">
                <p>अधिकारी का नाम: <strong>{SITE_CONFIG.compliance.grievanceOfficer.name}</strong></p>
                <p>पदनाम: {SITE_CONFIG.compliance.grievanceOfficer.title}</p>
                <p>
                  आधिकारिक ईमेल:{" "}
                  <a
                    href={`mailto:${SITE_CONFIG.compliance.grievanceOfficer.email}`}
                    className="underline font-bold text-amber-900"
                  >
                    {SITE_CONFIG.compliance.grievanceOfficer.email}
                  </a>
                </p>
                <p>वैधानिक अवधि: {SITE_CONFIG.compliance.grievanceOfficer.responseWindow}</p>
              </div>
              <div className="pt-2 border-t border-amber-200">
                <Link
                  href="/grievance-redressal"
                  className="font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1"
                >
                  विस्तृत शिकायत निवारण प्रक्रिया पढ़ें →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
