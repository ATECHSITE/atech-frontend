"use client";

import { useState } from "react";
import { useTranslations } from "@/i18n/context";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const inputBase =
  "w-full bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#1B3D6F] outline-none py-3 text-sm text-gray-900 placeholder-gray-300 transition-colors duration-200";

const labelBase =
  "block text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-1.5";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { ref, isVisible } = useScrollAnimation();

  const vis = "opacity-100 translate-y-0";
  const hid = "opacity-0 translate-y-10";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Une erreur s'est produite");
      setSubmitted(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    {
      label: "Email",
      value: t("info.email"),
      href: `mailto:${t("info.email")}`,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Téléphone",
      value: t("info.phone"),
      href: `tel:${t("info.phone")}`,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "Adresse",
      value: t("info.location"),
      href: null,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className={`overflow-hidden bg-white transition-all duration-1000 transform-gpu ${isVisible ? vis : hid}`}
      style={{ willChange: isVisible ? "auto" : "transform, opacity" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[5fr_7fr] lg:gap-16">

          {/* Panneau gauche — clair */}
          <div className={`py-24 lg:py-32 transition-all duration-700 delay-100 ${isVisible ? vis : hid}`}>

            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ background: "#E8763A" }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "#E8763A" }}
              >
                {t("badge")}
              </span>
            </div>

            {/* Titre */}
            <h2
              className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-5"
              style={{ color: "#0F2540" }}
            >
              {t("title")}
            </h2>

            {/* Sous-titre */}
            <p
              className="leading-relaxed mb-14 text-base"
              style={{ color: "#6B7280" }}
            >
              {t("subtitle")}
            </p>

            {/* Infos de contact */}
            <div>
              {infoItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5"
                  style={{ borderTop: "1px solid #E2E6EF" }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(232,118,58,0.1)",
                      color: "#E8763A",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1"
                      style={{ color: "#9CA3AF" }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: "#0F2540" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#E8763A")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#0F2540")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium" style={{ color: "#0F2540" }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #E2E6EF" }} />
            </div>
          </div>

          {/* Panneau droit — formulaire */}
          <div className={`pb-24 lg:py-32 transition-all duration-700 delay-200 ${isVisible ? vis : hid}`}>
            <div
              className="bg-white h-full"
              style={{ border: "1px solid #E2E6EF", background: "#F4F6FB" }}
            >
              <div className="p-8 lg:p-10">

                {/* En-tête formulaire */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-3" style={{ color: "#0F2540" }}>
                    {t("form.title")}
                  </h3>
                  <div className="w-8 h-[3px]" style={{ background: "#E8763A" }} />
                </div>

                {submitted ? (
                  <div className="flex flex-col items-start py-10">
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-5"
                      style={{ background: "rgba(27,61,111,0.08)" }}
                    >
                      <svg className="w-6 h-6" style={{ color: "#1B3D6F" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-black mb-2" style={{ color: "#0F2540" }}>
                      Message envoyé !
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                      {t("form.success")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Prénom / Nom */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className={labelBase}>{t("form.firstName")}</label>
                        <input type="text" name="firstName" required placeholder={t("form.placeholder.firstName")} className={inputBase} />
                      </div>
                      <div>
                        <label className={labelBase}>{t("form.lastName")}</label>
                        <input type="text" name="lastName" required placeholder={t("form.placeholder.lastName")} className={inputBase} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelBase}>{t("form.email")}</label>
                      <input type="email" name="email" required placeholder={t("form.placeholder.email")} className={inputBase} />
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className={labelBase}>{t("form.phone")}</label>
                      <input type="tel" name="phone" placeholder={t("form.placeholder.phone")} className={inputBase} />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelBase}>{t("form.message")}</label>
                      <textarea name="message" required rows={5} placeholder={t("form.placeholder.message")} className={`${inputBase} resize-none`} />
                    </div>

                    {/* Erreur */}
                    {error && (
                      <div
                        className="text-sm px-4 py-3 border-l-4"
                        style={{ background: "rgba(239,68,68,0.05)", borderColor: "#EF4444", color: "#DC2626" }}
                      >
                        {error}
                      </div>
                    )}

                    {/* Bouton */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full flex items-center justify-center gap-3 py-4 font-bold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: "#1B3D6F" }}
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          <span>{t("form.submit")}</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center" style={{ color: "#9CA3AF" }}>
                      Notre équipe vous répond sous 24h ouvrées.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
