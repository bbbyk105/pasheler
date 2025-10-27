// app/catalog/page.tsx
import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import Script from "next/script";
// もしサーバーでも使える products があるなら読み込めます
import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "フレグランスペーパー | Yawn Nap",
  description:
    "富士山檜（ひのき）の香りを閉じ込めたフレグランスペーパー。和の香りで心を整える日本製の香りの紙。日本のお土産・ギフトにも最適です。Hinoki fragrance paper from Mt. Fuji.",
  openGraph: {
    type: "website",
    url: "https://yawnnap.shop/catalog",
    siteName: "Yawn Nap",
    title: "フレグランスペーパー – Hinoki Fragrance Paper | Yawn Nap",
    description:
      "富士山麓の檜の香り。Hinoki fragrance paper（日本製）：ギフト・お土産・トラベルに。",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Yawn Nap — Hinoki fragrance paper",
      },
    ],
    locale: "ja_JP",
    alternateLocale: "en_US",
  },
  alternates: {
    canonical: "https://yawnnap.shop/catalog",
  },
  robots: { index: true, follow: true },
  keywords: [
    "フレグランスペーパー",
    "富士山 檜",
    "ひのき フレグランス",
    "Japanese fragrance paper",
    "Hinoki fragrance paper",
    "Mt. Fuji souvenir",
    "Made in Japan gift",
    "和の香り",
    "リラックス",
  ],
};

export default function CatalogPage() {
  // 任意：構造化データ（ItemList）。価格通貨などが状態依存なら省略OK
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 24).map((p: any, idx: number) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p?.name?.ja ?? p?.name?.en ?? "Fragrance Paper",
      // 画像URLが相対パスならフルURL化するのが理想
    })),
  };

  return (
    <>
      <Script
        id="catalog-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <CatalogClient />
    </>
  );
}
