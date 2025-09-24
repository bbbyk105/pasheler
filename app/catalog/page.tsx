"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../components/CartContext";
import CartNotification from "../../components/CartNotification";
import ProductQuickView from "../../components/ProductQuickView";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { products } from "../../lib/products";
import { translations } from "../../lib/translations";
import { formatPrice, convertPrice } from "../../lib/currency";

export default function CatalogPage() {
  const { addToCart, language, currency } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState({
    show: false,
    productName: "",
  });
  const [sortBy, setSortBy] = useState("name");
  const [quickViewProduct, setQuickViewProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const t = translations[language];
  const categories = ["all", "cleansers", "moisturizers", "serums", "masks"];

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      const aPrice = convertPrice(a.variants[0].price, "JPY", currency);
      const bPrice = convertPrice(b.variants[0].price, "JPY", currency);
      return aPrice - bPrice;
    }
    return a.name[language].localeCompare(b.name[language]);
  });

  const handleAddToCart = (
    product: (typeof products)[0],
    variantId: string
  ) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant || variant.stock === 0) return;

    addToCart({
      id: product.id,
      variantId: variant.id,
      name: product.name[language],
      size: variant.size,
      price: variant.price,
      image: product.image,
      stock: variant.stock,
    });

    setNotification({ show: true, productName: product.name[language] });
  };

  const handleQuickView = (product: (typeof products)[0]) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const closeNotification = () => {
    setNotification({ show: false, productName: "" });
  };

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
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {t.categories[category as keyof typeof t.categories]}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-600">{t.common.sort}:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pr-8 pl-3 py-2 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 cursor-pointer"
                >
                  <option value="name">Name</option>
                  <option value="price">{t.common.price}</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                  <i className="ri-arrow-down-s-line text-stone-500"></i>
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
              const lowestPriceVariant = product.variants.reduce(
                (min, variant) => (variant.price < min.price ? variant : min)
              );
              const isOutOfStock = product.variants.every((v) => v.stock === 0);
              const hasLowStock = product.variants.some(
                (v) => v.stock > 0 && v.stock <= 5
              );
              const priceInCurrentCurrency = convertPrice(
                lowestPriceVariant.price,
                "JPY",
                currency
              );

              return (
                <div key={product.id} className="group">
                  <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50 rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name[language]}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                      {product.name[language]}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {formatPrice(priceInCurrentCurrency, currency)}
                    </p>

                    <button
                      onClick={() =>
                        handleAddToCart(product, lowestPriceVariant.id)
                      }
                      disabled={isOutOfStock}
                      className="w-full mt-3 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        color: isOutOfStock ? "#9ca3af" : "#57534e",
                        borderColor: isOutOfStock ? "#d1d5db" : "#d6d3d1",
                        border: "1px solid",
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
              {t.catalog.showing} {sortedProducts.length} {t.catalog.of}{" "}
              {products.length}
              {selectedCategory !== "all" &&
                ` ${t.catalog.in} ${
                  t.categories[selectedCategory as keyof typeof t.categories]
                }`}
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
