// app/catalog/CatalogClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../components/CartContext";
import CartNotification from "../../components/CartNotification";
import ProductQuickView from "../../components/ProductQuickView";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  products,
  productPrimaryImage,
  type Product,
} from "../../lib/products";
import { translations } from "../../lib/translations";
import { formatPrice } from "../../lib/currency";

export default function CatalogClient() {
  const { addToCart, language, currency } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [notification, setNotification] = useState({
    show: false,
    productName: "",
  });
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const t = translations[language];
  const categories = [
    "all",
    "fragrances",
    "fragrancePapers",
    "candles",
  ] as const;
  type Category = (typeof categories)[number];

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      const aPrice = a.variants[0]?.prices?.[currency] ?? 0;
      const bPrice = b.variants[0]?.prices?.[currency] ?? 0;
      return aPrice - bPrice;
    }
    return a.name[language].localeCompare(b.name[language]);
  });

  const handleAddToCart = (product: Product, variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant || variant.stock === 0) return;

    addToCart({
      id: product.id,
      variantId: variant.id,
      name: product.name[language],
      price: variant.prices[currency],
      prices: variant.prices,
      image: productPrimaryImage(product),
      stock: variant.stock,
    });
    setNotification({ show: true, productName: product.name[language] });
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const closeNotification = () =>
    setNotification({ show: false, productName: "" });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-stone-800 mb-4">
              {t.catalog.title}
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {t.catalog.description}
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            {/* Category Filter */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Category filter"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                  aria-pressed={selectedCategory === category}
                >
                  {t.categories[category]}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-600">{t.common.sort}:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "name" | "price")
                  }
                  className="appearance-none pr-8 pl-3 py-2 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 cursor-pointer"
                  aria-label="Sort products"
                >
                  <option value="name">
                    {language === "ja" ? "名前" : "Name"}
                  </option>

                  <option value="price">{t.common.price}</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                  <i className="ri-arrow-down-s-line text-stone-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            data-product-shop
          >
            {sortedProducts.map((product) => {
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
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-stone-50 ring-1 ring-stone-900/[0.06] shadow-sm transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_20px_50px_-12px_rgba(28,25,23,0.16)]">
                    <Image
                      src={productPrimaryImage(product)}
                      alt={`${product.name[language]}（フレグランスペーパー）`}
                      fill
                      className="object-cover object-top will-change-transform transition-[transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={false}
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
                        onClick={() => handleQuickView(product)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/95 shadow-md ring-1 ring-stone-900/5 backdrop-blur-sm transition-[background-color,box-shadow] duration-300 hover:bg-white cursor-pointer"
                        aria-label={`${product.name[language]}のクイックビュー`}
                      >
                        <i className="ri-eye-line text-sm text-stone-700" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-stone-800 transition-colors duration-300 ease-out group-hover:text-stone-600 whitespace-pre-line">
                      {product.name[language]}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {formatPrice(priceInCurrentCurrency, currency)}
                    </p>

                    <button
                      onClick={() =>
                        handleAddToCart(product, lowestPriceVariant?.id ?? "")
                      }
                      disabled={isOutOfStock}
                      className="w-full mt-3 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-stone-300"
                      style={{
                        color: isOutOfStock ? "#9ca3af" : "#57534e",
                        borderColor: isOutOfStock ? "#d1d5db" : "#d6d3d1",
                        backgroundColor: isOutOfStock
                          ? "#f9fafb"
                          : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isOutOfStock) {
                          e.currentTarget.style.backgroundColor = "#1c1917";
                          e.currentTarget.style.color = "white";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isOutOfStock) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#57534e";
                        }
                      }}
                      aria-label={`${product.name[language]}をカートに追加`}
                      data-analytics="add-to-cart"
                      data-product-id={product.id}
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

          {/* Results Info */}
          <div className="text-center mt-12 pt-8 border-t border-stone-200">
            <p className="text-stone-600">
              {products.length}
              {t.catalog.showing} {sortedProducts.length} {t.catalog.of}
              {selectedCategory !== "all" &&
                ` ${t.catalog.in} ${t.categories[selectedCategory]}`}
            </p>
          </div>
        </div>
      </main>

      <Footer />

      <CartNotification
        show={notification.show}
        productName={notification.productName}
        onClose={closeNotification}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
