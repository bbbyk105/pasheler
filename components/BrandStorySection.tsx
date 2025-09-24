"use client";

import { useState } from "react";
import Image from "next/image";
import IngredientsModal from "./IngredientsModal";

export default function BrandStorySection() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);

  return (
    <section id="about" className="py-20 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/top1.webp"
                alt="檜の森で生まれた天然フレグランス"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <div className="text-sm text-stone-600 italic">
                HINOKI ESSENCE -
                日本の森から生まれた、心を癒すフレグランスブランド
              </div>

              <h2 className="text-4xl lg:text-5xl font-serif text-stone-800 leading-tight">
                千年の香り、
                <br />
                自然の恵み
              </h2>

              <p className="text-lg text-stone-600 leading-relaxed">
                私たちは、日本古来から愛され続ける檜の力を信じています。
                厳選された国産檜から抽出したエッセンシャルオイルを使用し、
                現代の生活に自然の癒しをお届けする、こだわりのフレグランスコレクションです。
              </p>

              <p className="text-stone-600 leading-relaxed">
                それぞれの製品は、檜の持つ抗菌・リラックス効果を最大限に活かし、
                持続可能な方法で採取された原料のみを使用しています。
                あなたの日常に、森林浴のような深い安らぎをもたらします。
              </p>

              {/* Additional content shown when "もっと見る" is clicked */}
              {showMoreInfo && (
                <div className="space-y-4 mt-6 p-6 bg-white/60 rounded-xl border border-stone-200">
                  <h3 className="text-xl font-serif text-stone-800">
                    私たちのストーリー
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    岐阜県の美しい檜の森で生まれた私たちのブランドは、日本の伝統的な木材文化と
                    現代のアロマテラピーを融合させた、革新的なフレグランスブランドです。
                    創設者である私たちは、檜の持つ自然の力に魅了され、その香りを多くの人にお届けしたいと考えました。
                  </p>
                  <p className="text-stone-600 leading-relaxed">
                    地元の林業職人や調香師と協力し、伝統的な檜の加工技術と最新の抽出技術を組み合わせて、
                    最高品質のエッセンシャルオイルを生み出しています。
                    森林の持続可能性を重視し、適切な間伐材のみを使用することで、環境保護にも貢献しています。
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-stone-100 rounded-lg">
                      <div className="text-2xl font-serif text-stone-800">
                        2020
                      </div>
                      <div className="text-sm text-stone-600">創業年</div>
                    </div>
                    <div className="text-center p-4 bg-stone-100 rounded-lg">
                      <div className="text-2xl font-serif text-stone-800">
                        100%
                      </div>
                      <div className="text-sm text-stone-600">国産檜使用</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer rounded-md"
              >
                {showMoreInfo ? "まとめる" : "もっと見る"}
              </button>
              <button
                onClick={() => setShowIngredientsModal(true)}
                className="px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer rounded-md"
              >
                檜の効果について
              </button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-200">
              <div className="space-y-2">
                <div className="w-8 h-8 flex items-center justify-center text-stone-600">
                  <i className="ri-tree-line text-xl"></i>
                </div>
                <h4 className="font-medium text-stone-800">100% 国産檜</h4>
                <p className="text-sm text-stone-600">
                  厳選された日本産檜のみ使用
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 flex items-center justify-center text-stone-600">
                  <i className="ri-award-line text-xl"></i>
                </div>
                <h4 className="font-medium text-stone-800">伝統技術</h4>
                <p className="text-sm text-stone-600">
                  職人の技と現代科学の融合
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Modal */}
      <IngredientsModal
        isOpen={showIngredientsModal}
        onClose={() => setShowIngredientsModal(false)}
      />
    </section>
  );
}
