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
  onAddToCart: (product: Product, variantId: string, quantity: number) => void;
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const t = translations[language];

  // モーダル表示時にスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      const firstAvailableVariant =
        product.variants.find((v) => v.stock > 0) || product.variants[0];
      setSelectedVariant(firstAvailableVariant.id);
      setQuantity(1);
      setSelectedImageIndex(0);
    }
  }, [product]);

  if (!product || !isOpen) return null;

  const currentVariant = product.variants.find((v) => v.id === selectedVariant);
  if (!currentVariant) return null;

  const priceInCurrentCurrency = currentVariant.prices[currency];
  const isOutOfStock = currentVariant.stock === 0;
  const maxQuantity = currentVariant.stock; // ✅ 在庫数まで選択可能に

  const galleryImages = product.images;

  const handleAddToCart = () => {
    if (!isOutOfStock && quantity > 0) {
      // ✅ quantityを複数回ループしてaddToCartを呼び出す
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product, selectedVariant, 1);
      }
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto">
        <div
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // モーダル内クリックで閉じないように
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product images */}
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-50 ring-1 ring-stone-900/[0.06]">
                <Image
                  src={galleryImages[selectedImageIndex] ?? galleryImages[0]}
                  alt={`${product.name[language]} — ${selectedImageIndex + 1}/${galleryImages.length}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center"
                  loading="eager"
                  priority
                />
              </div>
              {galleryImages.length > 1 && (
                <div
                  className="flex gap-2 overflow-x-auto pb-1"
                  role="tablist"
                  aria-label={
                    language === "ja" ? "商品画像の切り替え" : "Product photos"
                  }
                >
                  {galleryImages.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={selectedImageIndex === index}
                      aria-label={
                        language === "ja"
                          ? `画像 ${index + 1} を表示`
                          : `Show photo ${index + 1}`
                      }
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-stone-100 ring-2 transition-shadow focus:outline-none focus-visible:ring-stone-800 flex items-center justify-center ${
                        selectedImageIndex === index
                          ? "ring-stone-800 shadow-md"
                          : "ring-transparent opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={src}
                        alt=""
                        width={64}
                        height={64}
                        className="h-full w-full object-contain object-center p-0.5"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                          onClick={() => {
                            setSelectedVariant(variant.id);
                            setQuantity(1); // バリアント変更時に数量をリセット
                          }}
                          disabled={variant.stock === 0}
                          className={`px-4 py-2 text-sm border rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                            selectedVariant === variant.id
                              ? "border-stone-800 bg-stone-800 text-white"
                              : "border-stone-300 text-stone-700 hover:border-stone-800"
                          }`}
                        >
                          <div className="text-center">
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

              {/* Stock Info（売り切れ・残りわずかのみ表示） */}
              {(isOutOfStock || currentVariant.stock <= 5) && (
                <div className="flex items-center gap-2">
                  {isOutOfStock ? (
                    <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                      {t.common.outOfStock}
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                      {language === "ja"
                        ? `残り${currentVariant.stock}個`
                        : `${currentVariant.stock} left`}
                    </span>
                  )}
                </div>
              )}

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
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setQuantity(Math.max(1, Math.min(maxQuantity, value)));
                      }}
                      min="1"
                      max={maxQuantity}
                      className="w-16 text-center font-medium border-0 focus:outline-none"
                    />
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
                  <p className="text-xs text-stone-500 mt-1">
                    {language === "ja"
                      ? `最大${maxQuantity}個まで購入可能`
                      : `Max ${maxQuantity} items available`}
                  </p>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-300 rounded-lg"
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
