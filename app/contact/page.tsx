import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Yawn Nap（ヨーンアンドナップ）へのお問い合わせ。商品・配送・ご注文に関するご質問はこちらから。",
  openGraph: {
    title: "お問い合わせ | Yawn Nap",
    description:
      "富士山麓の檜の香りブランド Yawn Nap へのお問い合わせページ。",
    url: `${SITE_URL}/contact`,
    siteName: "Yawn Nap",
    locale: "ja_JP",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactContent />;
}
