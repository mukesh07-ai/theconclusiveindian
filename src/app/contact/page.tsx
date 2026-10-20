"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      topic: "general",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
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
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          संपर्क करें (Contact Us)
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          संपादकीय सुझाव, समाचार की सूचना (News Tip), विज्ञापन या शिकायत निवारण के लिए हमारी टीम से संपर्क करें।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#F5F6F8] p-6 rounded-xl border border-gray-200 space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-300">
              प्रधान कार्यालय (Headquarters)
            </h3>

            <div className="flex items-start gap-3 text-xs text-gray-700">
              <MapPin className="w-4 h-4 text-[#E52532] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">{SITE_CONFIG.name}</p>
                <p>{SITE_CONFIG.address.street}</p>
                <p>
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} - {SITE_CONFIG.address.pin}
                </p>
                <p>{SITE_CONFIG.address.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-700">
              <Mail className="w-4 h-4 text-[#233768] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">संपादकीय ईमेल:</p>
                <a
                  href={`mailto:${SITE_CONFIG.editorialEmail}`}
                  className="text-[#233768] hover:underline"
                >
                  {SITE_CONFIG.editorialEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-700">
              <Phone className="w-4 h-4 text-[#233768] shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">फोन नंबर:</p>
                <span>{SITE_CONFIG.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-700">
              <Clock className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">संपादकीय डेस्क समय:</p>
                <span>सोमवार - शनिवार: प्रातः 09:00 से सायं 08:00</span>
              </div>
            </div>
          </div>

          {/* Grievance Redressal Box */}
          <div id="grievance" className="bg-amber-50/70 p-6 rounded-xl border border-amber-200 space-y-3 text-xs">
            <h4 className="font-bold text-amber-900 flex items-center gap-1.5 text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              शिकायत निवारण अधिकारी (Grievance Officer)
            </h4>
            <p className="text-amber-800 leading-relaxed">
              सूचना प्रौद्योगिकी नियम 2021 के तहत किसी भी प्रकाशित सामग्री पर आपत्ति दर्ज करने के लिए हमारे नामित शिकायत अधिकारी से संपर्क करें:
            </p>
            <div className="text-amber-950 font-medium space-y-1">
              <p>अधिकारी का नाम: <strong>श्री आलोक नारायण (वरिष्ठ विधिक सलाहकार)</strong></p>
              <p>ईमेल: grievance@theconclusiveindian.com</p>
              <p>प्रतिक्रिया अवधि: 24 घंटे के भीतर पावती, 15 दिनों में निस्तारण</p>
            </div>
          </div>
        </div>

        {/* Interactive Form (7 Cols) */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-2xs">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
            संदेश या समाचार सुझाव भेजें
          </h3>

          {submitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h4 className="text-base font-bold text-green-900">
                संदेश सफलतापूर्वक प्राप्त हुआ!
              </h4>
              <p className="text-xs text-green-700 max-w-md mx-auto">
                धन्यवाद! आपका संदेश हमारी संपादकीय टीम को भेज दिया गया है। आवश्यकता पड़ने पर हमारी टीम आपसे शीघ्र संपर्क करेगी।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    पूरा नाम <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="आपका नाम..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ईमेल पता <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    फ़ोन नंबर (वैकल्पिक)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    संपर्क का विषय <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#233768]"
                  >
                    <option value="general">सामान्य पूछताछ (General Inquiry)</option>
                    <option value="tip">समाचार सुझाव / टिप (News Tip)</option>
                    <option value="correction">तथ्य सुधार अनुरोध (Fact Correction)</option>
                    <option value="advertise">विज्ञापन संबंधी (Advertising)</option>
                    <option value="grievance">शिकायत निवारण (Grievance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  संदेश / विवरण <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="कृपया अपना संदेश या समाचार संबंधी तथ्य विस्तार से लिखें..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#233768]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#233768] hover:bg-[#18274b] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" /> संदेश प्रेषित करें
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
