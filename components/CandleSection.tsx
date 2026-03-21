"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import CartNotification from "./CartNotification";
import ProductQuickView from "./ProductQuickView";
import {
  products,
  productPrimaryImage,
  type Product,
} from "../lib/products";
import { translations } from "../lib/translations";
import { formatPrice } from "../lib/currency";

const candleProducts = products.filter((p) => p.category === "candles");

const copy = {
  ja: {
    eyebrow: "富士山麓の香りを、暮らしの灯りに",
    title: "ふと火を灯すだけで、\n部屋が「森のふもと」に変わる",
    lead:
      "富士ヒノキを蒸留するときだけに得られる、貴重なオイルをたっぷり閉じ込めたキャンドルです。リビングでもバスルームでも、やわらかく広がる檜の香りが、あなたの時間をそっと包み込みます。",
    block2Title: "慌ただしい一日のあとに、\n深呼吸したくなる香り",
    block2Body:
      "火を灯す瞬間から、空気がひとつずつやわらいでいくのを感じてください。眠る前の数分、お風呂上がりのひととき——ギフトにも、自分へのごほうびにも。緑のシールが目印の、富士山麓のキャンドルをぜひ手に取ってみてください。",
    ctaProducts: "ラインナップを選ぶ",
    imgMainAlt: "富士ヒノキキャンドル",
    imgSubAlt: "富士ヒノキキャンドル（イメージ）",
  },
  en: {
    eyebrow: "Bring the foothills of Mt. Fuji into your home",
    title: "Light a flame—\nand the room becomes a quiet forest edge",
    lead: "These candles hold a generous pour of precious oil captured when Fuji hinoki is distilled. In the living room or bath, soft cypress unfolds and wraps your moment in calm.",
    block2Title: "After a busy day,\na breath you did not know you needed",
    block2Body:
      "From the first flicker, the air seems to soften. A few minutes before sleep, or right after a bath—also lovely as a gift. Look for the green seal: Fuji foothill hinoki, poured into wax.",
    ctaProducts: "Choose a candle",
    imgMainAlt: "Mt. Fuji HINOKI candle",
    imgSubAlt: "Mt. Fuji hinoki candle — detail",
  },
} as const;

export default function CandleSection() {
  const { addToCart, language, currency } = useCart();
  const lang = language === "ja" ? "ja" : "en";
  const c = copy[lang];

  const [cartNotification, setCartNotification] = useState({
    show: false,
    productName: "",
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [showQuickView, setShowQuickView] = useState(false);

  const t = translations[language];

  const handleAddToCart = (
    product: Product,
    variantId: string,
    quantity: number = 1
  ) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant || variant.stock === 0) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        variantId: variant.id,
        name: product.name[language],
        price: variant.prices[currency],
        prices: variant.prices,
        image: productPrimaryImage(product),
        stock: variant.stock,
      });
    }

    setCartNotification({ show: true, productName: product.name[language] });
  };

  const closeCartNotification = () => {
    setCartNotification({ show: false, productName: "" });
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };

  return (
    <section className="py-20 px-6 bg-[#f7f4ef] border-y border-stone-200/80">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
            {lang === "ja" ? "キャンドル" : "Candle"}
          </p>
          <p className="text-sm font-medium text-emerald-800/90 mb-4">
            {c.eyebrow}
          </p>
          <h2 className="text-[1.65rem] md:text-4xl font-serif text-stone-900 leading-snug whitespace-pre-line">
            {c.title}
          </h2>
        </header>

        {/* 文章 + 写真（1） */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-16 md:mb-24">
          <div className="order-2 md:order-1 space-y-6">
            <p className="text-base md:text-lg text-stone-700 leading-[1.85]">
              {c.lead}
            </p>
            <p className="text-sm text-stone-500 border-l-2 border-emerald-800/30 pl-4 leading-relaxed">
              {lang === "ja"
                ? "※ゆずをブレンドした香りもご用意しています（缶はオレンジのシール）。下のラインナップからお選びください。"
                : "We also offer a yuzu blend (orange seal on the can). Choose below."}
            </p>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-200 shadow-md ring-1 ring-stone-900/5">
            <Image
              src="/candle/hinoki-candle.jpg"
              alt={c.imgMainAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* 文章 + 写真（2） — 写真を左に */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-16 md:mb-20">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-200 shadow-md ring-1 ring-stone-900/5 md:min-h-[420px]">
            <Image
              src="/candle/hinoki-candle3.jpg"
              alt={c.imgSubAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-serif text-stone-900 leading-snug whitespace-pre-line">
              {c.block2Title}
            </h3>
            <p className="text-base md:text-lg text-stone-700 leading-[1.85]">
              {c.block2Body}
            </p>
          </div>
        </div>

        <p className="text-center text-sm font-medium text-stone-600 mb-8">
          {c.ctaProducts}
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-12"
          data-product-shop
        >
          {candleProducts.map((product) => {
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
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-stone-50 ring-1 ring-stone-900/[0.06] shadow-sm transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_20px_50px_-12px_rgba(28,25,23,0.16)]">
                  <Image
                    src={productPrimaryImage(product)}
                    alt={product.name[language]}
                    fill
                    className="object-cover object-center will-change-transform transition-[transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 400px"
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
                          {lang === "ja" ? "残りわずか" : "Low Stock"}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <button
                      type="button"
                      onClick={() => {
                        setQuickViewProduct(product);
                        setShowQuickView(true);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/95 shadow-md ring-1 ring-stone-900/5 backdrop-blur-sm transition-[background-color,box-shadow] duration-300 hover:bg-white cursor-pointer"
                      aria-label={`${product.name[language]}のクイックビュー`}
                    >
                      <i className="ri-eye-line text-sm text-stone-700"></i>
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <span className="px-2 py-1 text-xs font-medium bg-stone-100 text-stone-700 rounded-full">
                      {t.categories[
                        product.category as keyof typeof t.categories
                      ] || product.category}
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
                    type="button"
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

        <div className="text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 border-b border-stone-400 hover:text-stone-900 hover:border-stone-800 transition-colors"
          >
            {lang === "ja" ? "商品一覧を見る" : "View all products"}
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
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
