// app/catalog/page.tsx
import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import Script from "next/script";
import { products } from "../../lib/products";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "商品一覧 | フレグランスペーパー・キャンドル・ひのきウォーター",
  description:
    "富士山麓の檜（ひのき）の香りを届ける Yawn Nap の全商品。フレグランスペーパー、富士ヒノキキャンドル、ゆずブレンド、ひのきアロマウォーター。日本製・ギフトに。",
  openGraph: {
    type: "website",
    url: `${SITE_URL}/catalog`,
    siteName: "Yawn Nap",
    title:
      "商品一覧 – Hinoki Fragrance Paper & Candles | Yawn Nap",
    description:
      "富士山麓の檜の香り。フレグランスペーパー・キャンドル・ひのきウォーターのラインナップ。",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Yawn Nap — 商品一覧",
      },
    ],
    locale: "ja_JP",
  },
  alternates: {
    canonical: `${SITE_URL}/catalog`,
  },
  robots: { index: true, follow: true },
  keywords: [
    "フレグランスペーパー",
    "ひのき キャンドル",
    "富士山 檜",
    "ひのき ウォーター",
    "Japanese hinoki candle",
    "Mt. Fuji souvenir",
  ],
};

export default function CatalogPage() {
  const catalogUrl = `${SITE_URL}/catalog`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "商品一覧",
            item: catalogUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Yawn Nap 商品一覧",
        numberOfItems: products.length,
        itemListElement: products.map((p, idx) => {
          const v = p.variants[0];
          const inStock = v && v.stock > 0;
          return {
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "Product",
              name: p.name.ja,
              description:
                p.description.ja.length > 200
                  ? `${p.description.ja.slice(0, 197)}…`
                  : p.description.ja,
              image: p.images.map((src) => absoluteUrl(src)),
              sku: String(p.id),
              brand: {
                "@type": "Brand",
                name: "Yawn Nap",
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "JPY",
                price: v?.prices.JPY ?? 0,
                availability: inStock
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
                url: catalogUrl,
              },
            },
          };
        }),
      },
    ],
  };

  return (
    <>
      <Script
        id="catalog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <CatalogClient />
    </>
  );
}
