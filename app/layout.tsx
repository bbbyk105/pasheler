import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import { Noto_Serif_JP } from "next/font/google";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  // url・title・description はページごとに書く（トップは app/page.tsx）。ここに書くと、
  // 書いていないページ（法務・404 など）がトップの URL と文言を名乗ってしまう
  openGraph: {
    type: "website",
    siteName: "Yawn Nap",
    locale: "ja_JP",
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
    images: ["/opengraph-image.png"],
  },
  // canonical はページごとに書く。ここに書くと、書き忘れたページ（404 など）がトップを指してしまう
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
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Yawn Nap",
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: absoluteUrl("/opengraph-image.png"),
                    width: 1200,
                    height: 630,
                  },
                  description:
                    "富士山麓の檜（ひのき）の香りを届けるライフスタイルブランド。フレグランスペーパー、アロマキャンドル、天然ひのきウォーター。",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "JP",
                  },
                  sameAs: [
                    "https://www.instagram.com/yawn.nap_",
                    "https://x.com/kanabo_292929",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Yawn Nap",
                  description:
                    "富士山麓の檜の香り。フレグランスペーパー・キャンドル・ひのきウォーターのオンラインストア。",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: ["ja-JP", "en"],
                },
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
