"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { translations as baseTranslations } from "../../lib/translations";
import { useCart } from "../../components/CartContext";
import Link from "next/link";
import type { ContactFormData, ContactApiResponse } from "@/types/contact";

export default function ContactContent() {
  const { language } = useCart();
  const t = baseTranslations[language]?.contact ?? baseTranslations.en.contact;

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // エラーメッセージをクリア
    if (submitStatus.type === "error") {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: ContactApiResponse = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message || "お問い合わせを送信しました",
        });
        // フォームをリセット
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "送信に失敗しました",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus({
        type: "error",
        message: "ネットワークエラーが発生しました",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addressLines = t.addressMultiline.split("\n");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/hinoki.webp')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-200">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-800 mb-6">
                  {t.getInTouch}
                </h2>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-stone-600 whitespace-pre-line">
                  {t.intro}
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full">
                    <i className="ri-map-pin-line text-xl text-stone-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-1">
                      {t.ourStore}
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600 whitespace-pre-line">
                      {addressLines.join("\n")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full">
                    <i className="ri-phone-line text-xl text-stone-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-1">
                      {t.callUs}
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600">
                      +81 80-1619-9914
                      <br />
                      {t.phoneHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full">
                    <i className="ri-mail-line text-xl text-stone-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-1">
                      {t.emailUs}
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600">
                      hello@yawnnap.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-4">
                  {t.followUs}
                </h3>
                <div className="flex gap-4">
                  <Link
                    href="https://www.instagram.com/pachelar_room/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagramを開く"
                  >
                    <button className="w-10 h-10 flex items-center justify-center bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors cursor-pointer">
                      <i className="ri-instagram-line text-lg sm:text-xl"></i>
                    </button>
                  </Link>
                  <Link
                    href="https://x.com/kanabo_292929?t=evTOYumN6nB379phr_tp_Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Xを開く"
                  >
                    <button className="w-10 h-10 flex items-center justify-center bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors cursor-pointer">
                      <i className="ri-twitter-x-fill text-lg sm:text-xl"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-stone-50 p-8 rounded-lg">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-stone-800 mb-6">
                {t.sendMessage}
              </h2>

              {/* ステータスメッセージ */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <i
                      className={`${
                        submitStatus.type === "success"
                          ? "ri-checkbox-circle-line"
                          : "ri-error-warning-line"
                      } text-xl`}
                    ></i>
                    <p className="text-sm sm:text-base font-medium">
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm sm:text-base font-medium text-stone-700 mb-2"
                    >
                      {t.fields.fullName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm sm:text-base disabled:bg-stone-100 disabled:cursor-not-allowed"
                      placeholder={t.placeholders.fullName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm sm:text-base font-medium text-stone-700 mb-2"
                    >
                      {t.fields.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm sm:text-base disabled:bg-stone-100 disabled:cursor-not-allowed"
                      placeholder={t.placeholders.email}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm sm:text-base font-medium text-stone-700 mb-2"
                  >
                    {t.fields.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm sm:text-base disabled:bg-stone-100 disabled:cursor-not-allowed"
                    placeholder={t.placeholders.subject}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm sm:text-base font-medium text-stone-700 mb-2"
                  >
                    {t.fields.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm sm:text-base resize-none disabled:bg-stone-100 disabled:cursor-not-allowed"
                    placeholder={t.placeholders.message}
                  />
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    {formData.message.length}/500 {t.charactersSuffix}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-stone-800 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      送信中...
                    </>
                  ) : (
                    t.submit
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
