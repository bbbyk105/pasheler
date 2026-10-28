import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { hinokiFontVariables } from "@/lib/hinoki-fonts";
import "@/styles/microcms-content.css";

const BLOG_LAYOUT_KEYWORDS = [
  "富士山",
  "ひのき",
  "アロマ",
  "ひのきフレグランス",
  "日本土産",
  "リラックス",
  "富士ヒノキ",
  "ブログ",
  "森林浴",
  "ライフスタイル",
  "ウェルネス",
  "香り",
  "自然",
  "富士山 観光",
  "富士山 お土産",
  "ひのき 香り",
  "ひのき アロマ",
  "アロマ 効果",
  "アロマ リラックス",
  "フレグランスペーパー",
  "日本土産 おすすめ",
  "リラックス グッズ",
  "ヒノキチオール",
  "ポケットサイズ アロマ",
  "和の香り",
  "日本製 アロマ",
  "Yawn Nap",
];

export const metadata: Metadata = {
  title: "ブログ | 富士山・ひのき・アロマ・リラックス情報",
  description:
    "Yawn Napのブログ。富士山、ひのき、アロマ、リラックス、日本土産に関する情報をお届けします。富士ヒノキの魅力、森林浴の効果、香りのある暮らしのヒント、商品の使い方などを配信しています。",
  keywords: BLOG_LAYOUT_KEYWORDS.join(", "),
  openGraph: {
    title: "ブログ | 富士山・ひのき・アロマ・リラックス情報 | Yawn Nap",
    description:
      "富士山、ひのき、アロマ、リラックス、日本土産に関する情報をお届け。富士ヒノキの魅力、森林浴の効果、香りのある暮らしのヒントを配信しています。",
    images: ["/images/blog-og-image.jpg"],
    type: "website",
    locale: "ja_JP",
    siteName: "Yawn Nap",
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ | 富士山・ひのき・アロマ・リラックス情報 | Yawn Nap",
    description:
      "富士山、ひのき、アロマ、リラックス、日本土産に関する情報をお届けします。",
    images: ["/images/blog-twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* デザインは旧 hinokifragrance.com のブログのまま（元のサイトは body が bg-black text-white） */}
      <main
        className={`hinoki-scope ${hinokiFontVariables} min-h-screen bg-zinc-50 text-white`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
