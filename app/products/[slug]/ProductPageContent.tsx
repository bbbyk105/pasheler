"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartNotification from "@/components/CartNotification";
import ProductDetail from "@/components/ProductDetail";
import { useCart } from "@/components/CartContext";
import { useAddToCart } from "@/components/useAddToCart";
import { translations } from "@/lib/translations";
import { productDisplayName, type Product } from "@/lib/products";

/** 商品ページの中身。言語の切り替えに合わせるのでクライアント側（最初の HTML は日本語） */
export default function ProductPageContent({ product }: { product: Product }) {
  const { language } = useCart();
  const t = translations[language];
  const { handleAddToCart, notification, closeNotification } = useAddToCart();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-10 md:py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <nav aria-label={t.product.breadcrumb} className="mb-8 text-sm text-stone-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-stone-800 underline-offset-4 hover:underline">
                  {t.nav.home}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/catalog" className="hover:text-stone-800 underline-offset-4 hover:underline">
                  {t.catalog.title}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-stone-800">
                {productDisplayName(product, language)}
              </li>
            </ol>
          </nav>

          <ProductDetail
            product={product}
            layout="page"
            onAddToCart={handleAddToCart}
          />

          <div className="mt-16 text-center">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap"
            >
              <i className="ri-arrow-left-line" aria-hidden></i>
              {t.product.backToCatalog}
            </Link>
          </div>
        </div>
      </main>

      <CartNotification
        show={notification.show}
        productName={notification.productName}
        onClose={closeNotification}
      />
      <Footer />
    </div>
  );
}
