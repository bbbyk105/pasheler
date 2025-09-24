"use client";

import { useCart } from "../../components/CartContext";
import { formatPrice, convertPrice, getShippingFee } from "../../lib/currency";
import { translations } from "../../lib/translations";
import Image from "next/image";

interface OrderSummaryProps {
  deliveryMethod: "delivery" | "pickup";
}

export default function OrderSummary({ deliveryMethod }: OrderSummaryProps) {
  const { items, getTotalPrice, language, currency } = useCart();
  const t = translations[language];

  const subtotal = getTotalPrice();
  const shippingFee =
    deliveryMethod === "delivery" ? getShippingFee(currency) : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  return (
    <div className="bg-stone-50 p-6 rounded-lg">
      <h2 className="text-xl font-serif text-stone-800 mb-6">
        {t.checkout.orderSummary}
      </h2>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const priceInCurrentCurrency = convertPrice(
            item.price,
            "JPY",
            currency
          );
          const totalItemPrice = priceInCurrentCurrency * item.quantity;

          return (
            <div key={`${item.id}-${item.variantId}`} className="flex gap-4">
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
                  {formatPrice(totalItemPrice, currency)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">{t.common.subtotal}</span>
          <span className="text-stone-800">
            {formatPrice(subtotal, currency)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">{t.common.shipping}</span>
          <span className="text-stone-800">
            {shippingFee === 0
              ? t.common.free
              : formatPrice(shippingFee, currency)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">{t.common.tax}</span>
          <span className="text-stone-800">{formatPrice(tax, currency)}</span>
        </div>
        <div className="flex justify-between font-medium pt-3 border-t border-stone-200">
          <span className="text-stone-800">{t.common.total}</span>
          <span className="text-stone-800">{formatPrice(total, currency)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-shield-check-line text-green-600"></i>
          </div>
          <span className="text-sm text-green-700">
            {t.checkout.secureCheckout}
          </span>
        </div>
      </div>
    </div>
  );
}
