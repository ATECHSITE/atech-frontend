"use client";

import { useTranslations } from "@/i18n/context";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0F2540 0%, #1B3D6F 60%, #2A5298 100%)" }}>
      {/* Background decor */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E8763A 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F4A472 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32 lg:pt-40 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-orange-400/30 text-orange-300" style={{ background: "rgba(232, 118, 58, 0.1)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8763A] animate-pulse" />
              {t("badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              {t("title")}{" "}
              <span className="block" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t("titleHighlight")}
              </span>
            </h1>

            <p className="text-lg text-blue-100/80 leading-relaxed mb-10 max-w-xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#services" className="px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)" }}>
                {t("cta")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#contact" className="px-7 py-3.5 rounded-full font-semibold text-white border border-white/20 transition-all hover:bg-white/10 hover:-translate-y-0.5">
                {t("ctaSecondary")}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-blue-200/60">
              {["120+ projects", "8+ years experience", "98% satisfaction"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#E8763A]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Abstract visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28">
                    <path d="M40 12L16 64H32L40 44L48 64H64L40 12Z" fill="#E8763A" />
                    <path d="M40 12L64 64H48L40 44L32 64H16L40 12Z" fill="#1B3D6F" opacity="0.6" />
                    <path d="M28 52H52" stroke="#E8763A" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              {[
                { top: "top-8 right-8", delay: "0s", icon: "code", color: "#E8763A" },
                { top: "bottom-12 right-4", delay: "1s", icon: "cloud", color: "#93C5FD" },
                { top: "top-16 left-6", delay: "2s", icon: "chart", color: "#FCA472" },
                { top: "bottom-8 left-10", delay: "1.5s", icon: "bolt", color: "#E8763A" },
              ].map((item, i) => (
                <div key={i} className={`absolute ${item.top} w-12 h-12 rounded-2xl flex items-center justify-center animate-float`} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", animationDelay: item.delay }}>
                  {item.icon === "code" && <svg className="w-5 h-5" style={{ color: item.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                  {item.icon === "cloud" && <svg className="w-5 h-5" style={{ color: item.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
                  {item.icon === "chart" && <svg className="w-5 h-5" style={{ color: item.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                  {item.icon === "bolt" && <svg className="w-5 h-5" style={{ color: item.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                </div>
              ))}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 384 384">
                <circle cx="192" cy="192" r="120" stroke="#E8763A" strokeWidth="1" strokeDasharray="4 8" fill="none" />
                <circle cx="192" cy="192" r="160" stroke="white" strokeWidth="0.5" strokeDasharray="2 6" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 60V30C240 0 480 60 720 40C960 20 1200 60 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
