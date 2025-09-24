// src/components/sections/CTASection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-stone-800 to-stone-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://readdy.ai/api/search-image?query=Luxurious%20natural%20skincare%20products%20arranged%20elegantly%20on%20marble%20surface%20with%20soft%20golden%20lighting%2C%20spa-like%20atmosphere%2C%20Korean%20beauty%20products%2C%20serums%20and%20creams%2C%20minimalist%20aesthetic%2C%20warm%20ambient%20glow%2C%20premium%20cosmetics%20display%2C%20clean%20white%20background%20with%20subtle%20textures&width=1400&height=600&seq=cta-bg-1&orientation=landscape"
          alt="プレミアムスキンケア製品 - 高級ナチュラル化粧品コレクション"
          fill
          className="object-cover object-top opacity-20"
          sizes="100vw"
          priority={false}
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800/90 to-stone-900/90"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-serif text-white leading-tight">
              あなたのスキンケア <br />
              ルーティンを変革しませんか？
            </h2>
            <p className="text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
              最高品質のオーガニック成分で作られた、韓国発想の自然派スキンケア製品の
              完全コレクションをご発見ください。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/catalog"
              className="px-10 py-4 bg-white text-stone-900 text-sm font-medium hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer inline-block rounded-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800"
              aria-label="全商品をショッピング"
            >
              全商品をショッピング
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border-2 border-white text-white text-sm font-medium hover:bg-white hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer inline-block rounded-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800"
              aria-label="スキンケアアドバイスを受ける"
            >
              スキンケアアドバイス
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-stone-700">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center text-white mx-auto mb-4 bg-stone-700 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-white font-medium">送料無料</h3>
              <p className="text-sm text-stone-300">7,500円以上のご注文で</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center text-white mx-auto mb-4 bg-stone-700 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-medium">30日間保証</h3>
              <p className="text-sm text-stone-300">
                ご満足いただけない場合は返金
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center text-white mx-auto mb-4 bg-stone-700 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-medium">専門サポート</h3>
              <p className="text-sm text-stone-300">
                スキンケア相談もご利用いただけます
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
