"use client";

import { useTranslations } from "@/i18n/context";
import Logo from "./Logo";

export default function About() {
  const t = useTranslations("about");
  const highlights: string[] = [0, 1, 2, 3].map((i) => t(`highlights.${i}`));

  return (
    <section id="about" className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Visual card */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0F2540 0%, #1B3D6F 100%)" }}>
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <Logo variant="white" height={40} />
                  </div>
                  <p className="text-blue-200/70 text-sm font-medium mb-4">Ouaga 2000, Ouagadougou, Burkina Faso</p>
                </div>
                <div className="mt-6">
                  <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31264.328472890396!2d-1.4936!3d12.3569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2ebe7f84eb2ab1%3A0x7a8aa2d8e6c8a8c8!2sOuaga%202000%2C%20Ouagadougou%2C%20Burkina%20Faso!5e0!3m2!1sen!2sus!4v1632847893221!5m2!1sen!2sus"
                      width="100%"
                      height="260"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-[#E8763A]" style={{ background: "rgba(232,118,58,0.1)" }}>
              {t("badge")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2540] mb-6 leading-tight">{t("title")}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{t("description1")}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{t("description2")}</p>

            <div className="space-y-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,118,58,0.15)" }}>
                    <svg className="w-3 h-3 text-[#E8763A]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)" }}>
                Collaborer avec nous
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
