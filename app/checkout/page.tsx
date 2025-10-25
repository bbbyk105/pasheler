"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import { translations } from "../../lib/translations";

export default function CheckoutPage() {
  const { items, language } = useCart();
  const router = useRouter();
  const t = translations[language];

  // State management
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [selectedCountry, setSelectedCountry] = useState("JP"); // デフォルトは日本

  const handleOrderComplete = (orderData: any) => {
    localStorage.setItem("orderData", JSON.stringify(orderData));
    router.push("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-serif text-stone-800 mb-4">
              {t.cart.empty}
            </h1>
            <p className="text-stone-600 mb-8">{t.cart.emptyMessage}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.common.continueShopping}
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif text-stone-800 mb-8 text-center">
            {t.checkout.title}
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              <CheckoutForm
                onOrderComplete={handleOrderComplete}
                deliveryMethod={deliveryMethod}
                selectedCountry={selectedCountry}
                onDeliveryMethodChange={setDeliveryMethod}
                onCountryChange={setSelectedCountry}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                deliveryMethod={deliveryMethod}
                selectedCountry={selectedCountry}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
