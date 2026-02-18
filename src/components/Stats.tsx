"use client";

import { useTranslations } from "@/i18n/context";

export default function Stats() {
  const t = useTranslations("stats");
  const items = [0, 1, 2, 3].map((i) => ({ value: t(`items.${i}.value`), label: t(`items.${i}.label`) }));

  return (
    <section id="stats" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F2540 0%, #1B3D6F 100%)" }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E8763A 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F4A472 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-orange-300 border border-orange-400/30" style={{ background: "rgba(232,118,58,0.1)" }}>
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <div key={i} className="text-center p-8 rounded-2xl border border-white/10 hover:border-orange-400/40 transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="text-4xl lg:text-5xl font-bold mb-3" style={{ background: "linear-gradient(135deg, #E8763A 0%, #F4A472 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {item.value}
              </div>
              <div className="text-sm text-blue-200/70 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
