"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import CartNotification from "./CartNotification";
import ProductQuickView from "./ProductQuickView";
import ProductCard from "./ProductCard";
import { useAddToCart } from "./useAddToCart";
import { findProduct, type Product } from "../lib/products";

/** 富士ヒノキの香りのアイテム（フレグランスペーパー 木型・四角形、アロマウォーター） */
export const HINOKI_FRAGRANCE_PRODUCT_IDS = [1, 2, 3];

type Props = {
  productIds?: number[];
  title: string;
  description?: string;
};

/** ブログ記事の下などに置く、そのまま買える商品の並び */
export default function ProductPicks({
  productIds = HINOKI_FRAGRANCE_PRODUCT_IDS,
  title,
  description,
}: Props) {
  const { language } = useCart();
  const { handleAddToCart, notification, closeNotification } = useAddToCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  const items = productIds
    .map(findProduct)
    .filter((product): product is Product => product !== undefined);

  return (
    <section className="py-16 px-6 bg-[#f7f4ef]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-stone-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 hover:text-stone-900 hover:border-stone-800 transition-colors"
          >
            {language === "ja" ? "商品一覧を見る" : "View all products"}
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
        </div>
      </div>

      <CartNotification
        show={notification.show}
        productName={notification.productName}
        onClose={closeNotification}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}
