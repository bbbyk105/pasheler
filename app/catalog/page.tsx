// app/catalog/page.tsx
import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import { products } from "../../lib/products";
import { SITE_URL } from "@/lib/site";
import { catalogJsonLd } from "@/lib/product-jsonld";
import { jsonLdString } from "@/lib/blog/utils";

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
  const structuredData = catalogJsonLd(products);

  return (
    <>
      {/* next/script の <Script> だとサーバーの HTML に入らず、読み込み後に JS で差し込まれる。素の <script> で出す */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(structuredData) }}
      />
      <CatalogClient />
    </>
  );
}
