"use client";

import { useState } from "react";
import Image from "next/image";

interface HinokiEffectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// モーダルコンポーネント
function HinokiEffectsModal({ isOpen, onClose }: HinokiEffectsModalProps) {
  if (!isOpen) return null;

  const effects = [
    {
      name: "リラックス・リフレッシュ",
      description:
        "心と脳に働きかけ、心を落ち着ける鎮静作用と、気持ちを前向きにする強壮作用があります",
      icon: "ri-mental-health-line",
    },
    {
      name: "抗菌・消臭",
      description: "抗菌性・消臭性に優れ、空間を清潔に保ちます",
      icon: "ri-shield-check-line",
    },
    {
      name: "防虫・清浄",
      description: "天然の防虫効果で、安全に空間を守ります",
      icon: "ri-leaf-line",
    },
    {
      name: "代謝促進",
      description: "潤いを与え、細胞を引き締め、代謝を促し活性力を高めます",
      icon: "ri-refresh-line",
    },
  ];

  const usageScenes = [
    "バッグに入れて持ち歩く",
    "キャンドルとともに灯りと香りを楽しむ",
    "マスクにひと吹きしてリフレッシュ",
    "モビールとして吊るし、香りとインテリアを同時に楽しむ",
    "お部屋や車内のリフレッシュミストとして",
    "寝具や衣類に軽くスプレー",
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-500 ease-out animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500 ease-out">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 ease-out">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-stone-200 animate-in slide-in-from-top duration-700 ease-out">
            <div>
              <h2 className="text-3xl font-serif text-stone-800 mb-2">
                檜の効果と特徴
              </h2>
              <p className="text-stone-600">
                富士山の麓で育った檜がもたらす自然の恵み
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Effects Grid */}
            <div className="mb-8 animate-in slide-in-from-bottom duration-700 ease-out delay-100">
              <h3 className="text-xl font-serif text-stone-800 mb-4">
                檜の主な効果
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {effects.map((effect, index) => (
                  <div
                    key={index}
                    className="bg-stone-50 p-6 rounded-xl transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:bg-white animate-in slide-in-from-bottom"
                    style={{
                      animationDelay: `${200 + index * 100}ms`,
                      animationDuration: "600ms",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-green-700 text-white rounded-full flex-shrink-0 transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6">
                        <i className={`${effect.icon} text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-stone-800 mb-2">
                          {effect.name}
                        </h4>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {effect.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Scenes */}
            <div className="mb-8 animate-in slide-in-from-bottom duration-700 ease-out delay-300">
              <h3 className="text-xl font-serif text-stone-800 mb-4">
                使用シーン
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {usageScenes.map((scene, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-lg transition-all duration-300 ease-out hover:border-green-600 hover:bg-stone-50 hover:shadow-md hover:scale-[1.02] animate-in slide-in-from-left"
                    style={{
                      animationDelay: `${400 + index * 80}ms`,
                      animationDuration: "500ms",
                    }}
                  >
                    <i className="ri-check-line text-green-600 transition-transform duration-300 ease-out hover:scale-125"></i>
                    <span className="text-stone-700">{scene}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promise Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-800 to-green-700 rounded-xl text-white transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] animate-in slide-in-from-bottom delay-500">
              <h3 className="text-xl font-serif mb-3">私たちのこだわり</h3>
              <p className="text-green-50 mb-4">
                富士山の麓で育ったひのきを低温乾燥する際に発生する蒸気から抽出した、
                100％天然の抽出水を使用。ミネラルを豊富に含み、
                天然100％の国産ひのきアロマオイルをブレンドしています。
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-110">
                  <i className="ri-check-line text-green-300"></i>
                  <span>100% 天然成分</span>
                </div>
                <div className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-110">
                  <i className="ri-check-line text-green-300"></i>
                  <span>国産檜使用</span>
                </div>
                <div className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-110">
                  <i className="ri-check-line text-green-300"></i>
                  <span>環境にやさしい</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// メインコンポーネント
export default function BrandStorySection() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showEffectsModal, setShowEffectsModal] = useState(false);

  return (
    <section id="about" className="py-20 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl transition-transform duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl">
              <Image
                src="/images/top1.webp"
                alt="富士山の麓の檜の森"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <div className="text-sm text-stone-600 italic animate-in fade-in slide-in-from-top duration-700 ease-out">
                HINOKI ESSENCE - 富士の麓から届く、自然の香り
              </div>

              <h2 className="text-4xl lg:text-5xl font-serif text-stone-800 leading-tight animate-in fade-in slide-in-from-top duration-700 ease-out delay-100">
                千年の香り、
                <br />
                自然の恵み
              </h2>

              <p className="text-lg text-stone-600 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 ease-out delay-200">
                富士山の麓で育ったひのきから生まれた、
                自然の香りを持ち歩けるアイテムシリーズです。
                ひのきの蒸留水と天然アロマをブレンドした「ひのきウォーター」と、
                その香りを楽しむための「フレグランスペーパー」を組み合わせ、
                日常のさまざまなシーンで自然のやさしい香りをお届けします。
              </p>

              <p className="text-stone-600 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 ease-out delay-300">
                100％天然の抽出水に、国産ひのきアロマオイルをブレンド。
                ミネラル豊富で、空間・肌・髪など多用途に活躍します。
                天然のひのき成分が、心を穏やかにしながら空間を清浄に整えます。
              </p>

              {/* Additional content shown when "もっと見る" is clicked */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  showMoreInfo
                    ? "max-h-[800px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-4 mt-6 p-6 bg-white/60 rounded-xl border border-stone-200 animate-in slide-in-from-top duration-500 ease-out">
                  <h3 className="text-xl font-serif text-stone-800">
                    私たちのこだわり
                  </h3>

                  <div className="space-y-4">
                    <div className="transition-all duration-500 ease-out hover:translate-x-2">
                      <h4 className="font-medium text-stone-800 mb-2">
                        フレグランスペーパーについて
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        木材パルプを主原料としたバイオマス不織布に、ひのきウォーターを染み込ませています。
                        使用しているセルロースやバイオマスプラスチック(PLA)は生分解性を持ち、
                        一定条件のもとで分解され自然に還る、環境にやさしい素材です。
                      </p>
                    </div>

                    <div className="transition-all duration-500 ease-out hover:translate-x-2">
                      <h4 className="font-medium text-stone-800 mb-2">
                        ひのきウォーターについて
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        富士山の麓で育つひのきを低温乾燥させる際の蒸気から抽出した、天然100％のひのき抽出水。
                        天然ひのきアロマオイルをブレンドし、清涼感と深い森林香を実現しています。
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-stone-100 rounded-lg">
                      <div className="text-2xl font-serif text-stone-800">
                        100%
                      </div>
                      <div className="text-sm text-stone-600">天然成分</div>
                    </div>
                    <div className="text-center p-4 bg-stone-100 rounded-lg">
                      <div className="text-2xl font-serif text-stone-800">
                        富士山麓
                      </div>
                      <div className="text-sm text-stone-600">産地直送</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom duration-700 ease-out delay-400">
              <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="px-8 py-3 bg-green-800 text-white text-sm font-medium hover:bg-green-700 transition-all duration-500 ease-out whitespace-nowrap cursor-pointer rounded-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                {showMoreInfo ? "閉じる" : "もっと見る"}
              </button>
              <button
                onClick={() => setShowEffectsModal(true)}
                className="px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-all duration-500 ease-out whitespace-nowrap cursor-pointer rounded-md hover:border-green-700 hover:text-green-700 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                檜の効果について
              </button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-200">
              <div className="space-y-2 transition-all duration-500 ease-out hover:translate-y-[-4px] animate-in fade-in slide-in-from-left delay-500">
                <div className="w-8 h-8 flex items-center justify-center text-green-700 transition-transform duration-300 ease-out hover:scale-125 hover:rotate-12">
                  <i className="ri-tree-line text-xl"></i>
                </div>
                <h4 className="font-medium text-stone-800">100% 国産檜</h4>
                <p className="text-sm text-stone-600">
                  富士山麓産の厳選された檜のみ使用
                </p>
              </div>
              <div className="space-y-2 transition-all duration-500 ease-out hover:translate-y-[-4px] animate-in fade-in slide-in-from-right delay-600">
                <div className="w-8 h-8 flex items-center justify-center text-green-700 transition-transform duration-300 ease-out hover:scale-125 hover:rotate-12">
                  <i className="ri-recycle-line text-xl"></i>
                </div>
                <h4 className="font-medium text-stone-800">環境配慮</h4>
                <p className="text-sm text-stone-600">
                  生分解性素材で自然に還る設計
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Effects Modal */}
      <HinokiEffectsModal
        isOpen={showEffectsModal}
        onClose={() => setShowEffectsModal(false)}
      />
    </section>
  );
}
