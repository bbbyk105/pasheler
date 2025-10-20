// components/TestimonialsSection.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { translations } from "../lib/translations";

// 画像パスの配列（言語に依存しない）
const testimonialImages = [
  "/people/joel.webp",
  "/people/kimono.webp",
  "/people/japan.webp",
];

export default function TestimonialsSection() {
  const { language } = useCart();
  const t = translations[language];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.items.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length
    );
  };

  const currentItem = t.testimonials.items[currentTestimonial];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-amber-50/30 to-stone-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-stone-600">{t.testimonials.subtitle}</p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                <Image
                  src={testimonialImages[currentTestimonial]}
                  alt={`${currentItem.name}${t.testimonials.imageAlt}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(currentItem.rating)].map((_, i) => (
                  <i
                    key={i}
                    className="ri-star-fill text-amber-400 text-lg"
                  ></i>
                ))}
              </div>

              <blockquote className="text-lg lg:text-xl text-stone-700 leading-relaxed mb-6 max-w-2xl">
                &ldquo;{currentItem.text}&rdquo;
              </blockquote>

              <div className="space-y-1">
                <h4 className="font-medium text-stone-800">
                  {currentItem.name}
                  {t.testimonials.honorific}
                </h4>
                <p className="text-sm text-stone-500">
                  {language === "ja"
                    ? `${currentItem.location}${t.testimonials.location}`
                    : `${t.testimonials.location} ${currentItem.location}`}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
              aria-label={t.testimonials.prevButton}
            >
              <i className="ri-arrow-left-line text-stone-600"></i>
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
              aria-label={t.testimonials.nextButton}
            >
              <i className="ri-arrow-right-line text-stone-600"></i>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {t.testimonials.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentTestimonial ? "bg-stone-400" : "bg-stone-200"
                }`}
                aria-label={`${index + 1}${t.testimonials.dotButton}`}
              />
            ))}
          </div>
        </div>

        {/* 追加の信頼要素 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full">
            <i className="ri-shield-check-line text-stone-600"></i>
            <span className="text-sm text-stone-600 font-medium">
              {t.testimonials.trustBadge}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
