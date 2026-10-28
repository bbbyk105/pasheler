"use client";
import { useState } from "react";
import { useCart } from "./CartContext";
import CartNotification from "./CartNotification";
import ProductQuickView from "./ProductQuickView";
import ProductCard from "./ProductCard";
import { useAddToCart } from "./useAddToCart";
import { products, type Product } from "../lib/products";

export default function BestsellersSection() {
  const { language } = useCart();
  const { handleAddToCart, notification, closeNotification } = useAddToCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [showQuickView, setShowQuickView] = useState(false);

  // lib/productsから最初の3つの商品を取得（または特定の条件で選択）
  const bestsellers = products.slice(0, 3);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
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
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
            />
          ))}
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
        show={notification.show}
        productName={notification.productName}
        onClose={closeNotification}
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
