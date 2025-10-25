"use client";

import { useCart } from "../../../components/CartContext";
import { translations } from "../../../lib/translations";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function CheckoutCancelPage() {
  const { language } = useCart();
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-serif text-stone-800 mb-4">
            {language === "ja"
              ? "チェックアウトがキャンセルされました"
              : "Checkout Cancelled"}
          </h1>

          {/* Message */}
          <p className="text-stone-600 mb-8">
            {language === "ja"
              ? "ご注文はキャンセルされました。カート内の商品はそのまま残っていますので、準備ができましたら再度お試しください。"
              : "Your order has been cancelled. Your cart items are still saved, so you can try again when you're ready."}
          </p>

          {/* Info Box */}
          <div className="bg-stone-50 p-6 rounded-lg mb-8 text-left">
            <h3 className="font-medium text-stone-800 mb-3">
              {language === "ja" ? "お困りですか？" : "Need Help?"}
            </h3>
            <p className="text-sm text-stone-600">
              {language === "ja"
                ? "ご不明な点がございましたら、お問い合わせページからお気軽にご連絡ください。"
                : "If you have any questions, please feel free to contact us through our contact page."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors rounded-lg"
            >
              {language === "ja"
                ? "チェックアウトに戻る"
                : "Return to Checkout"}
            </Link>
            <Link
              href="/catalog"
              className="px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors rounded-lg"
            >
              {language === "ja" ? "買い物を続ける" : "Continue Shopping"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
