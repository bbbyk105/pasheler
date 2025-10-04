"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../components/CartContext";
import { formatPrice } from "../../lib/currency";
import { translations } from "../../lib/translations";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CartContent() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
    language,
    currency,
  } = useCart();
  const totalPrice = getTotalPrice();
  const t = translations[language];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-stone-100 rounded-full mx-auto mb-6">
              <i className="ri-shopping-bag-line text-2xl text-stone-600"></i>
            </div>
            <h1 className="text-3xl font-serif text-stone-800 mb-4">
              {t.cart.empty}
            </h1>
            <p className="text-stone-600 mb-8">{t.cart.emptyMessage}</p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.common.continueShopping}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif text-stone-800">
              {t.cart.title}
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-stone-600 hover:text-stone-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.cart.clearCart}
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => {
                  const totalItemPrice = item.price * item.quantity;

                  return (
                    <div
                      key={`${item.id}-${item.variantId}`}
                      className="flex gap-6 p-6 bg-stone-50 rounded-lg"
                    >
                      <div className="w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover object-top"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium text-stone-800">
                          {item.name}
                        </h3>
                        <p className="text-stone-600 text-sm">{item.size}</p>
                        <p className="text-stone-600">
                          {formatPrice(item.price, currency)}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-300 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variantId,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                            >
                              <i className="ri-subtract-line text-sm"></i>
                            </button>
                            <span className="w-12 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variantId,
                                  item.quantity + 1
                                )
                              }
                              disabled={item.quantity >= item.stock}
                              className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <i className="ri-add-line text-sm"></i>
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              removeFromCart(item.id, item.variantId)
                            }
                            className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        </div>

                        {item.stock <= 5 && (
                          <p className="text-xs text-orange-600">
                            {language === "ja"
                              ? `残り${item.stock}個`
                              : `${item.stock} left`}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-stone-800">
                          {formatPrice(totalItemPrice, currency)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-stone-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-serif text-stone-800 mb-6">
                  {t.checkout.orderSummary}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">{t.common.subtotal}</span>
                    <span className="text-stone-800">
                      {formatPrice(totalPrice, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">{t.common.shipping}</span>
                    <span className="text-stone-800">{t.common.free}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">{t.common.tax}</span>
                    <span className="text-stone-800">
                      {formatPrice(totalPrice * 0.1, currency)}
                    </span>
                  </div>
                  <div className="border-t border-stone-200 pt-4">
                    <div className="flex justify-between font-medium">
                      <span className="text-stone-800">{t.common.total}</span>
                      <span className="text-stone-800">
                        {formatPrice(totalPrice * 1.1, currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="block w-full py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer text-center"
                  >
                    {t.common.checkout}
                  </Link>

                  <Link
                    href="/catalog"
                    className="block w-full py-3 text-center border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {t.common.continueShopping}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
