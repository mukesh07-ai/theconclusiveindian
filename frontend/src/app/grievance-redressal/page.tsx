import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldAlert,
  Clock,
  FileText,
  Scale,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `शिकायत निवारण (Grievance Redressal) - ${SITE_CONFIG.name}`,
  description: `सूचना प्रौद्योगिकी नियम 2021 के तहत शिकायत निवारण अधिकारी का विवरण, शिकायत दर्ज करने की प्रक्रिया और 15-दिवसीय निस्तारण समयसीमा।`,
  alternates: {
    canonical: "/grievance-redressal",
  },
  openGraph: {
    title: `शिकायत निवारण - ${SITE_CONFIG.name}`,
    description: `डिजिटल मीडिया आचार संहिता के तहत पाठक शिकायत प्रक्रिया।`,
  },
};

export default function GrievanceRedressalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "शिकायत निवारण तंत्र (Grievance Redressal Mechanism)",
    url: `${SITE_CONFIG.url}/grievance-redressal`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "होम",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "शिकायत निवारण",
          item: `${SITE_CONFIG.url}/grievance-redressal`,
        },
      ],
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

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#233768] hover:underline">
            होम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">शिकायत निवारण</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            आईटी नियम 2021 के तहत वैधानिक तंत्र
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            शिकायत निवारण तंत्र (Grievance Redressal Mechanism)
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>प्रभावी तिथि: 1 जनवरी 2024</span>
            <span>•</span>
            <span>अंतिम अद्यतन: 21 अक्टूबर 2026</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            भारत सरकार के <strong>सूचना प्रौद्योगिकी (मध्यवर्ती संस्थाओं के लिए दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 (IT Rules, 2021)</strong> के नियम 11 के अनुपालन में, <strong>{SITE_CONFIG.name}</strong> ने अपने पाठकों के लिए एक पारदर्शी और त्रि-स्तरीय शिकायत निवारण तंत्र स्थापित किया है।
          </p>
        </header>

        {/* Level 1: Grievance Officer Details Card */}
        <section className="bg-amber-50/70 p-6 sm:p-8 rounded-2xl border border-amber-200 space-y-5">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
            <ShieldAlert className="w-6 h-6 text-amber-700" />
            <h2>स्तर 1: नामित शिकायत निवारण अधिकारी (Grievance Officer - Level I)</h2>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            यदि किसी पाठक को हमारे पोर्टल पर प्रकाशित किसी समाचार, वीडियो अथवा सामग्री से आचार संहिता के उल्लंघन की कोई शिकायत है, तो वे सीधे हमारे नामित अधिकारी को लिख सकते हैं:
          </p>

          <div className="bg-white p-5 rounded-xl border border-amber-200/80 space-y-3 text-xs text-gray-800 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-gray-500 block text-[11px] font-semibold">अधिकारी का नाम:</span>
                <p className="font-bold text-sm text-gray-900">{SITE_CONFIG.compliance.grievanceOfficer.name}</p>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px] font-semibold">पदनाम:</span>
                <p className="font-semibold text-gray-900">{SITE_CONFIG.compliance.grievanceOfficer.title}</p>
              </div>
            </div>

            <div>
              <span className="text-gray-500 block text-[11px] font-semibold">आधिकारिक ईमेल पता:</span>
              <a
                href={`mailto:${SITE_CONFIG.compliance.grievanceOfficer.email}`}
                className="text-[#233768] font-bold underline text-sm"
              >
                {SITE_CONFIG.compliance.grievanceOfficer.email}
              </a>
            </div>

            <div>
              <span className="text-gray-500 block text-[11px] font-semibold">पत्राचार का पता:</span>
              <p className="text-gray-700">{SITE_CONFIG.compliance.grievanceOfficer.address}</p>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-amber-900 font-semibold">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>वैधानिक समयसीमा: शिकायत प्राप्ति के 24 घंटे में पावती, 15 दिनों में अंतिम निस्तारण।</span>
            </div>
          </div>
        </section>

        {/* How to Submit a Valid Grievance */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#233768]" /> शिकायत दर्ज करने के अनिवार्य नियम (How to File a Grievance)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>शिकायत का शीघ्र एवं निष्पक्ष निस्तारण सुनिश्चित करने हेतु पाठक कृपया अपने पत्र/ईमेल में निम्नलिखित विवरण अवश्य दें:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li><strong>शिकायतकर्ता का पूरा नाम एवं संपर्क सूत्र:</strong> वैध ईमेल व फोन नंबर।</li>
              <li><strong>विशिष्ट सामग्री का लिंक (URL):</strong> उस समाचार रिपोर्ट अथवा वीडियो का सटीक लिंक जिस पर आपत्ति है।</li>
              <li><strong>प्रकाशन की तिथि व शीर्षक:</strong> संबंधित सामग्री का शीर्षक।</li>
              <li><strong>आपत्ति का स्पष्ट कारण:</strong> आचार संहिता के किस नियम अथवा किस तथ्यात्मक अशुद्धि के कारण आपत्ति है।</li>
              <li><strong>समर्थक साक्ष्य:</strong> यदि कोई दस्तावेजी साक्ष्य उपलब्ध हो, तो उसे संलग्न करें।</li>
            </ul>
          </div>
        </section>

        {/* Three-Tier Redressal Structure */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#233768]" /> त्रि-स्तरीय शिकायत निवारण संरचना (3-Tier Framework)
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed pl-7">
            <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
              <h3 className="font-bold text-gray-900">स्तर 1: प्रकाशक स्तर (Publisher Grievance Officer)</h3>
              <p className="text-xs text-gray-600">
                द कन्क्लूसिव इंडियन के शिकायत अधिकारी द्वारा 15 दिनों में शिकायत का सीधे समाधान।
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
              <h3 className="font-bold text-gray-900">स्तर 2: स्व-नियामक निकाय स्तर (Self-Regulating Body - Level II)</h3>
              <p className="text-xs text-gray-600">
                यदि शिकायतकर्ता 15 दिनों में प्रकाशक के निर्णय से संतुष्ट नहीं होता, तो वह डिजिटल मीडिया के पंजीकृत स्व-नियामक निकाय (Self-Regulating Body of Publishers) के समक्ष अपील कर सकता है।
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
              <h3 className="font-bold text-gray-900">स्तर 3: केंद्रीय निगरानी तंत्र (Oversight Mechanism - Level III)</h3>
              <p className="text-xs text-gray-600">
                सूचना एवं प्रसारण मंत्रालय (Ministry of Information & Broadcasting), भारत सरकार द्वारा संचालित अंतर-विभागीय समिति।
              </p>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <Info className="w-4 h-4 text-gray-600" />
            <span>विधिक पारदर्शिता नोट (Legal Transparency Notice):</span>
          </div>
          <p>{SITE_CONFIG.compliance.legalReviewDisclaimer}</p>
        </div>
      </div>
    </>
  );
}
