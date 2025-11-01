import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import { Noto_Serif_JP } from "next/font/google";

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yawnnap.shop"),
  title: {
    default:
      "Yawn Nap | 富士山檜の香りとフレグランスペーパー – Hinoki Fragrance Paper from Mt. Fuji",
    template: "%s | Yawn Nap",
  },
  description:
    "Yawn & Nap（ヨーンアンドナップ）は、富士山麓の檜（ひのき）の香りを閉じ込めたフレグランスペーパーや、天然ひのきウォーターを展開するライフスタイルブランド。和の香りで心を整え、リラックスできる空間をお届けします。Hinoki fragrance paper & natural aroma from Mt. Fuji — Made in Japan.",
  keywords: [
    // 日本語キーワード
    "富士山 お土産",
    "富士山 檜 フレグランスペーパー",
    "ひのき フレグランス",
    "檜 アロマ",
    "ひのき ウォーター",
    "日本製 フレグランス",
    "和の香り",
    "天然 ひのき",
    "リラックス 香り",
    "ミネラル ウォーター 香り",
    "国産 檜 アロマ",
    // 英語キーワード
    "Hinoki fragrance paper",
    "Mt. Fuji souvenir",
    "Japanese fragrance paper",
    "Hinoki aroma",
    "Natural aroma Japan",
    "Relaxing scent",
    "Hinoki water",
    "Hinoki essence",
    "Made in Japan gift",
    "Japanese aroma brand",
  ],
  openGraph: {
    type: "website",
    url: "https://www.yawnnap.shop",
    siteName: "Yawn Nap",
    title: "Yawn Nap | Hinoki Fragrance Paper & Natural Aroma from Mt. Fuji",
    description:
      "Discover Yawn Nap — Japanese-made Hinoki fragrance paper inspired by Mt. Fuji. Natural, relaxing scent for home, gift, and travel. Made in Japan.",
    locale: "ja_JP",
    alternateLocale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Yawn Nap — Hinoki fragrance paper from Mt. Fuji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yawn Nap | Hinoki Fragrance Paper from Mt. Fuji",
    description:
      "富士山麓の檜（ひのき）の香りを閉じ込めたフレグランスペーパー。ナチュラルで穏やかな香りを日常に。",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://www.yawnnap.shop",
    languages: {
      "ja-JP": "/",
      "en-US": "/en",
    },
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google:
      "google-site-verification=gKfoZ2QDEukJ0D4WhuJ-tMiW_dNwDFLxy7bUHgwU--8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* 構造化データ（JSON-LD） - SEO強化 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Yawn Nap",
              url: "https://www.yawnnap.shop",
              logo: "https://www.yawnnap.shop/logo.png",
              description:
                "富士山麓の檜の香りを閉じ込めたフレグランスペーパーブランド",
              address: {
                "@type": "PostalAddress",
                addressCountry: "JP",
              },
              sameAs: [
                "https://www.instagram.com/yawn.nap_",
                "https://x.com/kanabo_292929",
              ],
            }),
          }}
        />
      </head>
      <body className={notoSerifJP.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
