"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";
import CartNotification from "./CartNotification";
import ProductQuickView from "./ProductQuickView";

const bestsellers = [
  {
    id: 1,
    name: "檜エッセンシャルオイル",
    price: "¥4,800",
    category: "フレグランスオイル",
    image: "products/fragrance.webp",
  },
  {
    id: 2,
    name: "檜リードディフューザー",
    price: "¥6,200",
    category: "ホームフレグランス",
    image: "products/fragrance2.webp",
  },
  {
    id: 3,
    name: "檜ハンドクリーム",
    price: "¥2,980",
    category: "ボディケア",
    image: "products/fragrance3.webp",
  },
];

export default function BestsellersSection() {
  const { addToCart } = useCart();
  const [cartNotification, setCartNotification] = useState({
    show: false,
    productName: "",
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, quantity: 1 });
    setCartNotification({ show: true, productName: product.name });
  };

  const handleQuickView = (product: any) => {
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
              人気の檜製品
            </h2>
            <p className="text-sm text-stone-600">
              自然の恵みを込めた、厳選された檜コレクション
            </p>
          </div>
          <Link
            href="/hinoki-collection"
            className="text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors border-b border-stone-400 hover:border-stone-800 whitespace-nowrap cursor-pointer"
          >
            すべて見る
          </Link>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          data-product-shop
        >
          {bestsellers.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50 rounded-lg">
                <Image
                  src={product.image}
                  alt={`${product.name} - ${product.category}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                {/* Quick Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleQuickView(product)}
                    className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors cursor-pointer"
                    aria-label={`${product.name}のクイックビュー`}
                  >
                    <i className="ri-eye-line text-sm text-stone-700"></i>
                  </button>
                </div>

                {/* カテゴリバッジ */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-1 text-xs font-medium bg-stone-100 text-stone-700 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-stone-600 font-medium">
                  {product.price}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-3 py-2 text-sm font-medium text-stone-700 border border-stone-300 hover:bg-stone-800 hover:text-white transition-colors whitespace-nowrap cursor-pointer rounded-md"
                  aria-label={`${product.name}をカートに追加`}
                >
                  カートに追加
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 特徴セクション */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-serif text-stone-800 mb-4">檜の恵み</h3>
            <p className="text-stone-600 leading-relaxed">
              日本古来から愛され続ける檜の香りは、心を落ち着かせ、リラックス効果をもたらします。
              抗菌・防虫効果もあり、自然の恵みを日常生活に取り入れることができます。
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
