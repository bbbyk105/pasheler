"use client";

import { useState } from "react";
import { useCart } from "../../components/CartContext";
import { translations } from "../../lib/translations";
import { formatPrice } from "../../lib/currency";
import { DeliveryMethod } from "../../lib/types";
import { COUNTRIES, calculateShippingFee } from "../../lib/shipping";
import PickupConfirmModal from "../../components/PickupConfirmModal";

interface CheckoutFormProps {
  deliveryMethod: "delivery" | "pickup";
  selectedCountry: string;
  onDeliveryMethodChange: (method: "delivery" | "pickup") => void;
  onCountryChange: (countryCode: string) => void;
}

export default function CheckoutForm({
  deliveryMethod,
  selectedCountry,
  onDeliveryMethodChange,
  onCountryChange,
}: CheckoutFormProps) {
  const { items, getTotalPrice, language, currency } = useCart();
  const t = translations[language];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);

  const subtotal = getTotalPrice();

  // ✅ 宅配便の配送料を常に計算（表示用）
  const deliveryShippingFee = calculateShippingFee({
    countryCode: selectedCountry,
    subtotal,
    currency,
    deliveryMethod: "delivery", // 常に宅配便として計算
  });

  // ✅ 実際の配送料（選択された配送方法に基づく）
  const actualShippingFee =
    deliveryMethod === "pickup" ? 0 : deliveryShippingFee;

  const tax = subtotal * 0.1;
  const total = subtotal + actualShippingFee + tax;

  const deliveryMethods: DeliveryMethod[] = [
    {
      id: "delivery",
      name: language === "ja" ? "宅配便" : "Home Delivery",
      fee: deliveryShippingFee, // ✅ 常に宅配便の配送料を表示
      description: language === "ja" ? "配送料：" : "Delivery Fee: ",
    },
    {
      id: "pickup",
      name: language === "ja" ? "対面受け取り" : "Pickup in Person",
      fee: 0,
      description:
        language === "ja" ? "対面受け取り：無料" : "Pickup in Person: Free",
    },
  ];

  const handleDeliveryMethodChange = (method: "delivery" | "pickup") => {
    if (method === "pickup") {
      setShowPickupModal(true);
    } else {
      onDeliveryMethodChange(method);
    }
  };

  const handlePickupConfirm = () => {
    onDeliveryMethodChange("pickup");
    setShowPickupModal(false);
  };

  const handlePickupCancel = () => {
    setShowPickupModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          currency,
          shippingFee: actualShippingFee, // ✅ 実際の配送料を送信
          tax,
          deliveryMethod,
          selectedCountry,
          language,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Checkout URL not found");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(
        language === "ja"
          ? "チェックアウト中にエラーが発生しました。もう一度お試しください。"
          : "An error occurred during checkout. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Delivery Method */}
        <div className="bg-stone-50 p-6 rounded-lg">
          <h2 className="text-xl font-serif text-stone-800 mb-6">
            {t.checkout.deliveryMethod}
          </h2>
          <div className="space-y-3">
            {deliveryMethods.map((method) => (
              <label
                key={method.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={method.id}
                  checked={deliveryMethod === method.id}
                  onChange={(e) =>
                    handleDeliveryMethodChange(
                      e.target.value as "delivery" | "pickup"
                    )
                  }
                  className="w-4 h-4 text-stone-800 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-800">
                      {method.name}
                    </span>
                    <span className="text-stone-600">
                      {method.fee === 0
                        ? t.common.free
                        : formatPrice(method.fee, currency)}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* Country Selection - Only show for delivery */}
          {deliveryMethod === "delivery" && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                {t.checkout.selectCountry}
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm cursor-pointer"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name[language]}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-stone-500">
                {t.checkout.shippingFee}:{" "}
                {formatPrice(deliveryShippingFee, currency)}
                {deliveryShippingFee > 0 && (
                  <span className="ml-2">
                    (
                    {selectedCountry === "JP"
                      ? t.checkout.freeShippingDomestic
                      : t.checkout.freeShippingInternational}
                    )
                  </span>
                )}
              </p>
              <p className="mt-2 text-xs text-stone-400">
                {language === "ja"
                  ? "※メールアドレス・電話番号・配送先住所は次のページで入力します"
                  : "* Email, phone number and shipping address will be entered on the next page"}
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
        >
          {isSubmitting
            ? language === "ja"
              ? "処理中..."
              : "Processing..."
            : `${t.checkout.completeOrder} (${formatPrice(total, currency)})`}
        </button>
      </form>

      {/* Pickup Confirmation Modal */}
      <PickupConfirmModal
        isOpen={showPickupModal}
        onClose={handlePickupCancel}
        onConfirm={handlePickupConfirm}
        language={language}
      />
    </>
  );
}
