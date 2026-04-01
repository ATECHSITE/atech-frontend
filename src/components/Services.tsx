"use client";

import { useTranslations } from "@/i18n/context";
import { useState, useEffect } from "react";

const iconMap: Record<string, React.ReactNode> = {
  code: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M8 8L3 12L8 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8L21 12L16 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="12" cy="18" r="1" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  automation: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="3" strokeWidth="2"/>
      <path d="M12 2V6M12 18V22M22 12H18M6 12H2" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 5L16.5 7.5M7.5 16.5L5 19M19 19L16.5 16.5M7.5 7.5L5 5" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
  cloud: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 10C19.7 10 21 11.3 21 13C21 14.7 19.7 16 18 16H7C4.8 16 3 14.2 3 12C3 9.9 4.6 8.2 6.6 8C7.2 5.6 9.4 4 12 4C15 4 17.4 6.2 17.9 9.1C17.9 9.1 18 9.1 18 9.1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 14L9 19M12 14L12 19M15 14L15 19" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  analytics: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 17L7 13L11 17L17 8L21 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="11" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="8" r="1.5" fill="currentColor"/>
      <path d="M21 21H3" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  consulting: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="10" r="3" strokeWidth="2"/>
      <path d="M12 7V2M9 8L5.5 4.5M15 8L18.5 4.5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 21C6 18 8.5 15.5 12 15.5C15.5 15.5 18 18 18 21" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 17L6 22M16 17L18 22" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  integration: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="2"/>
      <path d="M10.5 6.5H13.5M6.5 10.5V13.5M17.5 10.5V13.5M10.5 17.5H13.5" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
  keyFeatures: string[];
  benefits: string[];
};

export default function Services() {
  const t = useTranslations("services");
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const items: ServiceItem[] = [0, 1, 2, 3, 4, 5].map((i) => ({
    icon: t(`items.${i}.icon`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    detailedDescription: t(`items.${i}.detailedDescription`),
    keyFeatures: (t.raw(`items.${i}.keyFeatures`) as string[]) || [],
    benefits: (t.raw(`items.${i}.benefits`) as string[]) || [],
  }));

  // Bloquer le scroll du site quand la modale est ouverte
  useEffect(() => {
    if (selectedService !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <>
      <section id="services" className="py-16 lg:py-20" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-[#E8763A]" style={{ background: "rgba(232, 118, 58, 0.1)" }}>
              {t("badge")}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2540] mb-4">{t("title")}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedService(i)}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(232,118,58,0.1) 0%, rgba(244,164,114,0.1) 100%)", color: "#E8763A" }}>
                  {iconMap[item.icon] ?? iconMap.code}
                </div>
                <h3 className="text-lg font-bold text-[#0F2540] mb-3 group-hover:text-[#E8763A] transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[#E8763A] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  Learn more
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService !== null && (
        <>
          {/* Side Panel */}
          <div
            className="fixed right-6 top-24 bottom-6 w-full max-w-lg bg-white z-40 shadow-2xl rounded-2xl overflow-y-auto"
            style={{
              animation: 'slideInRight 0.4s ease-out',
            }}
          >
            <style jsx>{`
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            `}</style>
            {/* Header */}
            <div className="sticky top-0 bg-[#0F2540] px-6 py-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,118,58,0.2)", color: "#E8763A" }}>
                  {iconMap[items[selectedService].icon] ?? iconMap.code}
                </div>
                <h3 className="text-xl font-bold text-white">{items[selectedService].title}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold text-[#0F2540] mb-3">Overview</h4>
                <p className="text-gray-600 leading-relaxed">{items[selectedService].detailedDescription}</p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-lg font-semibold text-[#0F2540] mb-4">Key Features</h4>
                <div className="space-y-3">
                  {items[selectedService].keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#E8763A]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
             

              {/* CTA */}
              
            </div>
          </div>
        </>
      )}
    </>
  );
}
