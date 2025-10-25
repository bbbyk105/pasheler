"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../../components/CartContext";
import { translations } from "../../../lib/translations";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { language, currency, clearCart } = useCart();
  const t = translations[language];
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    setSessionId(session_id);

    // カートをクリア（初回のみ実行）
    clearCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空の依存配列で初回のみ実行

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-serif text-stone-800 mb-4">
            {language === "ja"
              ? "ご注文ありがとうございます！"
              : "Thank you for your order!"}
          </h1>

          {/* Message */}
          <p className="text-stone-600 mb-8">
            {language === "ja"
              ? "ご注文が正常に処理されました。確認メールをお送りしましたので、ご確認ください。"
              : "Your order has been successfully processed. We have sent you a confirmation email."}
          </p>

          {/* Order Number */}
          {sessionId && (
            <div className="bg-stone-50 p-6 rounded-lg mb-8">
              <p className="text-sm text-stone-600 mb-2">
                {language === "ja" ? "注文ID" : "Order ID"}
              </p>
              <p className="text-lg font-mono text-stone-800">
                {sessionId.slice(-12).toUpperCase()}
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left">
            <h3 className="font-medium text-stone-800 mb-3">
              {language === "ja" ? "次のステップ" : "Next Steps"}
            </h3>
            <ul className="space-y-2 text-sm text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  {language === "ja"
                    ? "確認メールが届きますので、ご確認ください。"
                    : "Please check your email for order confirmation."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  {language === "ja"
                    ? "ご注文内容に応じて、商品を準備いたします。"
                    : "We will prepare your items according to your order."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  {language === "ja"
                    ? "発送時に追跡番号をお知らせします。"
                    : "You will receive a tracking number when your order ships."}
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors rounded-lg"
            >
              {language === "ja" ? "ホームに戻る" : "Back to Home"}
            </Link>
            <Link
              href="/catalog"
              className="px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors rounded-lg"
            >
              {language === "ja" ? "商品を見る" : "Continue Shopping"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-stone-600">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
