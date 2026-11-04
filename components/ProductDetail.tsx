"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { formatPrice } from "../lib/currency";
import { translations } from "../lib/translations";
import { productDisplayName, type Product } from "../lib/products";

type Props = {
  product: Product;
  /**
   * modal: クイックビューの中（見出しは h2・h3。右上の閉じるボタンの分を空ける）
   * page: 商品ページ（見出しは h1・h2。ヘッダーの下で写真を止める）
   */
  layout: "modal" | "page";
  titleId?: string;
  onAddToCart: (product: Product, variantId: string, quantity: number) => void;
  /** カートに入れたあと（クイックビューは閉じる） */
  onAdded?: () => void;
};

/** 商品の写真・名前・価格・数量・カートに入れる・説明・成分・使い方。クイックビューと商品ページで共通 */
export default function ProductDetail({
  product,
  layout,
  titleId,
  onAddToCart,
  onAdded,
}: Props) {
  const { language, currency } = useCart();
  const t = translations[language];
  const [selectedVariant, setSelectedVariant] = useState(
    () =>
      (product.variants.find((v) => v.stock > 0) ?? product.variants[0])?.id ??
      ""
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentVariant = product.variants.find((v) => v.id === selectedVariant);
  if (!currentVariant) return null;

  const isPage = layout === "page";
  const Title = isPage ? "h1" : "h2";
  const Section = isPage ? "h2" : "h3";

  const priceInCurrentCurrency = currentVariant.prices[currency];
  const isOutOfStock = currentVariant.stock === 0;
  const maxQuantity = currentVariant.stock; // ✅ 在庫数まで選択可能に
  const name = productDisplayName(product, language);

  const galleryImages = product.images;

  const handleAddToCart = () => {
    if (!isOutOfStock && quantity > 0) {
      // ✅ quantityを複数回ループしてaddToCartを呼び出す
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product, selectedVariant, 1);
      }
      onAdded?.();
    }
  };

  return (
    // grid-cols-1 は minmax(0, 1fr)。ただの grid だと、横に並ぶ小さい写真の幅で列が広がって画面からはみ出す
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 ${
        isPage ? "" : "p-5 sm:p-8"
      }`}
    >
      {/* Product images */}
      <div
        className={`min-w-0 space-y-3 md:sticky md:self-start ${
          isPage ? "md:top-28" : "md:top-0"
        }`}
      >
        <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-50">
          <Image
            src={galleryImages[selectedImageIndex] ?? galleryImages[0]}
            alt={`${name} — ${selectedImageIndex + 1}/${galleryImages.length}`}
            fill
            // 商品ページの写真の列は最大でおよそ 560px（max-w-6xl の半分）
            sizes={
              isPage
                ? "(max-width: 768px) 100vw, 576px"
                : "(max-width: 768px) 100vw, 50vw"
            }
            className="object-cover object-center"
            loading="eager"
            // 商品ページではいちばん大きい画像（LCP）。Next.js 16 で priority は非推奨
            fetchPriority={isPage ? "high" : undefined}
          />
        </div>
        {galleryImages.length > 1 && (
          <div
            className="flex gap-2 overflow-x-auto p-1"
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
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-stone-100 ring-2 transition-shadow focus:outline-none focus-visible:ring-stone-800 ${
                  selectedImageIndex === index
                    ? "ring-stone-800"
                    : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="min-w-0 space-y-6">
        {/* クイックビューでは、右上の閉じるボタンに文字がかからないよう、右を空ける */}
        <div className={isPage ? "" : "pr-10"}>
          {/* 商品ページでは、名前の改行（lib/products.ts の \n）と空白でだけ折る。「ペー／パー」のように言葉の途中で折らない */}
          <Title
            id={titleId}
            className={`font-serif text-stone-800 ${
              isPage
                ? "text-2xl md:text-3xl mb-3 whitespace-pre-line break-keep"
                : "text-2xl mb-2"
            }`}
          >
            {isPage ? product.name[language] : name}
          </Title>
          <p className="text-lg font-medium text-stone-800">
            {formatPrice(priceInCurrentCurrency, currency)}
          </p>
        </div>

        {/* Description（lib/products.ts の \n を改行として出す） */}
        <div>
          <Section className="font-medium text-stone-800 mb-2">
            {t.product.description}
          </Section>
          <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
            {product.description[language]}
          </p>
        </div>

        {/* Size Selection */}
        {product.variants.length > 1 && (
          <div>
            <Section className="font-medium text-stone-800 mb-3">
              {t.product.selectSize}
            </Section>
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
            <Section className="font-medium text-stone-800 mb-3">
              {t.common.quantity}
            </Section>
            <div className="flex items-center border border-stone-300 rounded-lg w-fit">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label={language === "ja" ? "数量を減らす" : "Decrease quantity"}
                className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <i className="ri-subtract-line" aria-hidden></i>
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
                aria-label={t.common.quantity}
                className="w-16 text-center font-medium border-0 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                disabled={quantity >= maxQuantity}
                aria-label={language === "ja" ? "数量を増やす" : "Increase quantity"}
                className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-add-line" aria-hidden></i>
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
          <Section className="font-medium text-stone-800 mb-2">
            {t.product.ingredients}
          </Section>
          {/* 成分ごとに inline-block にして、「ゆず／精油」のように成分名の途中で折らない */}
          <p className="text-stone-600 text-sm leading-relaxed">
            {product.ingredients[language].map((ingredient, index) => (
              <span key={ingredient} className="inline-block">
                {ingredient}
                {index < product.ingredients[language].length - 1 &&
                  (language === "ja" ? "、" : ", ")}
              </span>
            ))}
          </p>
        </div>

        {/* How to Use */}
        <div>
          <Section className="font-medium text-stone-800 mb-2">
            {t.product.howToUse}
          </Section>
          <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
            {product.howToUse[language]}
          </p>
        </div>
      </div>
    </div>
  );
}
