"use client";

import { useTranslations } from "@/i18n/context";
import Logo from "./Logo";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const t = useTranslations("about");
  const highlights: string[] = [0, 1, 2, 3].map((i) => t(`highlights.${i}`));
  const { ref, isVisible } = useScrollAnimation();

  const visible = "opacity-100 translate-y-0";
  const hidden = "opacity-0 translate-y-8";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="py-24 lg:py-32 overflow-hidden"
      style={{ background: "#F4F6FB" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — pleine largeur */}
        <div
          className={`mb-14 transition-all duration-700 ${isVisible ? visible : hidden}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "#E8763A" }}
            >
              {t("badge")}
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight max-w-3xl"
            style={{ color: "#0F2540" }}
          >
            {t("title")}
          </h2>
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-[5fr_7fr] gap-8 items-start">

          {/* Panneau identité — gauche */}
          <div
            className={`transition-all duration-700 delay-100 ${isVisible ? visible : hidden}`}
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #0F2540 0%, #1B3D6F 100%)",
              }}
            >
              {/* Trait orange top */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: "#E8763A" }}
              />

              <div className="relative z-10 p-8">
                {/* Logo */}
                <div className="mb-7">
                  <Logo variant="white" height={34} />
                </div>

                {/* Stats */}
                <div
                  className="grid grid-cols-3 gap-0 mb-7"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {[
                    { value: "8+", label: t("statsProducts") },
                    { value: "360°", label: t("statsDigital") },
                    { value: "BF", label: "Burkina Faso" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="py-4 text-center"
                      style={{
                        borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                      }}
                    >
                      <div className="text-2xl font-black text-white leading-none mb-1">
                        {stat.value}
                      </div>
                      <div
                        className="text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: "rgba(147,197,253,0.6)" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Localisation */}
                <div className="flex items-center gap-2 mb-6">
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: "#E8763A" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(147,197,253,0.55)" }}
                  >
                    Ouaga 2000, Ouagadougou, Burkina Faso
                  </span>
                </div>

                {/* Carte */}
                <div
                  className="overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31264.328472890396!2d-1.4936!3d12.3569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2ebe7f84eb2ab1%3A0x7a8aa2d8e6c8a8c8!2sOuaga%202000%2C%20Ouagadougou%2C%20Burkina%20Faso!5e0!3m2!1sen!2sus!4v1632847893221!5m2!1sen!2sus"
                    width="100%"
                    height="210"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contenu — droite */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? visible : hidden}`}
          >
            {/* Description 1 — accentuée */}
            <p
              className="text-base lg:text-lg leading-relaxed mb-5 pl-5 font-medium"
              style={{
                color: "#0F2540",
                borderLeft: "3px solid #E8763A",
              }}
            >
              {t("description1")}
            </p>

            {/* Description 2 */}
            <p
              className="leading-relaxed mb-10"
              style={{ color: "#6B7280" }}
            >
              {t("description2")}
            </p>

            {/* Highlights — grille 2×2 de cards numérotées */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="group relative p-5 bg-white hover:shadow-md transition-all duration-300 cursor-default"
                  style={{
                    border: "1px solid #E2E6EF",
                  }}
                >
                  {/* Barre hover top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: "#2A5298" }}
                  />
                  {/* Numéro */}
                  <span
                    className="text-[11px] font-black tracking-[0.15em] block mb-2.5"
                    style={{ color: "#E8763A" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Texte */}
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: "#0F2540" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform-gpu"
              style={{
                background: "#1B3D6F",
                willChange: "transform",
              }}
            >
              <span>{t("cta")}</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
