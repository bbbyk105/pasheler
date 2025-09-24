"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { formatPrice } from "../../lib/currency";
import { translations } from "../../lib/translations";
import Image from "next/image";

// 注文データの型定義
interface OrderItem {
  id: string;
  variantId: string;
  name: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderData {
  orderNumber: string;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  deliveryMethod: "delivery" | "pickup";
  language: "ja" | "en";
  currency: "JPY" | "AUD";
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) {
      try {
        const parsedData: OrderData = JSON.parse(data);
        setOrderData(parsedData);
        localStorage.removeItem("orderData");
      } catch (error) {
        console.error("Error parsing order data:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-stone-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const t = translations[orderData.language];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-2xl text-green-600"></i>
            </div>
            <h1 className="text-3xl font-serif text-stone-800 mb-4">
              {t.orderConfirmation.thankYou}
            </h1>
            <p className="text-lg text-stone-600 mb-2">
              {t.orderConfirmation.orderNumber}:{" "}
              <span className="font-medium">{orderData.orderNumber}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div className="bg-stone-50 p-8 rounded-lg">
              <h2 className="text-xl font-serif text-stone-800 mb-6">
                {t.orderConfirmation.orderSummary}
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {orderData.items.map((item) => (
                  <div
                    key={`${item.id}-${item.variantId}`}
                    className="flex gap-4 pb-4 border-b border-stone-200 last:border-b-0"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={`${item.name}の商品画像`}
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-800 text-sm">
                        {item.name}
                      </h3>
                      <p className="text-stone-600 text-xs">{item.size}</p>
                      <p className="text-stone-600 text-sm">
                        {t.common.quantity}: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-stone-800 text-sm">
                        {formatPrice(
                          item.price * item.quantity,
                          orderData.currency
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">{t.common.subtotal}</span>
                  <span className="text-stone-800">
                    {formatPrice(orderData.subtotal, orderData.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">{t.common.shipping}</span>
                  <span className="text-stone-800">
                    {orderData.shipping === 0
                      ? t.common.free
                      : formatPrice(orderData.shipping, orderData.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">{t.common.tax}</span>
                  <span className="text-stone-800">
                    {formatPrice(orderData.tax, orderData.currency)}
                  </span>
                </div>
                <div className="flex justify-between font-medium pt-3 border-t border-stone-200 text-lg">
                  <span className="text-stone-800">{t.common.total}</span>
                  <span className="text-stone-800">
                    {formatPrice(orderData.total, orderData.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-8">
              <div className="bg-stone-50 p-8 rounded-lg">
                <h2 className="text-xl font-serif text-stone-800 mb-6">
                  {orderData.deliveryMethod === "delivery"
                    ? t.orderConfirmation.deliveryInfo
                    : t.orderConfirmation.pickupInfo}
                </h2>

                {orderData.deliveryMethod === "delivery" ? (
                  <div className="space-y-3 text-sm">
                    <p className="font-medium text-stone-800">
                      {orderData.customerInfo.firstName}{" "}
                      {orderData.customerInfo.lastName}
                    </p>
                    <p className="text-stone-600">
                      {orderData.customerInfo.address}
                    </p>
                    <p className="text-stone-600">
                      {orderData.customerInfo.city},{" "}
                      {orderData.customerInfo.state}{" "}
                      {orderData.customerInfo.zipCode}
                    </p>
                    <p className="text-stone-600">
                      {orderData.customerInfo.country}
                    </p>
                    <p className="text-stone-600 mt-4">
                      {orderData.language === "ja"
                        ? "商品は3-5営業日以内に発送されます。"
                        : "Your order will be shipped within 3-5 business days."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
                    <div className="text-stone-600 whitespace-pre-line">
                      {t.checkout.pickupDetails}
                    </div>
                    <p className="text-stone-600 mt-4">
                      {orderData.language === "ja"
                        ? "ご注文の準備ができましたら、メールでお知らせいたします。"
                        : "We will email you when your order is ready for pickup."}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => router.push("/")}
                  className="w-full py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.common.continueShopping}
                </button>

                <button
                  onClick={() => router.push("/catalog")}
                  className="w-full py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.nav.products}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
