"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function Footer() {
  const { language } = useCart();

  const translations = {
    ja: {
      brand: {
        description:
          "国産檜の香りに包まれる、心安らぐフレグランス。自然の恵みで日々を彩ります。",
      },
      shop: {
        title: "ショップ",
        allProducts: "すべての商品",
        contact: "お問い合わせ",
      },
      legal: {
        title: "法的情報",
        privacy: "プライバシーポリシー",
        terms: "利用規約",
        tokushoho: "特定商取引法に基づく表記",
        tokushohoShort: "特商法",
      },
      company: {
        title: "会社情報",
        about: "私たちについて",
      },
      copyright: "© 2025 Pachelar Room All rights reserved.",
    },
    en: {
      brand: {
        description:
          "Soothing fragrance embraced by the scent of Japanese cypress. Enrich your daily life with nature's blessings.",
      },
      shop: {
        title: "Shop",
        allProducts: "All Products",
        contact: "Contact Us",
      },
      legal: {
        title: "Legal",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        tokushoho: "Specified Commercial Transactions Act",
        tokushohoShort: "SCTA",
      },
      company: {
        title: "Company",
        about: "About Us",
      },
      copyright: "© 2025 Pachelar Room All rights reserved.",
    },
  };

  const t = translations[language];

  return (
    <footer className="bg-stone-900 text-white">
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-['Pacifico'] text-white mb-2">
                  Pachelar Room
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {t.brand.description}
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/pachelar_room/"
                  className="w-8 h-8 flex items-center justify-center bg-stone-800 hover:bg-stone-700 rounded-full transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="ri-instagram-line text-sm"></i>
                </a>
                <a
                  href="https://x.com/kanabo_292929?t=evTOYumN6nB379phr_tp_Q"
                  className="w-8 h-8 flex items-center justify-center bg-stone-800 hover:bg-stone-700 rounded-full transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <i className="ri-twitter-x-line text-sm"></i>
                </a>
              </div>
            </div>

            {/* Shop */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">{t.shop.title}</h4>
              <nav className="space-y-2">
                <Link
                  href="/catalog"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.shop.allProducts}
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.shop.contact}
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">{t.legal.title}</h4>
              <nav className="space-y-2">
                <Link
                  href="/legal/privacy-policy"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.legal.privacy}
                </Link>
                <Link
                  href="/legal/terms"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.legal.terms}
                </Link>
                <Link
                  href="/legal/tokushoho"
                  className="block text-sm text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.legal.tokushoho}
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-800">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-sm text-stone-400">{t.copyright}</p>
              <div className="flex gap-4 text-sm">
                <Link
                  href="/legal/privacy-policy"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.legal.privacy}
                </Link>
                <Link
                  href="/legal/terms"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.legal.terms}
                </Link>
                <Link
                  href="/legal/tokushoho"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.legal.tokushohoShort}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
