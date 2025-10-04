"use client";

import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { formatPrice } from "../lib/currency";
import { translations } from "../lib/translations";
import { Product } from "../lib/products";
import Image from "next/image";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variantId: string) => void;
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewProps) {
  const { language, currency } = useCart();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const t = translations[language];

  useEffect(() => {
    if (product && product.variants.length > 0) {
      const firstAvailableVariant =
        product.variants.find((v) => v.stock > 0) || product.variants[0];
      setSelectedVariant(firstAvailableVariant.id);
      setQuantity(1);
    }
  }, [product]);

  if (!product || !isOpen) return null;

  const currentVariant = product.variants.find((v) => v.id === selectedVariant);
  if (!currentVariant) return null;

  const priceInCurrentCurrency = currentVariant.prices[currency];
  const isOutOfStock = currentVariant.stock === 0;
  const maxQuantity = Math.min(currentVariant.stock, 10);

  const handleAddToCart = () => {
    if (!isOutOfStock && quantity > 0) {
      onAddToCart(product, selectedVariant);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-stone-50 rounded-lg overflow-hidden relative">
              <Image
                src={product.image}
                alt={`${product.name[language]}の商品画像`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                loading="eager"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif text-stone-800 mb-2">
                    {product.name[language]}
                  </h2>
                  <p className="text-lg font-medium text-stone-800">
                    {formatPrice(priceInCurrentCurrency, currency)}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium text-stone-800 mb-2">
                  {t.product.description}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {product.description[language]}
                </p>
              </div>

              {/* Size Selection */}
              {product.variants.length > 1 && (
                <div>
                  <h3 className="font-medium text-stone-800 mb-3">
                    {t.product.selectSize}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const variantPrice = variant.prices[currency];
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          disabled={variant.stock === 0}
                          className={`px-4 py-2 text-sm border rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                            selectedVariant === variant.id
                              ? "border-stone-800 bg-stone-800 text-white"
                              : "border-stone-300 text-stone-700 hover:border-stone-800"
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-medium">{variant.size}</div>
                            <div className="text-xs">
                              {formatPrice(variantPrice, currency)}
                            </div>
                            {variant.stock === 0 && (
                              <div className="text-xs text-red-500 mt-1">
                                {t.common.outOfStock}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stock Info */}
              <div className="flex items-center gap-2">
                {isOutOfStock ? (
                  <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                    {t.common.outOfStock}
                  </span>
                ) : currentVariant.stock <= 5 ? (
                  <span className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                    {language === "ja"
                      ? `残り${currentVariant.stock}個`
                      : `${currentVariant.stock} left`}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                    {t.common.inStock}
                  </span>
                )}
              </div>

              {/* Quantity Selection */}
              {!isOutOfStock && (
                <div>
                  <h3 className="font-medium text-stone-800 mb-3">
                    {t.common.quantity}
                  </h3>
                  <div className="flex items-center border border-stone-300 rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(maxQuantity, quantity + 1))
                      }
                      disabled={quantity >= maxQuantity}
                      className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                {isOutOfStock ? t.common.waitingForStock : t.common.addToCart}
              </button>

              {/* Ingredients */}
              <div>
                <h3 className="font-medium text-stone-800 mb-2">
                  {t.product.ingredients}
                </h3>
                <p className="text-stone-600 text-sm">
                  {product.ingredients[language].join(", ")}
                </p>
              </div>

              {/* How to Use */}
              <div>
                <h3 className="font-medium text-stone-800 mb-2">
                  {t.product.howToUse}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {product.howToUse[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
