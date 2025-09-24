"use client";

import { useState, useRef, useEffect } from "react";
import { Language, Currency } from "../lib/types";

interface LanguageCurrencySelectorProps {
  language: Language;
  currency: Currency;
  onLanguageChange: (language: Language) => void;
  onCurrencyChange: (currency: Currency) => void;
}

export default function LanguageCurrencySelector({
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
}: LanguageCurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languageLabels = {
    ja: "日本語",
    en: "English",
  };

  const currencyLabels = {
    JPY: "¥ JPY",
    AUD: "$ AUD",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
      >
        <span>
          {languageLabels[language]} | {currencyLabels[currency]}
        </span>
        <div className="w-4 h-4 flex items-center justify-center">
          <i
            className={`ri-arrow-down-s-line transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          ></i>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-stone-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-stone-100">
            <h3 className="text-xs font-medium text-stone-600 mb-2">
              Language / 言語
            </h3>
            <div className="space-y-1">
              {Object.entries(languageLabels).map(([lang, label]) => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang as Language);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-sm rounded transition-colors cursor-pointer ${
                    language === lang
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3">
            <h3 className="text-xs font-medium text-stone-600 mb-2">
              Currency / 通貨
            </h3>
            <div className="space-y-1">
              {Object.entries(currencyLabels).map(([curr, label]) => (
                <button
                  key={curr}
                  onClick={() => {
                    onCurrencyChange(curr as Currency);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-sm rounded transition-colors cursor-pointer ${
                    currency === curr
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
