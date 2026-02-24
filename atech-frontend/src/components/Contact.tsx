"use client";

import { useState } from "react";
import { useTranslations } from "@/i18n/context";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const services = ["Custom Software Development", "Process Automation", "Cloud & Infrastructure", "Data & Analytics", "IT Consulting", "System Integration"];
  const focusStyle = { boxShadow: "0 0 0 3px rgba(232,118,58,0.15)" };

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ background: "#F8F9FC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-[#E8763A]" style={{ background: "rgba(232,118,58,0.1)" }}>
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2540] mb-4">{t("title")}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: "email", label: "Email", value: t("info.email") },
              { icon: "phone", label: "Phone", value: t("info.phone") },
              { icon: "location", label: "Location", value: t("info.location") },
            ].map((info) => (
              <div key={info.icon} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(232,118,58,0.1), rgba(244,164,114,0.1))" }}>
                  {info.icon === "email" && <svg className="w-5 h-5 text-[#E8763A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  {info.icon === "phone" && <svg className="w-5 h-5 text-[#E8763A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                  {info.icon === "location" && <svg className="w-5 h-5 text-[#E8763A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{info.label}</div>
                  <div className="text-sm font-medium text-gray-800">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(232,118,58,0.1)" }}>
                    <svg className="w-8 h-8 text-[#E8763A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t("form.name")}</label>
                      <input type="text" required placeholder={t("form.placeholder.name")} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all" onFocus={(e) => e.target.style.boxShadow = focusStyle.boxShadow} onBlur={(e) => e.target.style.boxShadow = "none"} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t("form.email")}</label>
                      <input type="email" required placeholder={t("form.placeholder.email")} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all" onFocus={(e) => e.target.style.boxShadow = focusStyle.boxShadow} onBlur={(e) => e.target.style.boxShadow = "none"} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t("form.company")}</label>
                      <input type="text" placeholder={t("form.placeholder.company")} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all" onFocus={(e) => e.target.style.boxShadow = focusStyle.boxShadow} onBlur={(e) => e.target.style.boxShadow = "none"} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t("form.service")}</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none transition-all appearance-none bg-white" onFocus={(e) => e.target.style.boxShadow = focusStyle.boxShadow} onBlur={(e) => e.target.style.boxShadow = "none"}>
                        <option value="">{t("form.placeholder.service")}</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t("form.message")}</label>
                    <textarea required rows={5} placeholder={t("form.placeholder.message")} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all resize-none" onFocus={(e) => e.target.style.boxShadow = focusStyle.boxShadow} onBlur={(e) => e.target.style.boxShadow = "none"} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)" }}>
                    {loading ? (
                      <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>
                    ) : (
                      <>{t("form.submit")}<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
