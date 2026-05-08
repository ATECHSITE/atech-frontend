"use client";

import { useTranslations } from "@/i18n/context";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const iconMap: Record<string, string> = {
  consulting: "/images/icones/planning.png",
  integration: "/images/icones/support.png",
  analytics: "/images/icones/developpement.png",
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
  const { ref, isVisible } = useScrollAnimation();

  const items: ServiceItem[] = [0, 1, 2].map((i) => ({
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
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id="services"
        className={`py-20 lg:py-28 transition-all duration-1000 bg-white transform-gpu ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ willChange: isVisible ? 'auto' : 'transform, opacity' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F2540] mb-6">{t("title")}</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{t("subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedService(i)}
                className="group rounded-3xl p-10 bg-white border-2 border-gray-200 hover:border-[#2B7BE5] hover:shadow-xl transition-all duration-300 cursor-pointer opacity-0 animate-fade-in-up relative transform-gpu"
                style={{
                  animationDelay: `${i * 150}ms`,
                  animationFillMode: 'forwards',
                  willChange: 'transform, opacity, border-color, box-shadow'
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 transform-gpu" style={{ willChange: 'transform' }}>
                  <div className="relative w-12 h-12">
                    <Image
                      src={iconMap[item.icon] || "/images/icones/planning.png"}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="48px"
                      quality={100}
                      priority
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 text-[#0F2540] group-hover:text-[#2B7BE5] transition-colors">
                  {item.title}
                </h3>

                <p className="text-base leading-relaxed mb-6 text-gray-600">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-sm font-semibold text-[#2B7BE5] transition-all duration-300 group-hover:gap-3">
                  En savoir plus
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService !== null && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setSelectedService(null)}
          />

          {/* Modal Panel - Responsive */}
          <div
            className="fixed inset-x-4 top-20 bottom-4 md:right-6 md:left-auto md:top-24 md:bottom-6 w-auto md:max-w-lg bg-white z-50 shadow-2xl rounded-2xl overflow-y-auto"
            style={{
              animation: 'slideInRight 0.4s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
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
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
              .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
              }
            `}</style>
            {/* Header */}
            <div className="sticky top-0 bg-[#0F2540] px-6 py-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 p-2" style={{ background: "rgba(255,255,255,0.9)" }}>
                  <div className="relative w-full h-full">
                    <Image
                      src={iconMap[items[selectedService].icon] || "/images/icones/planning.png"}
                      alt={items[selectedService].title}
                      fill
                      className="object-contain"
                      sizes="48px"
                      quality={100}
                    />
                  </div>
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
                        <svg className="w-5 h-5 text-[#2B7BE5]" fill="currentColor" viewBox="0 0 20 20">
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
