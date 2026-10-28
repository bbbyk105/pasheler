"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import {
  cheapestVariant,
  productPrimaryImage,
  type Product,
} from "../lib/products";
import { translations } from "../lib/translations";
import { formatPrice } from "../lib/currency";

type Props = {
  product: Product;
  onAddToCart: (product: Product, variantId: string) => void;
  onQuickView: (product: Product) => void;
};

/** 商品一枚分のカード（トップの人気商品・富士ヒノキのページ・ブログ記事の下で共通） */
export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
}: Props) {
  const { language, currency } = useCart();
  const t = translations[language];

  const lowestPriceVariant = cheapestVariant(product, currency);
  const isOutOfStock = product.variants.every((v) => v.stock === 0);
  const hasLowStock = product.variants.some(
    (v) => v.stock > 0 && v.stock <= 5
  );
  const priceInCurrentCurrency = lowestPriceVariant?.prices[currency] ?? 0;

  return (
    <div className="group">
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-stone-50 ring-1 ring-stone-900/[0.06] shadow-sm transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_20px_50px_-12px_rgba(28,25,23,0.16)]">
        <Image
          src={productPrimaryImage(product)}
          alt={product.name[language]}
          fill
          className="object-cover object-center will-change-transform transition-[transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/20 via-stone-900/[0.02] to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          aria-hidden
        />

        {(isOutOfStock || hasLowStock) && (
          <div className="absolute top-4 left-4">
            {isOutOfStock ? (
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                {t.common.outOfStock}
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                {language === "ja" ? "残りわずか" : "Low Stock"}
              </span>
            )}
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <button
            onClick={() => onQuickView(product)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/95 shadow-md ring-1 ring-stone-900/5 backdrop-blur-sm transition-[background-color,box-shadow] duration-300 hover:bg-white cursor-pointer"
            aria-label={`${product.name[language]}のクイックビュー`}
          >
            <i className="ri-eye-line text-sm text-stone-700"></i>
          </button>
        </div>

        {/* カテゴリバッジ */}
        <div className="absolute bottom-4 left-4 opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <span className="px-2 py-1 text-xs font-medium bg-stone-100 text-stone-700 rounded-full">
            {t.categories[product.category as keyof typeof t.categories] ||
              product.category}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-stone-800 transition-colors duration-300 ease-out group-hover:text-stone-600">
          {product.name[language]}
        </h3>
        <p className="text-sm text-stone-600 font-medium">
          {formatPrice(priceInCurrentCurrency, currency)}
        </p>

        <button
          onClick={() => onAddToCart(product, lowestPriceVariant?.id ?? "")}
          disabled={isOutOfStock}
          className="w-full mt-3 py-2 text-sm font-medium text-stone-700 border border-stone-300 hover:bg-stone-800 hover:text-white transition-colors whitespace-nowrap cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`${product.name[language]}をカートに追加`}
        >
          {isOutOfStock ? t.common.waitingForStock : t.common.addToCart}
        </button>
      </div>
    </div>
  );
}
