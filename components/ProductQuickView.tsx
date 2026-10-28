"use client";

import {
  useState,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
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
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = translations[language];
  // モーダルが画面に出ているか（開いた直後は、選んだ種類が決まるまで何も出さない）
  const isShown =
    isOpen && !!product?.variants.some((v) => v.id === selectedVariant);

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

  // Esc で閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 開いたらフォーカスをモーダルの中（閉じるボタン）へ移し、閉じたら開いたボタンへ戻す
  useEffect(() => {
    if (!isShown) return;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonRef.current?.focus();
    return () => opener?.focus();
  }, [isShown]);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      const firstAvailableVariant =
        product.variants.find((v) => v.stock > 0) || product.variants[0];
      // 商品が切り替わったら選択状態を初期化する
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Tab をモーダルの中で回す（最後から進むと最初へ、最初から戻ると最後へ）。後ろのページへフォーカスを出さない
  const handleDialogKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

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
    // 背景（モーダルの外側）を押すと閉じる
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()} // モーダル内クリックで閉じないように
        onKeyDown={handleDialogKeyDown}
      >
        {/* 閉じるボタンはスクロールする中身の外に置き、いつも右上に見えるようにする */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={language === "ja" ? "閉じる" : "Close"}
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-xl" aria-hidden></i>
        </button>

        <div className="overflow-y-auto overscroll-contain">
          {/* grid-cols-1 は minmax(0, 1fr)。ただの grid だと、横に並ぶ小さい写真の幅で列が広がって画面からはみ出す */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-5 sm:p-8">
            {/* Product images */}
            <div className="min-w-0 space-y-3 md:sticky md:top-0 md:self-start">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-50">
                <Image
                  src={galleryImages[selectedImageIndex] ?? galleryImages[0]}
                  alt={`${product.name[language]} — ${selectedImageIndex + 1}/${galleryImages.length}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  loading="eager"
                  priority
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
              {/* 右上の閉じるボタンに文字がかからないよう、右を空ける */}
              <div className="pr-10">
                <h2
                  id={titleId}
                  className="text-2xl font-serif text-stone-800 mb-2"
                >
                  {product.name[language]}
                </h2>
                <p className="text-lg font-medium text-stone-800">
                  {formatPrice(priceInCurrentCurrency, currency)}
                </p>
              </div>

              {/* Description（lib/products.ts の \n を改行として出す） */}
              <div>
                <h3 className="font-medium text-stone-800 mb-2">
                  {t.product.description}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
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
                      onClick={() =>
                        setQuantity(Math.min(maxQuantity, quantity + 1))
                      }
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
                <h3 className="font-medium text-stone-800 mb-2">
                  {t.product.ingredients}
                </h3>
                {/* 成分ごとに inline-block にして、「ゆず／精油」のように成分名の途中で折らない */}
                <p className="text-stone-600 text-sm leading-relaxed">
                  {product.ingredients[language].map((ingredient, index) => (
                    <span key={ingredient} className="inline-block">
                      {ingredient}
                      {index < product.ingredients[language].length - 1 &&
                        (language === "ja" ? "、" : ", ")}
                    </span>
                  ))}
                </p>
              </div>

              {/* How to Use */}
              <div>
                <h3 className="font-medium text-stone-800 mb-2">
                  {t.product.howToUse}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                  {product.howToUse[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
