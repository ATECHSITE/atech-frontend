"use client";

import { useState } from "react";
import { useTranslations } from "@/i18n/context";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur s'est produite");
      }

      setSubmitted(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#0F2540]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 bg-white/10 text-white/80">
            {t("badge")}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Info */}
          <div className="space-y-10">
            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t("title")}
              </h2>
            </div>

            {/* Description Box */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <p className="text-blue-100/80 text-base leading-relaxed mb-6">
                {t("subtitle")}
              </p>
              <div className="flex items-center gap-2 text-white font-semibold">
                <svg className="w-5 h-5 text-[#E8763A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{t("email")}</span>
              </div>
            </div>

            {/* What Happens Next */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {t("nextSteps.title")}
              </h3>
              <div className="space-y-5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8763A] flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-blue-100/70 pt-1 leading-relaxed">
                      {t(`nextSteps.steps.${i}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#0F2540] mb-2">
                  {t("form.title")}
                </h3>
                <div className="w-12 h-1 bg-[#E8763A] mx-auto rounded-full" />
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-green-50">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h4>
                  <p className="text-gray-500 text-sm">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.firstName")}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder={t("form.placeholder.firstName")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8763A] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.lastName")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder={t("form.placeholder.lastName")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8763A] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t("form.placeholder.email")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8763A] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t("form.placeholder.phone")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8763A] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={t("form.placeholder.message")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8763A] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#E8763A] hover:bg-[#d6692f] text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg relative overflow-hidden"
                  >
                    {loading && (
                      <span className="absolute inset-0 animate-shimmer" />
                    )}
                    {loading ? (
                      <span className="flex items-center justify-center gap-2 relative z-10">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi...
                      </span>
                    ) : (
                      <span className="relative z-10">{t("form.submit")}</span>
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
