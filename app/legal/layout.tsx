// app/legal/layout.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useCart();

  const navItems = [
    {
      href: "/legal/privacy-policy",
      label: language === "ja" ? "プライバシーポリシー" : "Privacy Policy",
    },
    {
      href: "/legal/terms",
      label: language === "ja" ? "利用規約" : "Terms of Service",
    },
    {
      href: "/legal/tokushoho",
      label:
        language === "ja"
          ? "特定商取引法に基づく表記"
          : "Commercial Transactions Act",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ナビゲーション */}
      <nav className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="text-sm text-stone-600 hover:text-stone-900 transition-colors inline-flex items-center gap-2"
          >
            <i className="ri-arrow-left-line"></i>
            {language === "ja" ? "ホームに戻る" : "Back to Home"}
          </Link>
        </div>
      </nav>

      {/* サイドメニュー（デスクトップ）とコンテンツ */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドメニュー */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-stone-200 p-4 sticky top-6">
              <h3 className="text-sm font-medium text-stone-800 mb-3">
                {language === "ja" ? "法務情報" : "Legal Information"}
              </h3>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <main className="flex-1 bg-white rounded-lg border border-stone-200 p-8 lg:p-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
