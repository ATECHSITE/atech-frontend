"use client";

import { useTranslations } from "@/i18n/context";
import Logo from "./Logo";

export default function About() {
  const t = useTranslations("about");
  const highlights = [0, 1, 2, 3].map((i) => t(`highlights.${i}`));

  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0F2540 0%, #1B3D6F 100%)", minHeight: "420px" }}>
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10 p-10 h-full flex flex-col justify-between" style={{ minHeight: "420px" }}>
                <div>
                  <div className="mb-6"><Logo variant="white" height={34} /></div>
                  <p className="text-blue-200/70 text-sm">Ouaga 2000, OUAGADOUGOU, Burkina</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="text-3xl font-bold" style={{ color: "#E8763A" }}>120+</div>
                    <div className="text-xs text-blue-200/60 mt-1">Projects Delivered</div>
                  </div>
                  <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="text-3xl font-bold text-white">3+</div>
                    <div className="text-xs text-blue-200/60 mt-1">Years of Experience</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 rounded-2xl p-5 shadow-2xl bg-white" style={{ border: "1px solid rgba(232,118,58,0.2)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(232,118,58,0.1)" }}>
                  <svg className="w-4 h-4 text-[#E8763A]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">98%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: "98%", background: "linear-gradient(90deg, #E8763A, #F4A472)" }} />
              </div>
            </div>
          </div>

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
                Work With Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
