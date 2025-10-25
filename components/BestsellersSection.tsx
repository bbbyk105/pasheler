"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";
import CartNotification from "./CartNotification";
import ProductQuickView from "./ProductQuickView";
import { products, type Product } from "../lib/products";
import { translations } from "../lib/translations";
import { formatPrice } from "../lib/currency";

export default function BestsellersSection() {
  const { addToCart, language, currency } = useCart();
  const [cartNotification, setCartNotification] = useState({
    show: false,
    productName: "",
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [showQuickView, setShowQuickView] = useState(false);

  const t = translations[language];

  // lib/productsから最初の3つの商品を取得（または特定の条件で選択）
  const bestsellers = products.slice(0, 3);

  const handleAddToCart = (
    product: Product,
    variantId: string,
    quantity: number = 1
  ) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant || variant.stock === 0) return;

    // quantityの回数分ループしてカートに追加
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        variantId: variant.id,
        name: product.name[language],
        price: variant.prices[currency],
        image: product.image,
        stock: variant.stock,
      });
    }

    setCartNotification({ show: true, productName: product.name[language] });
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const closeCartNotification = () => {
    setCartNotification({ show: false, productName: "" });
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-2">
              {language === "ja" ? "人気の檜製品" : "Popular Hinoki Products"}
            </h2>
            <p className="text-sm text-stone-600">
              {language === "ja"
                ? "自然の恵みを込めた、厳選された檜コレクション"
                : "Carefully selected hinoki collection infused with nature's blessings"}
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-product-shop
        >
          {bestsellers.map((product) => {
            // 最安値のバリアントを取得
            const lowestPriceVariant =
              product.variants.length > 0
                ? product.variants.reduce(
                    (min, variant) =>
                      variant.prices[currency] < min.prices[currency]
                        ? variant
                        : min,
                    product.variants[0]
                  )
                : product.variants[0];

            const isOutOfStock = product.variants.every((v) => v.stock === 0);
            const hasLowStock = product.variants.some(
              (v) => v.stock > 0 && v.stock <= 5
            );
            const priceInCurrentCurrency =
              lowestPriceVariant?.prices[currency] ?? 0;

            return (
              <div key={product.id} className="group">
                <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50 rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name[language]}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                  {/* Stock Status Badge */}
                  <div className="absolute top-4 left-4">
                    {isOutOfStock ? (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                        {t.common.outOfStock}
                      </span>
                    ) : hasLowStock ? (
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                        {language === "ja" ? "残りわずか" : "Low Stock"}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        {t.common.inStock}
                      </span>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors cursor-pointer"
                      aria-label={`${product.name[language]}のクイックビュー`}
                    >
                      <i className="ri-eye-line text-sm text-stone-700"></i>
                    </button>
                  </div>

                  {/* カテゴリバッジ */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2 py-1 text-xs font-medium bg-stone-100 text-stone-700 rounded-full">
                      {t.categories[
                        product.category as keyof typeof t.categories
                      ] || product.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                    {product.name[language]}
                  </h3>
                  <p className="text-sm text-stone-600 font-medium">
                    {formatPrice(priceInCurrentCurrency, currency)}
                  </p>

                  <button
                    onClick={() =>
                      handleAddToCart(product, lowestPriceVariant?.id ?? "")
                    }
                    disabled={isOutOfStock}
                    className="w-full mt-3 py-2 text-sm font-medium text-stone-700 border border-stone-300 hover:bg-stone-800 hover:text-white transition-colors whitespace-nowrap cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`${product.name[language]}をカートに追加`}
                  >
                    {isOutOfStock
                      ? t.common.waitingForStock
                      : t.common.addToCart}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 特徴セクション */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-serif text-stone-800 mb-4">
              {language === "ja" ? "檜の恵み" : "The Blessing of Hinoki"}
            </h3>
            <p className="text-stone-600 leading-relaxed">
              {language === "ja"
                ? "日本古来から愛され続ける檜の香りは、心を落ち着かせ、リラックス効果をもたらします。抗菌・防虫効果もあり、自然の恵みを日常生活に取り入れることができます。"
                : "The fragrance of hinoki, beloved in Japan since ancient times, calms the mind and brings relaxation. With its antibacterial and insect-repelling properties, you can incorporate nature's blessings into your daily life."}
            </p>
          </div>
        </div>
      </div>

      <CartNotification
        show={cartNotification.show}
        productName={cartNotification.productName}
        onClose={closeCartNotification}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={showQuickView}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}
