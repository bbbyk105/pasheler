"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import CartSidebar from "./CartSidebar";
import LanguageCurrencySelector from "./LanguageCurrencySelector";
import { translations } from "../lib/translations";

export default function Header() {
  const { getTotalItems, language, currency, setLanguage, setCurrency } =
    useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const totalItems = getTotalItems();
  const t = translations[language];

  const handleAboutClick = () => {
    if (pathname === "/") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#about");
    }
  };

  return (
    <>
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-['Pacifico'] text-stone-800"
            >
              logo
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/catalog"
                className="text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
              >
                {t.nav.products}
              </Link>
              <button
                onClick={handleAboutClick}
                className="text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
              >
                {t.nav.about}
              </button>
              <Link
                href="/contact"
                className="text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <LanguageCurrencySelector
                language={language}
                currency={currency}
                onLanguageChange={setLanguage}
                onCurrencyChange={setCurrency}
              />

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                <i className="ri-shopping-bag-line text-xl text-stone-700 hover:text-stone-900 transition-colors"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-stone-800 text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer">
                <i className="ri-menu-line text-xl text-stone-700"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
