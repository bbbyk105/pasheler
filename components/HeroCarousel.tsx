"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroCarousel() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 檜の森の背景画像 */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp" // 檜の森の画像パスに変更してください
          alt="檜の森の美しい風景"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-stone-900/30"></div>

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-8 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-5xl lg:text-7xl font-serif font-light text-white leading-tight mb-6 drop-shadow-lg">
                HINOKI ESSENCE
              </h1>
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-medium text-stone-100">
                  天然檜エキスフレグランス
                </h2>
                <p className="text-base lg:text-lg text-stone-200 leading-relaxed max-w-2xl mx-auto drop-shadow">
                  日本の美しい檜の森から生まれた、心を癒す天然フレグランス。
                  千年の時を越えて受け継がれてきた檜の香りが、あなたの日常に深いリラクゼーションと
                  自然の恵みをもたらします。
                </p>
              </div>
            </div>

            <Link
              href="/hinoki-collection"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white/90 backdrop-blur-sm text-stone-800 text-base font-medium rounded-lg hover:bg-white transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg"
            >
              檜コレクションを見る
              <i className="ri-arrow-right-line text-lg"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
