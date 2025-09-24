"use client";

import { useState } from "react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "田中 美香",
      location: "東京",
      rating: 5,
      text: "檜エッセンシャルオイルを使い始めて2週間で、毎日の疲れがすっと抜けるようになりました。森林浴をしているような深いリラックス効果を感じています。",
      image:
        "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20Japanese%20woman%20in%20her%2030s%20with%20serene%20expression%2C%20natural%20beauty%2C%20warm%20smile%2C%20clean%20white%20background%2C%20soft%20lighting&width=80&height=80&seq=hinoki_testimonial1&orientation=squarish",
    },
    {
      id: 2,
      name: "佐藤 恵子",
      location: "大阪",
      rating: 5,
      text: "リードディフューザーを寝室に置いてから、睡眠の質が格段に向上しました。檜の香りに包まれて眠るのが毎日の楽しみになっています。",
      image:
        "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20Japanese%20woman%20in%20her%2040s%20with%20peaceful%20expression%2C%20healthy%20skin%2C%20gentle%20smile%2C%20clean%20background%2C%20natural%20lighting&width=80&height=80&seq=hinoki_testimonial2&orientation=squarish",
    },
    {
      id: 3,
      name: "山田 真理子",
      location: "京都",
      rating: 5,
      text: "檜キャンドルの香りは本当に心が落ち着きます。仕事で疲れた夜に灯すと、まるで温泉旅館にいるような癒しを感じられます。",
      image:
        "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20Japanese%20woman%20in%20her%2020s%20with%20radiant%20skin%2C%20natural%20glow%2C%20confident%20smile%2C%20clean%20white%20background%2C%20professional%20lighting&width=80&height=80&seq=hinoki_testimonial3&orientation=squarish",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-amber-50/30 to-stone-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
            お客様の声
          </h2>
          <p className="text-lg text-stone-600">
            檜の香りで癒しを感じているお客様からの実際のご感想
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                <Image
                  src={testimonials[currentTestimonial].image}
                  alt={`${testimonials[currentTestimonial].name}様の写真`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <i
                      key={i}
                      className="ri-star-fill text-amber-400 text-lg"
                    ></i>
                  )
                )}
              </div>

              <blockquote className="text-lg lg:text-xl text-stone-700 leading-relaxed mb-6 max-w-2xl">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </blockquote>

              <div className="space-y-1">
                <h4 className="font-medium text-stone-800">
                  {testimonials[currentTestimonial].name}様
                </h4>
                <p className="text-sm text-stone-500">
                  {testimonials[currentTestimonial].location}在住
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
              aria-label="前のお客様の声"
            >
              <i className="ri-arrow-left-line text-stone-600"></i>
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
              aria-label="次のお客様の声"
            >
              <i className="ri-arrow-right-line text-stone-600"></i>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentTestimonial ? "bg-stone-400" : "bg-stone-200"
                }`}
                aria-label={`${index + 1}番目のお客様の声を表示`}
              />
            ))}
          </div>
        </div>

        {/* 追加の信頼要素 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full">
            <i className="ri-shield-check-line text-stone-600"></i>
            <span className="text-sm text-stone-600 font-medium">
              100% 天然成分 | 国産檜使用 | 満足度98%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
