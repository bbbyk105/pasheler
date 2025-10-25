"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import CartSidebar from "./CartSidebar";
import LanguageCurrencySelector from "./LanguageCurrencySelector";
import { translations } from "../lib/translations";
import { Language } from "../lib/types";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  const { getTotalItems, language, setLanguage, setCurrency } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = getTotalItems();
  const t = translations[language];

  // ✅ 言語変更時に通貨も自動切り替え
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);

    if (newLanguage === "en") {
      setCurrency("AUD");
    } else {
      setCurrency("JPY");
    }
  };

  return (
    <>
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="w-full px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              aria-label="ホームへ戻る"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/images/yawn_nap.webp"
                    alt="Yawn Nap ロゴ"
                    width={60}
                    height={60}
                    className="object-contain transition-transform duration-300 group-hover:rotate-3"
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-stone-700 hover:text-stone-900 transition-colors duration-200"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/catalog"
                className="text-stone-700 hover:text-stone-900 transition-colors duration-200"
              >
                {t.nav.products}
              </Link>
              <Link
                href="/contact"
                className="text-stone-700 hover:text-stone-900 transition-colors duration-200"
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <LanguageCurrencySelector
                language={language}
                onLanguageChange={handleLanguageChange}
              />

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg hover:bg-stone-50 transition-colors duration-200"
                aria-label={`カート（${totalItems}個の商品）`}
              >
                <i className="ri-shopping-bag-line text-xl text-stone-700"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-stone-800 text-white text-xs rounded-full flex items-center justify-center px-1 animate-in slide-in-from-top-1 duration-200">
                    {totalItems}
                  </span>
                )}
              </button>
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
