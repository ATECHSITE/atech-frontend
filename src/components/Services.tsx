"use client";

import { useTranslations } from "@/i18n/context";
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
};

export default function Services() {
  const t = useTranslations("services");
  const { ref, isVisible } = useScrollAnimation();

  const items: ServiceItem[] = [0, 1, 2].map((i) => ({
    icon: t(`items.${i}.icon`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
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
              className="group rounded-3xl p-10 bg-white border-2 border-gray-200 hover:border-[#2B7BE5] hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in-up relative transform-gpu"
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

              <p className="text-base leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
