// components/BrandStorySection.tsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { translations } from "../lib/translations";

interface HinokiEffectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// アイコンマッピング（言語に依存しない）
const effectIcons = [
  "ri-mental-health-line",
  "ri-shield-check-line",
  "ri-leaf-line",
  "ri-refresh-line",
];

// モーダルコンポーネント
function HinokiEffectsModal({ isOpen, onClose }: HinokiEffectsModalProps) {
  const { language } = useCart();
  const t = translations[language];

  // モーダルが開いている時に背景のスクロールを防ぐ
  useEffect(() => {
    if (isOpen) {
      // モーダルが開いたら body のスクロールを無効化
      document.body.style.overflow = "hidden";
    } else {
      // モーダルが閉じたら body のスクロールを有効化
      document.body.style.overflow = "unset";
    }

    // クリーンアップ関数: コンポーネントがアンマウントされた時にスクロールを戻す
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
                {t.hinokiEffects.modal.title}
              </h2>
              <p className="text-stone-600">{t.hinokiEffects.modal.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
              aria-label={t.common.close}
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Effects Grid */}
            <div className="mb-8 animate-in slide-in-from-bottom duration-700 ease-out delay-100">
              <h3 className="text-xl font-serif text-stone-800 mb-4">
                {t.hinokiEffects.effectsTitle}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {t.hinokiEffects.effects.map((effect, index) => (
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
                        <i className={`${effectIcons[index]} text-lg`}></i>
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
                {t.hinokiEffects.usageScenesTitle}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {t.hinokiEffects.usageScenes.map((scene, index) => (
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
              <h3 className="text-xl font-serif mb-3">
                {t.hinokiEffects.promise.title}
              </h3>
              <p className="text-green-50 mb-4">
                {t.hinokiEffects.promise.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-110">
                  <i className="ri-check-line text-green-300"></i>
                  <span>{t.hinokiEffects.promise.features.natural}</span>
                </div>
                <div className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-110">
                  <i className="ri-check-line text-green-300"></i>
                  <span>{t.hinokiEffects.promise.features.domestic}</span>
                </div>
                <div className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-110">
                  <i className="ri-check-line text-green-300"></i>
                  <span>{t.hinokiEffects.promise.features.eco}</span>
                </div>
              </div>
            </div>

            {/* Notice Section */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg animate-in slide-in-from-bottom delay-600">
              <div className="flex items-start gap-3">
                <i className="ri-information-line text-amber-600 text-lg flex-shrink-0 mt-0.5"></i>
                <p className="text-sm text-amber-900 leading-relaxed">
                  {t.hinokiEffects.notice}
                </p>
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
  const { language } = useCart();
  const t = translations[language];
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
                src="/images/hinoki2.webp"
                alt={t.brandStory.imageAlt}
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
                {t.brandStory.tagline}
              </div>

              <h2 className="text-4xl lg:text-5xl font-serif text-stone-800 leading-tight animate-in fade-in slide-in-from-top duration-700 ease-out delay-100">
                {t.brandStory.mainTitle}
                <br />
                {t.brandStory.mainTitleLine2}
              </h2>

              <p className="text-lg text-stone-600 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 ease-out delay-200">
                {t.brandStory.intro}
              </p>

              <p className="text-stone-600 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 ease-out delay-300">
                {t.brandStory.description}
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
                    {t.brandStory.ourCommitment.title}
                  </h3>

                  <div className="space-y-4">
                    <div className="transition-all duration-500 ease-out hover:translate-x-2">
                      <h4 className="font-medium text-stone-800 mb-2">
                        {t.brandStory.ourCommitment.fragrancePaper.title}
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {t.brandStory.ourCommitment.fragrancePaper.description}
                      </p>
                    </div>

                    <div className="transition-all duration-500 ease-out hover:translate-x-2">
                      <h4 className="font-medium text-stone-800 mb-2">
                        {t.brandStory.ourCommitment.hinokiWater.title}
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {t.brandStory.ourCommitment.hinokiWater.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-stone-100 rounded-lg">
                      <div className="text-2xl font-serif text-stone-800">
                        {t.brandStory.ourCommitment.stats.natural.value}
                      </div>
                      <div className="text-sm text-stone-600">
                        {t.brandStory.ourCommitment.stats.natural.label}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-stone-100 rounded-lg">
                      <div className="text-2xl font-serif text-stone-800">
                        {t.brandStory.ourCommitment.stats.origin.value}
                      </div>
                      <div className="text-sm text-stone-600">
                        {t.brandStory.ourCommitment.stats.origin.label}
                      </div>
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
                {showMoreInfo ? t.brandStory.showLess : t.brandStory.readMore}
              </button>
              <button
                onClick={() => setShowEffectsModal(true)}
                className="px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-all duration-500 ease-out whitespace-nowrap cursor-pointer rounded-md hover:border-green-700 hover:text-green-700 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                {t.brandStory.effectsButton}
              </button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-200">
              <div className="space-y-2 transition-all duration-500 ease-out hover:translate-y-[-4px] animate-in fade-in slide-in-from-left delay-500">
                <div className="w-8 h-8 flex items-center justify-center text-green-700 transition-transform duration-300 ease-out hover:scale-125 hover:rotate-12">
                  <i className="ri-tree-line text-xl"></i>
                </div>
                <h4 className="font-medium text-stone-800">
                  {t.brandStory.features.domestic.title}
                </h4>
                <p className="text-sm text-stone-600">
                  {t.brandStory.features.domestic.description}
                </p>
              </div>
              <div className="space-y-2 transition-all duration-500 ease-out hover:translate-y-[-4px] animate-in fade-in slide-in-from-right delay-600">
                <div className="w-8 h-8 flex items-center justify-center text-green-700 transition-transform duration-300 ease-out hover:scale-125 hover:rotate-12">
                  <i className="ri-recycle-line text-xl"></i>
                </div>
                <h4 className="font-medium text-stone-800">
                  {t.brandStory.features.eco.title}
                </h4>
                <p className="text-sm text-stone-600">
                  {t.brandStory.features.eco.description}
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
