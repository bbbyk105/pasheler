import type { Metadata } from "next";
import HomePage from "./HomePage";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Yawn Nap | 富士山檜のフレグランスペーパー・キャンドル・ひのきウォーター | Mt. Fuji Hinoki",
  },
  description:
    "富士山麓の檜（ひのき）の香りを届ける Yawn Nap。フレグランスペーパー、アロマキャンドル、天然ひのきウォーター。日本製・ギフトに。Hinoki fragrance paper, candles & natural aroma from Mt. Fuji.",
  keywords: [
    "富士山 檜",
    "ひのき キャンドル",
    "フレグランスペーパー",
    "ひのき ウォーター",
    "富士山 お土産",
    "Hinoki candle",
    "Japanese fragrance gift",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Yawn Nap",
    title:
      "Yawn Nap | Hinoki Fragrance Paper, Candles & Natural Aroma from Mt. Fuji",
    description:
      "富士山麓の檜の香り。フレグランスペーパー・キャンドル・ひのきウォーター。日本製ギフトに。",
    locale: "ja_JP",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Yawn Nap — Hinoki products from Mt. Fuji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yawn Nap | Hinoki Fragrance & Candles from Mt. Fuji",
    description:
      "富士山麓の檜の香り。フレグランスペーパー・キャンドル・ひのきウォーター。",
    images: [absoluteUrl("/opengraph-image.png")],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <HomePage />;
}
